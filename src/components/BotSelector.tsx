import React from 'react';
import { Bot } from 'lucide-react';

interface BotSelectorProps {
  bot: {
    id: string;
    name: string;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  selected: boolean;
  disabled: boolean;
  onToggle: () => void;
}

const difficultyColors = {
  easy: 'text-green-600',
  medium: 'text-yellow-600',
  hard: 'text-red-600'
};

export default function BotSelector({ bot, selected, disabled, onToggle }: BotSelectorProps) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled && !selected}
      className={`
        p-3 rounded-lg border-2 transition-all duration-200
        ${selected 
          ? 'border-indigo-600 bg-indigo-50' 
          : 'border-gray-200 hover:border-gray-300'
        }
        ${disabled && !selected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <div className="flex items-center gap-2">
        <Bot className={`w-5 h-5 ${selected ? 'text-indigo-600' : 'text-gray-500'}`} />
        <div className="text-left">
          <div className="text-sm font-medium text-gray-900">{bot.name}</div>
          <div className={`text-xs ${difficultyColors[bot.difficulty]} capitalize`}>
            {bot.difficulty}
          </div>
        </div>
      </div>
    </button>
  );
}