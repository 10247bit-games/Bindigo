import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Home, RotateCcw } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';

interface VictoryOverlayProps {
  winner: {
    name: string;
    color: string;
  };
  onClose: () => void;
}

export default function VictoryOverlay({ winner, onClose }: VictoryOverlayProps) {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // Confetti only around the trophy icon
    const element = document.getElementById('trophy-icon');
    if (element) {
      const rect = element.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x, y },
        colors: [winner.color, '#FFD700', '#FFA500'],
        disableForReducedMotion: true
      });
    }
  }, [winner.color]);

  const handlePlayAgain = () => {
    onClose();
    const { playerName, bots, isMultiplayer } = location.state || {};
    navigate('/reset-game', { replace: true });
    setTimeout(() => {
      navigate('/play', {
        replace: true,
        state: {
          playerName,
          bots,
          isMultiplayer,
          timestamp: Date.now(),
          skipRules: true
        }
      });
    }, 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-auto space-y-6"
      >
        <div className="text-center space-y-4">
          <motion.div
            id="trophy-icon"
            initial={{ rotate: -10 }}
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="inline-block p-4 bg-yellow-100 rounded-full"
          >
            <Trophy className="w-12 h-12 text-yellow-600" />
          </motion.div>

          <div>
            <motion.h2
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-transparent bg-clip-text 
                      bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              Victory!
            </motion.h2>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2"
            >
              <span className="text-gray-600">Congratulations to</span>
              <div className="text-xl font-bold mt-1" style={{ color: winner.color }}>
                {winner.name}
              </div>
            </motion.div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handlePlayAgain}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 
                       text-white font-medium flex items-center justify-center gap-2 
                       hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </button>

            <button
              onClick={() => navigate('/', { replace: true })}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                       text-white font-medium flex items-center justify-center gap-2 
                       hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
            >
              <Home className="w-5 h-5" />
              Back to Menu
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}