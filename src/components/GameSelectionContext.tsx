import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Database } from '../lib/database.types';

type BasicGame = Database['public']['Tables']['basic_game_cards']['Row'];

interface GameSelectionContextType {
  selectedGames: BasicGame[];
  toggleGameSelection: (game: BasicGame) => void;
}

const GameSelectionContext = createContext<GameSelectionContextType | undefined>(undefined);

export function GameSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedGames, setSelectedGames] = useState<BasicGame[]>([]);

  const toggleGameSelection = (game: BasicGame) => {
    setSelectedGames(prev => {
      const isSelected = prev.some(g => g.id === game.id);
      if (isSelected) {
        return prev.filter(g => g.id !== game.id);
      } else {
        return [...prev, game];
      }
    });
  };

  return (
    <GameSelectionContext.Provider value={{ selectedGames, toggleGameSelection }}>
      {children}
    </GameSelectionContext.Provider>
  );
}

export const useGameSelection = () => {
  const context = useContext(GameSelectionContext);
  if (context === undefined) {
    throw new Error('useGameSelection must be used within a GameSelectionProvider');
  }
  return context;
};