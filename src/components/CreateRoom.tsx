import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import BackButton from './BackButton';

const RANDOM_NAMES = [
  'Butter Chicken', 'Masala Dosa', 'Biryani Master', 'Paneer King',
  'Samosa Prince', 'Curry Queen', 'Tandoori Chef', 'Gulab Jamun',
  'Pani Puri Pro', 'Chai Master', 'Naan Knight', 'Tikka Titan',
  'Chutney Champion', 'Daal Warrior', 'Lassi Legend'
];

const generateRoomCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 5 }, () => 
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
};

export default function CreateRoom() {
  const navigate = useNavigate();
  const [name, setName] = useState(() => 
    RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]
  );
  const [isCreating, setIsCreating] = useState(false);

  const createRoom = () => {
    setIsCreating(true);
    const code = generateRoomCode();
    setTimeout(() => {
      navigate(`/waiting/${code}`, { 
        state: { 
          isHost: true, 
          name,
          players: [{ id: '1', name, isHost: true }]
        } 
      });
    }, 500);
  };

  return (
    <div className="relative min-h-screen pt-24 px-6">
      <BackButton />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text 
                      bg-gradient-to-r from-indigo-600 to-purple-600">
            Create Room
          </h1>
          <p className="text-gray-600">Start a new game with friends</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Your Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
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
            <p className="text-xs text-gray-500">
              This name will be visible to other players
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={createRoom}
            disabled={!name.trim() || isCreating}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                     text-white font-medium flex items-center justify-center gap-2 
                     hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 
                     disabled:cursor-not-allowed transition-all duration-200
                     shadow-md hover:shadow-lg"
          >
            {isCreating ? (
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Creating Room...
              </div>
            ) : (
              <>Create Room</>
            )}
          </motion.button>

          <div className="text-center text-sm text-gray-500">
            A unique room code will be generated for you to share with friends
          </div>
        </div>
      </motion.div>
    </div>
  );
}