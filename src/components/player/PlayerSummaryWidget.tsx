import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import type { Player } from '@/types';
import PlayerOverview from './PlayerOverview';
import PlayerStats from './PlayerStats';

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

  const handlers = useSwipeable({
    onSwipedLeft: () => setView('stats'),
    onSwipedRight: () => setView('overview'),
    onSwipedUp: () => handlePlayerChange('next'),
    onSwipedDown: () => handlePlayerChange('prev'),
    trackMouse: true
  });

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
            {view === 'overview' ? (
              <PlayerOverview
                players={players}
                currentPlayerId={currentPlayerId}
                timeLeft={timeLeft}
                onPlayerSelect={(index) => {
                  setSelectedPlayerIndex(index);
                  setView('stats');
                }}
              />
            ) : (
              <PlayerStats
                player={players[selectedPlayerIndex]}
                lastNumber={lastPlayedNumbers[players[selectedPlayerIndex].id] || null}
                onBack={() => setView('overview')}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}