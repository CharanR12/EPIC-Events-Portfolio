import React, { useEffect, useState } from 'react';
import BasicGameCard from './BasicGameCard';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../lib/i18n/LanguageContext';
import type { Database } from '../lib/database.types';

type BasicGame = Database['public']['Tables']['basic_game_cards']['Row'];

export default function Games() {
  const [games, setGames] = useState<BasicGame[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  const getLocalizedContent = (en: string | null, ta: string | null) => {
    if (language === 'ta' && ta) return ta;
    return en || '';
  };

  useEffect(() => {
    async function fetchGames() {
      try {
        const { data, error } = await supabase
          .from('basic_game_cards')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Apply localization to the fetched games
        const localizedGames = (data || []).map(game => ({
          ...game,
          title: getLocalizedContent(game.title_en, game.title_ta),
          description: getLocalizedContent(game.description_en, game.description_ta),
          // Add any other localized fields here
        }));

        setGames(localizedGames);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [language]); // Add language to dependency array to re-fetch when language changes

  return (
    <section id="games" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
            {t('games.title')}
          </h2>
          <p className="text-xl text-accent/80 max-w-3xl mx-auto">
            {t('games.subtitle')}
          </p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <BasicGameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}