import React from 'react';
import { Bot, Crown, Timer, Target } from 'lucide-react';

interface PlayerCardProps {
  player: {
    name: string;
    isBot: boolean;
    difficulty?: 'easy' | 'medium' | 'hard';
    dots: number;
    color: string;
    stats: {
      numbersMarked: number;
      linesCompleted: number;
      avgTimePerMove: number;
    };
  };
  isActive: boolean;
  calledNumber: number | null;
  timeLeft: number | null;
  showStats?: boolean;
}

export default function PlayerCard({ player, isActive, calledNumber, timeLeft, showStats }: PlayerCardProps) {
  return (
    <div
      className={`
        p-4 rounded-lg border-2 transition-all duration-300
        ${isActive 
          ? 'border-indigo-600 bg-indigo-50 shadow-md' 
          : 'border-transparent bg-white'
        }
      `}
      style={{ borderColor: isActive ? player.color : 'transparent' }}
    >
      <div className="flex items-center gap-3">
        {player.isBot ? (
          <Bot className="w-5 h-5" style={{ color: player.color }} />
        ) : (
          <Crown className="w-5 h-5" style={{ color: player.color }} />
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{player.name}</span>
            {player.difficulty && (
              <span className={`
                text-xs px-2 py-0.5 rounded-full
                ${player.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  player.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'}
              `}>
                {player.difficulty}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  i < player.dots
                    ? 'bg-current border-current'
                    : 'border-gray-300 bg-gray-50'
                }`}
                style={{ color: player.color }}
              />
            ))}
          </div>
        </div>

        {calledNumber !== null && (
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
            ${isActive ? 'bg-white shadow-inner' : 'bg-gray-100 opacity-50'}
          `}
            style={{ color: player.color }}>
            {calledNumber}
          </div>
        )}
      </div>

      {showStats && (
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Target className="w-4 h-4" />
            <span>{player.stats.numbersMarked} marked</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Timer className="w-4 h-4" />
            <span>{player.stats.avgTimePerMove.toFixed(1)}s avg</span>
          </div>
        </div>
      )}
    </div>
  );
}