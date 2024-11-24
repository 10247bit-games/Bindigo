import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Users, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCreateRoom } from '../hooks/useRoomSystem';
import { type BotPlayer } from '../types/game';
import BackButton from './BackButton';

const RANDOM_NAMES = [
  'Butter Chicken', 'Masala Dosa', 'Biryani Master', 'Paneer King',
  'Samosa Prince', 'Curry Queen', 'Tandoori Chef', 'Gulab Jamun'
];

const BOT_PROFILES = [
  { id: 'turing', name: 'Alan Turing', difficulty: 'hard' as const },
  { id: 'curie', name: 'Marie Curie', difficulty: 'hard' as const },
  { id: 'einstein', name: 'Albert Einstein', difficulty: 'medium' as const },
  { id: 'ramanujan', name: 'Srinivasa Ramanujan', difficulty: 'medium' as const },
  { id: 'hopper', name: 'Grace Hopper', difficulty: 'medium' as const },
  { id: 'tesla', name: 'Nikola Tesla', difficulty: 'easy' as const },
  { id: 'newton', name: 'Isaac Newton', difficulty: 'easy' as const },
  { id: 'bose', name: 'Satyendra Nath Bose', difficulty: 'easy' as const }
];

export default function PlayWithBots() {
  const navigate = useNavigate();
  const { mutate: createRoom } = useCreateRoom();
  const [name, setName] = useState(() => 
    RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]
  );
  const [selectedBots, setSelectedBots] = useState<BotPlayer[]>([]);
  const [maxBots] = useState(3);
  const [isCreating, setIsCreating] = useState(false);

  const handleBotToggle = (botProfile: typeof BOT_PROFILES[number]) => {
    setSelectedBots(prev => {
      const exists = prev.find(bot => bot.id === botProfile.id);
      if (exists) {
        return prev.filter(bot => bot.id !== botProfile.id);
      }
      if (prev.length >= maxBots) {
        return prev;
      }
      return [...prev, { ...botProfile, ready: true }];
    });
  };

  const startGame = () => {
    setIsCreating(true);

    createRoom({
      id: '1',
      name,
      isHost: true,
      isReady: true,
      joinedAt: Date.now()
    }, {
      onSuccess: (room) => {
        navigate('/play', { 
          state: { 
            playerName: name,
            bots: selectedBots,
            isMultiplayer: false,
            roomId: room.id
          }
        });
      },
      onError: () => {
        setIsCreating(false);
      }
    });
  };

  return (
    <div className="h-full flex flex-col max-w-md mx-auto">
      <BackButton />
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-600 flex items-center justify-center gap-2">
          <Bot className="w-7 h-7" />
          Play with Bots
        </h1>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                     pr-10"
            placeholder="Enter your name"
          />
          <button
            onClick={() => setName(RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)])}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 
                     p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {BOT_PROFILES.map((bot) => (
            <button
              key={bot.id}
              onClick={() => handleBotToggle(bot)}
              disabled={selectedBots.length >= maxBots && !selectedBots.some(b => b.id === bot.id)}
              className={`
                p-3 rounded-lg border-2 transition-all duration-200
                ${selectedBots.some(b => b.id === bot.id)
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
                ${selectedBots.length >= maxBots && !selectedBots.some(b => b.id === bot.id)
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <Bot className={`w-5 h-5 ${
                  selectedBots.some(b => b.id === bot.id) ? 'text-indigo-600' : 'text-gray-500'
                }`} />
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">{bot.name}</div>
                  <div className={`text-xs ${
                    bot.difficulty === 'easy' ? 'text-green-600' :
                    bot.difficulty === 'medium' ? 'text-yellow-600' :
                    'text-red-600'
                  } capitalize`}>
                    {bot.difficulty}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg mb-4">
            <Users className="w-5 h-5 flex-shrink-0" />
            <p>Select up to {maxBots} bots to play against</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={startGame}
            disabled={!name.trim() || selectedBots.length === 0 || isCreating}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 
                     text-white font-medium flex items-center justify-center gap-2 
                     hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 
                     disabled:cursor-not-allowed transition-all duration-200"
          >
            {isCreating ? (
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Creating Game...
              </div>
            ) : (
              <>
                Start Game
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}