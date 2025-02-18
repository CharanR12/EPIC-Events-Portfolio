import React from 'react';
import { useLanguage } from '../lib/i18n/LanguageContext';
import { useGameSelection } from './GameSelectionContext';
import { Game } from './types';
import { Check } from 'lucide-react';

interface BasicGameCardProps {
  game: Game;
}

export default function BasicGameCard({ game }: BasicGameCardProps) {
  const { language } = useLanguage();
  const { selectedGames, toggleGameSelection } = useGameSelection();

  const getLocalizedContent = (en: string | null, ta: string | null) => {
    if (language === 'ta' && ta) return ta;
    return en || '';
  };

  const localizedName = getLocalizedContent(game.name, game.name_ta);
  const localizedDescription = getLocalizedContent(game.description, game.description_ta);
  const isSelected = selectedGames.some(g => g.id === game.id);

  return (
    <div
      onClick={() => toggleGameSelection(game)}
      className={`game-card-basic p-6 rounded-xl border cursor-pointer
        ${isSelected 
          ? 'border-accent bg-accent/10' 
          : 'border-accent/30 bg-secondary/20'} 
        shadow-sm hover:shadow-lg transition-all duration-300 group relative`}
    >
      {isSelected && (
        <div className="absolute top-4 right-4">
          <Check className="w-5 h-5 text-accent" />
        </div>
      )}
      <h3 className="text-xl text-text/80 group-hover:text-text transition-colors duration-300 font-normal">
        {localizedName}
      </h3>
      {localizedDescription && (
        <p className="mt-2 text-sm text-text/60">
          {localizedDescription}
        </p>
      )}
      <div className="mt-3 h-0.5 w-0 bg-secondary group-hover:w-16 transition-all duration-300 ease-out"></div>
    </div>
  );
}