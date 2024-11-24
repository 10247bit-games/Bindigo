import React from 'react';
import { motion } from 'framer-motion';
import { Play, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PauseOverlayProps {
  onResume: () => void;
}

export default function PauseOverlay({ onResume }: PauseOverlayProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text 
                    bg-gradient-to-r from-indigo-600 to-purple-600">
          Game Paused
        </h2>

        <div className="space-y-3">
          <button
            onClick={onResume}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 
                     text-white font-medium flex items-center justify-center gap-2 
                     hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
          >
            <Play className="w-5 h-5" />
            Resume Game
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                     text-white font-medium flex items-center justify-center gap-2 
                     hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
          >
            <Home className="w-5 h-5" />
            Exit to Menu
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}