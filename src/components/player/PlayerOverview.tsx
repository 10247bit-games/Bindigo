import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import type { Player } from '@/types';

interface PlayerOverviewProps {
  players: Player[];
  currentPlayerId: string;
  timeLeft?: number;
  onPlayerSelect: (index: number) => void;
}

export default function PlayerOverview({
  players,
  currentPlayerId,
  timeLeft,
  onPlayerSelect
}: PlayerOverviewProps) {
  return (
    <div className="flex items-center justify-between px-3 w-full">
      {players.map((player, index) => (
        <motion.div
          key={player.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative"
        >
          <motion.div
            className={`
              relative flex items-center justify-center
              w-12 h-12 rounded-full transition-all duration-200
              ${player.id === currentPlayerId ? 'ring-2 ring-offset-2' : ''}
              ${player.dots > 0 ? 'shadow-md' : ''}
              cursor-pointer hover:scale-105
            `}
            style={{ 
              backgroundColor: player.color,
              border: player.id === currentPlayerId ? `2px solid ${player.color}` : undefined
            }}
            onClick={() => onPlayerSelect(index)}
          >
            <span className="text-white text-lg font-bold">
              {player.name.slice(0, 2).toUpperCase()}
            </span>
          </motion.div>

          {player.dots > 0 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full 
                        flex items-center justify-center text-sm font-bold shadow-md"
              style={{ 
                color: player.color,
                border: `2px solid ${player.color}`
              }}
            >
              {player.dots}
            </motion.div>
          )}
        </motion.div>
      ))}

      {timeLeft !== undefined && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                      flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-md">
          <Clock className="w-4 h-4" style={{ color: players[0].color }} />
          <span className="font-mono font-medium" style={{ color: players[0].color }}>
            {timeLeft}s
          </span>
        </div>
      )}
    </div>
  );
}