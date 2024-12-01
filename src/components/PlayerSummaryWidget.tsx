import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { Target, Clock, Hash } from 'lucide-react';
import type { Player } from '@/types';

interface PlayerSummaryWidgetProps {
  players: Player[];
  currentPlayerId: string;
  timeLeft?: number;
  lastPlayedNumbers?: Record<string, number>;
}

export default function PlayerSummaryWidget({
  players,
  currentPlayerId,
  timeLeft,
  lastPlayedNumbers = {}
}: PlayerSummaryWidgetProps) {
  const [view, setView] = useState<'overview' | 'stats'>('overview');
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(0);

  const handleViewChange = (direction: 'next' | 'prev') => {
    setView(prev => prev === 'overview' ? 'stats' : 'overview');
  };

  const handlePlayerChange = (direction: 'next' | 'prev') => {
    if (view === 'stats') {
      setSelectedPlayerIndex(prev => {
        const newIndex = direction === 'next'
          ? (prev + 1) % players.length
          : (prev - 1 + players.length) % players.length;
        return newIndex;
      });
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleViewChange('next'),
    onSwipedRight: () => handleViewChange('prev'),
    onSwipedUp: () => handlePlayerChange('next'),
    onSwipedDown: () => handlePlayerChange('prev'),
    trackMouse: true
  });

  const renderOverview = () => (
    <div className="flex items-center justify-between px-3 w-full">
      {players.map((player) => (
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
            onClick={() => {
              setSelectedPlayerIndex(players.indexOf(player));
              setView('stats');
            }}
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

  const renderStats = () => {
    const player = players[selectedPlayerIndex];
    const lastNumber = lastPlayedNumbers[player.id];
    
    return (
      <motion.div 
        key={`stats-${player.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-3 px-3 w-full"
      >
        <div
          onClick={() => setView('overview')}
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
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-[min(90vw,70vh)] mx-auto bg-white rounded-xl 
                 shadow-md p-3 mt-6 mb-4 h-[100px] flex flex-col"
      {...handlers}
    >
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex items-center"
          >
            {view === 'overview' ? renderOverview() : renderStats()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}