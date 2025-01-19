import React from 'react';
import { Trophy } from 'lucide-react';
import { User } from '../types';

interface LeaderboardProps {
  users: User[];
}

export function Leaderboard({ users }: LeaderboardProps) {
  const sortedUsers = [...users].sort((a, b) => b.balance - a.balance);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-center space-x-3 mb-8">
        <Trophy className="h-8 w-8 text-yellow-400" />
        <h2 className="text-2xl font-bold text-gray-100">Leaderboard</h2>
      </div>
      <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700">
        {sortedUsers.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 border-b border-gray-700 last:border-b-0"
          >
            <div className="flex items-center space-x-4">
              <span className={`text-lg font-bold ${
                index === 0 ? 'text-yellow-400' :
                index === 1 ? 'text-gray-400' :
                index === 2 ? 'text-amber-600' : 'text-gray-500'
              }`}>
                #{index + 1}
              </span>
              <span className="font-medium text-gray-200">{user.username}</span>
            </div>
            <span className="font-bold text-emerald-400">${user.balance.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}