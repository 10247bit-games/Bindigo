import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Square, Clock, Target, Crown } from 'lucide-react';

interface GameRulesProps {
  onStart: (autoSelect: boolean) => void;
}

export default function GameRules({ onStart }: GameRulesProps) {
  const [autoSelect, setAutoSelect] = React.useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-auto space-y-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text 
                      bg-gradient-to-r from-indigo-600 to-purple-600">
            Welcome to BIDINGO!
          </h2>
          <p className="text-gray-500">Quick guide to get you started</p>
        </div>
        
        <div className="grid gap-4">
          <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <p className="text-gray-600">Mark numbers on your board when they're called</p>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-amber-50">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
              <p className="text-gray-600">20 seconds per turn to make your move</p>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-start gap-3">
              <Crown className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p className="text-gray-600">Complete 5 lines to win the game!</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <button
            onClick={() => setAutoSelect(!autoSelect)}
            className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
          >
            {autoSelect ? (
              <CheckSquare className="w-5 h-5" />
            ) : (
              <Square className="w-5 h-5" />
            )}
            <span>Auto-select number after 20 seconds</span>
          </button>
        </div>

        <button
          onClick={() => onStart(autoSelect)}
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                   text-white font-medium hover:from-indigo-700 hover:to-purple-700 
                   transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Let's Play!
        </button>
      </motion.div>
    </motion.div>
  );
}