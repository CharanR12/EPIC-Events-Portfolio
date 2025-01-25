import React, { useState } from 'react';
import { X } from 'lucide-react';

interface GameCardProps {
  game: {
    name: string;
    image: string;
    preview: string;
    description: string;
    howToPlay: string;
    equipment: string;
  };
}

export default function GameCard({ game }: GameCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div 
        className="game-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <img
          src={game.image}
          alt={game.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-poppins">{game.name}</h3>
          <p className="text-sm sm:text-base text-gray-600">{game.preview}</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl h-[90vh] flex flex-col">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="flex items-center p-4 sm:p-6 border-b flex-shrink-0">
              <img
                src={game.image}
                alt={game.name}
                className="w-16 sm:w-24 h-16 sm:h-24 object-cover rounded-lg"
              />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-poppins ml-4 sm:ml-6">{game.name}</h3>
            </div>
            
            <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 overflow-y-auto flex-grow">
              <div>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{game.description}</p>
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 font-poppins">How to Play</h4>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Game Tutorial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-sm sm:text-base text-gray-600">{game.howToPlay}</p>
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 font-poppins">Equipment Provided</h4>
                <p className="text-sm sm:text-base text-gray-600">{game.equipment}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}