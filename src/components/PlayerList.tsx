import React from 'react';
import { Crown, User, Check } from 'lucide-react';
import type { RoomPlayer } from '../types/room';

interface PlayerListProps {
  players: RoomPlayer[];
  isHost: boolean;
  onRemovePlayer?: (playerId: string) => void;
}

export default function PlayerList({ players, isHost, onRemovePlayer }: PlayerListProps) {
  return (
    <div className="space-y-2">
      {players.map((player) => (
        <div
          key={player.id}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
        >
          <div className="flex items-center gap-2">
            {player.isHost ? (
              <Crown className="w-5 h-5 text-yellow-500" />
            ) : (
              <User className="w-5 h-5 text-gray-400" />
            )}
            <span className="font-medium">{player.name}</span>
          </div>
          
          <div className="flex items-center gap-3">
            {player.isReady && (
              <Check className="w-5 h-5 text-green-500" />
            )}
            
            {isHost && !player.isHost && onRemovePlayer && (
              <button
                onClick={() => onRemovePlayer(player.id)}
                className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}