import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Users, UserMinus, Play, Crown, Copy, CheckCircle, AlertCircle, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from './BackButton';

interface Player {
  id: string;
  name: string;
  isHost: boolean;
}

export default function WaitingRoom() {
  const navigate = useNavigate();
  const { roomCode } = useParams();
  const location = useLocation();
  const { isHost, name, players: initialPlayers } = location.state || {};

  const [players, setPlayers] = useState<Player[]>(initialPlayers || [{
    id: '1',
    name: name || 'Unknown Player',
    isHost: isHost
  }]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [showError, setShowError] = useState(false);

  const canStartGame = players.length >= 2;

  useEffect(() => {
    if (countdown === 0) {
      navigate('/play', { 
        state: { 
          playerName: name,
          players: players,
          isMultiplayer: true
        }
      });
    }
    if (countdown !== null) {
      const timer = setInterval(() => {
        setCountdown(prev => (prev as number) - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown, navigate]);

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const removePlayer = (playerId: string) => {
    setPlayers(prev => prev.filter(p => p.id !== playerId));
  };

  const startGame = (skipCountdown?: boolean) => {
    if (!canStartGame) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (skipCountdown) {
      navigate('/play', { 
        state: { 
          playerName: name,
          players: players,
          isMultiplayer: true
        }
      });
    } else {
      setCountdown(5);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-8">
      <BackButton />
      
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-indigo-600">
          Waiting Room
        </h1>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-block"
        >
          <button
            onClick={copyRoomCode}
            className="px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg 
                     transition-all duration-200 border-2 border-indigo-100
                     flex items-center gap-3"
          >
            <span className="font-mono font-bold text-2xl tracking-wider text-indigo-600">
              {roomCode}
            </span>
            {copied ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5 text-indigo-400" />
            )}
          </button>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-8 left-1/2 transform -translate-x-1/2
                       bg-black text-white text-sm px-3 py-1 rounded-md"
            >
              Copied!
            </motion.div>
          )}
        </motion.div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50">
            <h2 className="font-semibold text-gray-700">Players ({players.length}/4)</h2>
          </div>
          <ul className="divide-y divide-gray-100">
            {players.map(player => (
              <motion.li
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {player.isHost ? (
                    <Crown className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <User className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="font-medium">{player.name}</span>
                </div>
                {isHost && !player.isHost && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removePlayer(player.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <UserMinus className="w-5 h-5" />
                  </motion.button>
                )}
              </motion.li>
            ))}
          </ul>
        </div>

        {isHost && (
          <div className="space-y-3">
            <AnimatePresence>
              {showError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>At least 2 players are required to start the game</span>
                </motion.div>
              )}
            </AnimatePresence>

            {countdown === null ? (
              <motion.button
                whileHover={{ scale: canStartGame ? 1.02 : 1 }}
                whileTap={{ scale: canStartGame ? 0.98 : 1 }}
                onClick={() => startGame()}
                disabled={!canStartGame}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium 
                         flex items-center justify-center gap-2 transition-all duration-200
                         shadow-md ${
                           canStartGame
                             ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-lg'
                             : 'bg-gray-400 cursor-not-allowed'
                         }`}
              >
                Start Game
                <Play className="w-5 h-5" />
              </motion.button>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-2"
              >
                <div className="text-3xl font-bold text-transparent bg-clip-text 
                              bg-gradient-to-r from-indigo-600 to-purple-600">
                  Starting in {countdown}...
                </div>
                <button
                  onClick={() => startGame(true)}
                  className="text-sm text-indigo-600 hover:text-indigo-700 
                           hover:underline transition-colors"
                >
                  Skip countdown
                </button>
              </motion.div>
            )}
          </div>
        )}

        {!isHost && (
          <div className="text-center text-gray-500">
            Waiting for host to start the game...
          </div>
        )}
      </div>
    </div>
  );
}