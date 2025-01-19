import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { PlayerProp } from '../types';

interface PropTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  counts: Record<string, number>;
  props: PlayerProp[];
  selectedGame: string;
  onGameChange: (game: string) => void;
}

export function PropTabs({ activeTab, onTabChange, props, selectedGame, onGameChange }: PropTabsProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const games = useMemo(() => {
    const uniqueGames = new Map<string, { time: string; teams: string; key: string }>();
    
    props.forEach(prop => {
      const teams = [prop.team, prop.opponent].sort();
      const normalizedKey = `${teams.join('-')}-${prop.gameTime}`;
      
      if (!uniqueGames.has(normalizedKey)) {
        const gameTime = new Date(prop.gameTime);
        const formattedTime = gameTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });

        const displayTeams = `${prop.team} vs ${prop.opponent}`;
        const gameKey = `${prop.team}-${prop.opponent}-${prop.gameTime}`;

        uniqueGames.set(normalizedKey, {
          time: formattedTime,
          teams: displayTeams,
          key: gameKey
        });
      }
    });

    return Array.from(uniqueGames.values())
      .sort((a, b) => {
        const timeA = props.find(p => p.gameTime === a.key.split('-')[2])?.gameTime || '';
        const timeB = props.find(p => p.gameTime === b.key.split('-')[2])?.gameTime || '';
        return new Date(timeA).getTime() - new Date(timeB).getTime();
      });
  }, [props]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onTabChange(query ? `search:${query}` : 'all');
  };

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
    setSearchQuery('');
    onTabChange('all');
    onGameChange(''); // Reset game filter
  };

  if (isSearchOpen) {
    return (
      <div className="bg-gray-900 mb-4 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-800 rounded-lg">
            <div className="flex items-center p-4 space-x-4">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search players..."
                className="bg-transparent text-gray-100 flex-1 focus:outline-none text-lg"
                autoFocus
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                  onTabChange('all');
                }}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            {searchQuery && (
              <div className="px-4 pb-4 text-sm text-gray-400">
                Showing results for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 mb-4">
      {/* Game Filter */}
      <div className="overflow-x-auto scrollbar-hide max-w-7xl mx-auto px-4">
        <div className="flex space-x-2 whitespace-nowrap py-2">
          <div className={`flex flex-col items-center rounded-lg transition-colors ${
            !selectedGame
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
          }`}>
            <button
              onClick={() => onGameChange('')}
              className="px-4 py-1.5 text-sm font-medium w-full text-center"
            >
              <div>All</div>
              <div>Games</div>
            </button>
          </div>
          {games.map(({ key, teams, time }) => (
            <div
              key={key}
              className={`flex flex-col items-center rounded-lg transition-colors ${
                selectedGame === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              }`}
            >
              <button
                onClick={() => onGameChange(key)}
                className="px-4 py-1.5 text-sm font-medium w-full"
              >
                {teams}
              </button>
              <div className="px-4 pb-1.5 text-xs opacity-75">
                {time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prop Type Filters */}
      <div className="overflow-x-auto scrollbar-hide max-w-7xl mx-auto px-4">
        <div className="flex space-x-2 whitespace-nowrap py-2">
          <button
            onClick={handleOpenSearch}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-800 text-gray-200 hover:bg-gray-700"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            onClick={() => onTabChange('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => onTabChange('points')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'points'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
          >
            Points
          </button>
          <button
            onClick={() => onTabChange('rebounds')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'rebounds'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
          >
            Rebounds
          </button>
          <button
            onClick={() => onTabChange('assists')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'assists'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
          >
            Assists
          </button>
          <button
            onClick={() => onTabChange('3PM')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === '3PM'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
          >
            3PM
          </button>
          <button
            onClick={() => onTabChange('blocks')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'blocks'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
          >
            Blocks
          </button>
          <button
            onClick={() => onTabChange('steals')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'steals'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
          >
            Steals
          </button>
        </div>
      </div>
    </div>
  );
}