import React from 'react';
import { PlayerProp } from '../types';

interface PropCardProps {
  prop: PlayerProp;
  onSelectBet: (propId: string, position: 'over' | 'under') => void;
  selected?: {
    propId: string;
    position: 'over' | 'under';
  };
}

export function PropCard({ prop, onSelectBet, selected }: PropCardProps) {
  const playerImageUrl = `https://cdn.nba.com/headshots/nba/latest/1040x760/${prop.playerId || 'fallback'}.png`;
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    img.src = 'https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png';
  };
  
  const gameTime = new Date(prop.gameTime);
  const formattedTime = gameTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const isSelected = selected?.propId === prop.id;

  return (
    <div className={`bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col h-full ${
      isSelected ? 'border-2 border-emerald-600' : 'border border-gray-700'
    }`}>
      <div className="p-3 flex-grow">
        {/* Player Image */}
        <div className="w-20 h-20 mx-auto mb-2">
          <img 
            src={playerImageUrl}
            alt={prop.player}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>

        {/* Player Name */}
        <h3 className="text-sm font-bold text-gray-100 text-center mb-1">{prop.player}</h3>

        {/* Teams and Game Time */}
        <div className="text-xs text-gray-400 text-center mb-1">
          {prop.team} vs {prop.opponent} • {formattedTime}
        </div>

        {/* Prop Value and Type */}
        <div className="flex items-center justify-center space-x-2">
          <span className="text-lg font-bold text-gray-100">{prop.line}</span>
          <span className="text-sm font-medium text-gray-400 py-0.5 rounded">
            {prop.stat}
          </span>
        </div>
      </div>

      {/* Over/Under Buttons */}
      <div className="grid grid-cols-2 border-t border-gray-700">
        <button
          onClick={() => onSelectBet(prop.id, 'over')}
          className={`py-2 text-sm font-bold transition-colors rounded-bl-lg ${
            isSelected && selected?.position === 'over'
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'hover:bg-gray-700 text-gray-200'
          }`}
        >
          Over
        </button>
        <button
          onClick={() => onSelectBet(prop.id, 'under')}
          className={`py-2 text-sm font-bold transition-colors rounded-br-lg border-l border-gray-700 ${
            isSelected && selected?.position === 'under'
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'hover:bg-gray-700 text-gray-200'
          }`}
        >
          Under
        </button>
      </div>
    </div>
  );
}