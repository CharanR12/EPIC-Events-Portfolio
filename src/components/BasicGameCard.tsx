import React from 'react';
import { useLanguage } from '../lib/i18n/LanguageContext';

interface BasicGameCardProps {
  game: {
    id: number;
    name: string | null;
    name_ta: string | null;
    // Add other potential fields as needed
  };
}

export default function BasicGameCard({ game }: BasicGameCardProps) {
  const { language } = useLanguage();

  const getLocalizedContent = (en: string | null, ta: string | null) => {
    if (language === 'ta' && ta) return ta;
    return en || '';
  };

  const localizedName = getLocalizedContent(game.name, game.name_ta);

  return (
    <div className="game-card-basic p-6 rounded-xl border border-accent/30 bg-secondary/20 shadow-sm hover:shadow-lg transition-all duration-300 group">
      <h3 className="text-xl text-text/80 group-hover:text-text transition-colors duration-300 font-normal">
        {localizedName}
      </h3>
      <div className="mt-3 h-0.5 w-0 bg-secondary group-hover:w-16 transition-all duration-300 ease-out"></div>
    </div>
  );
}