import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from './BackButton';

const RANDOM_NAMES = [
  'Butter Chicken', 'Masala Dosa', 'Biryani Master', 'Paneer King',
  'Samosa Prince', 'Curry Queen', 'Tandoori Chef', 'Gulab Jamun',
  'Pani Puri Pro', 'Chai Master', 'Naan Knight', 'Tikka Titan',
  'Chutney Champion', 'Daal Warrior', 'Lassi Legend'
];

export default function JoinRoom() {
  const navigate = useNavigate();
  const [name, setName] = useState(() => 
    RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]
  );
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const handleRoomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    const alphanumericValue = value.replace(/[^A-Z0-9]/g, '');
    
    setError('');
    setRoomCode(alphanumericValue);
  };

  const handleJoin = () => {
    if (!roomCode) {
      setError('Please enter a room code');
      return;
    }

    if (roomCode.length !== 5) {
      setError('Room code must be 5 characters');
      return;
    }

    if (!/^[A-Z0-9]{5}$/.test(roomCode)) {
      setError('Room code can only contain letters and numbers');
      return;
    }

    setIsJoining(true);
    setTimeout(() => {
      navigate(`/waiting/${roomCode}`, { 
        state: { 
          isHost: false, 
          name,
          players: [{ id: '1', name, isHost: false }]
        } 
      });
    }, 500);
  };

  const handleRandomName = () => {
    const newName = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
    setName(newName);
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
                      bg-gradient-to-r from-blue-600 to-cyan-600">
            Join Room
          </h1>
          <p className="text-gray-600">Enter a room code to join the game</p>
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
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         pr-10"
                placeholder="Enter your name"
              />
              <button
                onClick={handleRandomName}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 
                         p-1 hover:bg-gray-100 rounded-full transition-colors"
                title="Generate random name"
              >
                <Sparkles className="w-5 h-5 text-blue-400" />
              </button>
            </div>
            <p className="text-xs text-gray-500">
              This name will be visible to other players
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Room Code</label>
            <div className="relative">
              <input
                type="text"
                value={roomCode}
                onChange={handleRoomCodeChange}
                maxLength={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         uppercase tracking-wider text-center font-mono text-2xl
                         placeholder:text-gray-300"
                placeholder="XXXXX"
                style={{ letterSpacing: '0.5em' }}
              />
              <div className="absolute inset-x-0 -bottom-6">
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2 text-red-600 text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleJoin}
            disabled={!name.trim() || !roomCode.trim() || isJoining}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 
                     text-white font-medium flex items-center justify-center gap-2 
                     hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 
                     disabled:cursor-not-allowed transition-all duration-200
                     shadow-md hover:shadow-lg mt-8"
          >
            {isJoining ? (
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Joining Room...
              </div>
            ) : (
              <>Join Room</>
            )}
          </motion.button>

          <div className="text-center text-sm text-gray-500">
            Ask the room host for the 5-character room code
          </div>
        </div>
      </motion.div>
    </div>
  );
}