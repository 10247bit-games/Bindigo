import React from 'react';

const BINGO = ['B', 'I', 'N', 'G', 'O'];

interface BingoHeaderProps {
  completedLines: string[];
}

export default function BingoHeader({ completedLines }: BingoHeaderProps) {
  const getCompletedCount = () => {
    return completedLines.length;
  };

  const isLetterCompleted = (index: number) => {
    const count = getCompletedCount();
    return index < count;
  };

  return (
    <div className="w-full max-w-[min(90vw,70vh)] flex justify-between px-4 mb-4">
      {BINGO.map((letter, index) => (
        <div
          key={letter}
          className={`
            flex items-center justify-center
            w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18
            text-base sm:text-xl md:text-2xl lg:text-3xl font-bold rounded-lg 
            transition-all duration-300
            ${isLetterCompleted(index)
              ? 'bg-green-600 text-white scale-110'
              : 'bg-transparent text-gray-400'
            }
          `}
        >
          {letter}
        </div>
      ))}
    </div>
  );
}