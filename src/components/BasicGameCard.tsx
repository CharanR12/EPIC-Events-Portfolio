import React from 'react';

interface BasicGameCardProps {
  game: {
    name: string;
  };
}

export default function BasicGameCard({ game }: BasicGameCardProps) {
  return (
    <div className="game-card-basic p-6 rounded-xl border border-accent/30 bg-secondary/20 shadow-sm hover:shadow-lg transition-all duration-300 group">
      <h3 className="text-xl text-text/80 group-hover:text-text transition-colors duration-300 font-normal">
        {game.name}
      </h3>
      <div className="mt-3 h-0.5 w-0 bg-secondary group-hover:w-16 transition-all duration-300 ease-out"></div>
    </div>
  );
}