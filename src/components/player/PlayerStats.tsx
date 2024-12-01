import React from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, Hash } from 'lucide-react';
import type { Player } from '@/types';

interface PlayerStatsProps {
  player: Player;
  lastNumber: number | null;
  onBack: () => void;
}

export default function PlayerStats({ player, lastNumber, onBack }: PlayerStatsProps) {
  return (
    <motion.div 
      key={`stats-${player.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-3 px-3 w-full"
    >
      <div
        onClick={onBack}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-md flex-shrink-0
                 cursor-pointer hover:scale-105 transition-transform"
        style={{ backgroundColor: player.color }}
      >
        <span className="text-white text-lg font-bold">
          {player.name.slice(0, 2).toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 flex-1">
        {lastNumber ? (
          <div className="flex flex-col items-center p-1.5 bg-gray-50 rounded-lg">
            <Hash className="w-4 h-4 text-purple-500 mb-0.5" />
            <span className="text-base font-bold" style={{ color: player.color }}>
              {lastNumber}
            </span>
            <span className="text-[10px] text-gray-500">Last</span>
          </div>
        ) : (
          <div className="flex flex-col items-center p-1.5 bg-gray-50 rounded-lg">
            <Hash className="w-4 h-4 text-purple-500 mb-0.5" />
            <span className="text-[10px] text-gray-500">No moves</span>
            <span className="text-[10px] text-gray-500">yet</span>
          </div>
        )}
        <div className="flex flex-col items-center p-1.5 bg-gray-50 rounded-lg">
          <Target className="w-4 h-4 text-blue-500 mb-0.5" />
          <span className="text-base font-bold text-gray-700">
            {player.stats.numbersMarked}
          </span>
          <span className="text-[10px] text-gray-500">Marked</span>
        </div>
        <div className="flex flex-col items-center p-1.5 bg-gray-50 rounded-lg">
          <Clock className="w-4 h-4 text-green-500 mb-0.5" />
          <span className="text-base font-bold text-gray-700">
            {player.stats.avgTimePerMove.toFixed(1)}s
          </span>
          <span className="text-[10px] text-gray-500">Avg</span>
        </div>
      </div>
    </motion.div>
  );
}