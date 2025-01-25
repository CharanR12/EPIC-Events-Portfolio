import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../lib/i18n/LanguageContext';
import type { Database } from '../lib/database.types';

type HeroContent = Database['public']['Tables']['hero_content']['Row'];

export default function Hero() {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  useEffect(() => {
    async function fetchHeroContent() {
      try {
        const { data, error } = await supabase
          .from('hero_content')
          .select('*')
          .limit(1)
          .single();

        if (error) throw error;
        setContent(data);
      } catch (error) {
        console.error('Error fetching hero content:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchHeroContent();
  }, []);

  const getLocalizedContent = (en: string | null, ta: string | null) => {
    if (language === 'ta' && ta) return ta;
    return en || '';
  };

  if (loading) {
    return (
      <div id="home" className="relative min-h-screen flex items-center bg-background">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center animate-pulse">
            <div className="h-12 bg-secondary/20 rounded w-3/4 mx-auto mb-6"></div>
            <div className="h-6 bg-secondary/20 rounded w-2/3 mx-auto mb-8"></div>
            <div className="flex flex-row gap-4 justify-center">
              <div className="h-12 bg-secondary/20 rounded w-32"></div>
              <div className="h-12 bg-secondary/20 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="home" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img
          src={content?.background_image || "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80"}
          alt={t('hero.title')}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-text/50"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-secondary mb-4 sm:mb-6">
            {content ? getLocalizedContent(content.title, content.title_ta) : t('hero.title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-secondary mb-6 sm:mb-8 max-w-3xl mx-auto">
            {content ? getLocalizedContent(content.subtitle, content.subtitle_ta) : t('hero.subtitle')}
          </p>
          <div className="flex flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-1 sm:flex-none bg-accent/80 text-secondary px-6 sm:px-8 py-3 rounded-lg hover:bg-accent/100 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group font-medium text-sm sm:text-base"
            >
              {t('nav.bookNow')}
            </button>
            <button
              onClick={() => document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-1 sm:flex-none bg-secondary/10 text-secondary px-6 sm:px-8 py-3 rounded-lg hover:bg-secondary/20 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group font-medium text-sm sm:text-base"
            >
              {t('nav.games')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}