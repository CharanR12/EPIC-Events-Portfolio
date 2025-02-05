import React, { useEffect, useState } from 'react';
import BasicGameCard from './BasicGameCard';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../lib/i18n/LanguageContext';
import type { Database } from '../lib/database.types';

type BasicGame = Database['public']['Tables']['basic_game_cards']['Row'];
type GameCategory = Database['public']['Tables']['game_categories']['Row'];

export default function Games() {
  const [games, setGames] = useState<BasicGame[]>([]);
  const [categories, setCategories] = useState<GameCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAll, setShowAll] = useState(false);
  const { t, language } = useLanguage();

  const getLocalizedContent = (en: string | null, ta: string | null) => {
    if (language === 'ta' && ta) return ta;
    return en || '';
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('game_categories')
          .select('*')
          .order('created_at', { ascending: true });

        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);

        // Fetch games with category information
        const { data: gamesData, error: gamesError } = await supabase
          .from('basic_game_cards')
          .select('*, game_categories(*)')
          .order('created_at', { ascending: false });

        if (gamesError) throw gamesError;
        setGames(gamesData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [language]);

  const toggleGameSelection = async (gameId: string, selected: boolean) => {
    try {
      const { error } = await supabase
        .from('basic_game_cards')
        .update({ selected })
        .eq('id', gameId);

      if (error) throw error;

      setGames(games.map(game => 
        game.id === gameId ? { ...game, selected } : game
      ));
    } catch (error) {
      console.error('Error updating game selection:', error);
    }
  };

  const filteredGames = games.filter(game => {
    if (activeCategory === 'all') return true;
    return game.category_id === activeCategory;
  });

  const displayedGames = showAll ? filteredGames : filteredGames.slice(0, 6);

  return (
    <section id="games" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
            {t('games.title')}
          </h2>
          <p className="text-xl text-accent/80 max-w-3xl mx-auto mb-8">
            {t('games.subtitle')}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-accent text-secondary shadow-lg'
                  : 'bg-secondary/20 text-text hover:bg-secondary/30'
              }`}
            >
              {t('games.categories.all')}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-accent text-secondary shadow-lg'
                    : 'bg-secondary/20 text-text hover:bg-secondary/30'
                }`}
              >
                {getLocalizedContent(category.name, category.name_ta)}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="p-6 bg-secondary/5 rounded-xl">
                  <div className="h-6 bg-secondary/20 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedGames.map((game) => (
                <BasicGameCard 
                  key={game.id} 
                  game={game} 
                  onSelect={(selected) => toggleGameSelection(game.id, selected)}
                />
              ))}
            </div>

            {filteredGames.length > 6 && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center px-8 py-3 rounded-lg bg-accent/90 text-secondary hover:bg-accent transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  {showAll ? t('games.showLess') : t('games.showMore')}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}