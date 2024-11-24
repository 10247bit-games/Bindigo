import React from 'react';
import { motion } from 'framer-motion';
import { Target, Crown, Clock } from 'lucide-react';

interface GameStatsProps {
  players: Array<{
    name: string;
    color: string;
    stats: {
      numbersMarked: number;
      linesCompleted: number;
      avgTimePerMove: number;
    };
  }>;
}

export default function GameStats({ players }: GameStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white"
    >
      {players.map((player, index) => (
        <div 
          key={index}
          className="p-3 rounded-lg bg-gray-50 space-y-3 mb-3 last:mb-0"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: player.color }}
            />
            <span className="font-medium text-sm">{player.name}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center p-2 bg-white rounded-md">
              <Target className="w-4 h-4 text-blue-500 mb-1" />
              <span className="text-sm font-medium">{player.stats.numbersMarked}</span>
              <span className="text-xs text-gray-500">Marked</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-white rounded-md">
              <Crown className="w-4 h-4 text-yellow-500 mb-1" />
              <span className="text-sm font-medium">{player.stats.linesCompleted}</span>
              <span className="text-xs text-gray-500">Lines</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-white rounded-md">
              <Clock className="w-4 h-4 text-green-500 mb-1" />
              <span className="text-sm font-medium">{player.stats.avgTimePerMove.toFixed(1)}s</span>
              <span className="text-xs text-gray-500">Avg</span>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}