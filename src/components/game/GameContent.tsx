import React from 'react';
import { motion } from 'framer-motion';
import type { Player } from '@/types';
import PlayerSummaryWidget from '../player/PlayerSummaryWidget';
import BingoHeader from '../BingoHeader';

interface GameContentProps {
  players: Player[];
  currentPlayer: number;
  timeLeft: number;
  calledNumber: number | null;
  lastPlayedNumbers: Record<string, number>;
  isPaused: boolean;
  onMarkNumber: (number: number) => void;
}

export default function GameContent({
  players,
  currentPlayer,
  timeLeft,
  calledNumber,
  lastPlayedNumbers,
  isPaused,
  onMarkNumber
}: GameContentProps) {
  const humanPlayer = players[0];

  return (
    <>
      <PlayerSummaryWidget 
        players={players}
        currentPlayerId={players[currentPlayer].id}
        timeLeft={timeLeft}
        lastPlayedNumbers={lastPlayedNumbers}
      />

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-[min(90vw,70vh)]">
          <BingoHeader completedLines={humanPlayer.completedLines} />
        </div>

        <motion.div 
          className="grid grid-cols-5 gap-3 bg-white rounded-xl p-6 shadow-lg w-full max-w-[min(90vw,70vh)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {humanPlayer.board.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <motion.button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => !cell.marked && !isPaused && currentPlayer === 0 && onMarkNumber(cell.value)}
                disabled={cell.marked || isPaused || currentPlayer !== 0}
                whileHover={{ scale: cell.marked || isPaused ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  aspect-square flex items-center justify-center
                  text-sm sm:text-base md:text-lg lg:text-2xl font-bold 
                  rounded-sm sm:rounded-md lg:rounded-lg
                  transition-all duration-300
                  p-0.5 sm:p-1 md:p-2
                  ${cell.marked
                    ? 'bg-indigo-600 text-white shadow-inner scale-95'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                  ${calledNumber === cell.value ? 'ring-2 sm:ring-4 ring-yellow-400 animate-pulse' : ''}
                  disabled:cursor-not-allowed
                `}
              >
                {cell.value}
              </motion.button>
            ))
          ))}
        </motion.div>
      </div>
    </>
  );
}