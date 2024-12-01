import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, BarChart2, Users, Pause, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import type { Cell, BotPlayer, Player } from '@/types';
import { generateRandomBoard, SOUND_URLS, checkBingoLines } from '@/utils/gameUtils';
import { COLORS } from '@/types/game';
import PlayerCard from './PlayerCard';
import BingoHeader from './BingoHeader';
import ChatBox from './ChatBox';
import VictoryOverlay from './VictoryOverlay';
import SidebarPopup from './SidebarPopup';
import PlayerSummaryWidget from './PlayerSummaryWidget';
import ConfirmDialog from './ConfirmDialog';
import VolumeControl from './VolumeControl';
import GameRules from './GameRules';
import PauseOverlay from './PauseOverlay';

export default function GameBoard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { playerName, bots, skipRules } = location.state || {};
  const lastCalledNumberRef = useRef<number | null>(null);
  const victoryPlayedRef = useRef<boolean>(false);

  const [players, setPlayers] = useState<Player[]>(() => {
    if (!playerName) return [];

    const playerList: Player[] = [{
      id: '1',
      name: playerName,
      isBot: false,
      dots: 0,
      color: COLORS[0],
      board: generateRandomBoard(),
      completedLines: [],
      stats: { numbersMarked: 0, linesCompleted: 0, avgTimePerMove: 0 }
    }];

    if (bots) {
      bots.forEach((bot: BotPlayer, index: number) => {
        playerList.push({
          id: bot.id,
          name: bot.name,
          isBot: true,
          difficulty: bot.difficulty,
          dots: 0,
          color: COLORS[(index + 1) % COLORS.length],
          board: generateRandomBoard(),
          completedLines: [],
          stats: { numbersMarked: 0, linesCompleted: 0, avgTimePerMove: 0 }
        });
      });
    }

    return playerList;
  });

  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [calledNumber, setCalledNumber] = useState<number | null>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(1);
  const [sidebarContent, setSidebarContent] = useState<'players' | 'stats' | 'chat' | null>(null);
  const [winner, setWinner] = useState<Player | null>(null);
  const [moveStartTime, setMoveStartTime] = useState<number>(Date.now());
  const [turnInProgress, setTurnInProgress] = useState<boolean>(false);
  const [lastPlayedNumbers, setLastPlayedNumbers] = useState<Record<string, number>>({});
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [showRules, setShowRules] = useState<boolean>(!skipRules);
  const [autoSelect, setAutoSelect] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Redirect if no player name
  useEffect(() => {
    if (!playerName) {
      navigate('/', { replace: true });
    }
  }, [playerName, navigate]);

  // Return null while checking player name to prevent flash
  if (!playerName || players.length === 0) return null;

  const [playMarkSound] = useSound(SOUND_URLS.mark, { soundEnabled: isSoundEnabled, volume });
  const [playLineSound] = useSound(SOUND_URLS.line, { soundEnabled: isSoundEnabled, volume });
  const [playVictorySound] = useSound(SOUND_URLS.victory, { soundEnabled: isSoundEnabled, volume });

  const humanPlayer = players[0];

  useEffect(() => {
    if (calledNumber !== null) {
      lastCalledNumberRef.current = calledNumber;
      setLastPlayedNumbers(prev => ({
        ...prev,
        [players[currentPlayer].id]: calledNumber
      }));
    }
  }, [calledNumber, currentPlayer, players]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      if (timeLeft > 0 && !turnInProgress) {
        setTimeLeft(prev => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, turnInProgress, isPaused]);

  useEffect(() => {
    if (isPaused) return;

    if (timeLeft === 0 && !turnInProgress && autoSelect) {
      if (!players[currentPlayer].isBot) {
        selectRandomCell();
      } else {
        handleTurnEnd();
      }
    }
  }, [timeLeft, turnInProgress, autoSelect, isPaused]);

  useEffect(() => {
    if (isPaused) return;

    if (players[currentPlayer].isBot && !turnInProgress) {
      setTimeout(makeBotMove, Math.random() * 2000 + 1000);
    }
  }, [currentPlayer, turnInProgress, isPaused]);

  const selectRandomCell = () => {
    const currentBoard = players[currentPlayer].board;
    const unselectedCells = currentBoard.flat().filter(cell => !cell.marked);
    if (unselectedCells.length > 0) {
      const randomCell = unselectedCells[Math.floor(Math.random() * unselectedCells.length)];
      markNumber(randomCell.value);
    }
  };

  const handleTurnEnd = () => {
    const moveTime = (Date.now() - moveStartTime) / 1000;
    updatePlayerStats(currentPlayer, moveTime);
    
    setCurrentPlayer(prev => (prev + 1) % players.length);
    setTimeLeft(20);
    setCalledNumber(null);
    setMoveStartTime(Date.now());
    setTurnInProgress(false);
  };

  const updatePlayerStats = (playerIndex: number, moveTime: number) => {
    setPlayers(prev => {
      const newPlayers = [...prev];
      const player = newPlayers[playerIndex];
      const moves = player.stats.numbersMarked + 1;
      const newAvgTime = (player.stats.avgTimePerMove * (moves - 1) + moveTime) / moves;
      
      player.stats = {
        ...player.stats,
        numbersMarked: moves,
        avgTimePerMove: newAvgTime
      };
      
      return newPlayers;
    });
  };

  const makeBotMove = () => {
    if (turnInProgress || isPaused) return;

    const currentBoard = players[currentPlayer].board;
    const availableNumbers = currentBoard.flat()
      .filter(cell => !cell.marked)
      .map(cell => cell.value);
    
    if (availableNumbers.length > 0) {
      setTurnInProgress(true);
      const number = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
      setCalledNumber(number);
      markNumber(number);
      if (isSoundEnabled) playMarkSound();
    }
  };

  const markNumber = (number: number) => {
    if (turnInProgress || isPaused) return;
    
    setTurnInProgress(true);
    if (isSoundEnabled) playMarkSound();
    setCalledNumber(number);
    
    setPlayers(prev => {
      return prev.map(player => {
        const newBoard = player.board.map(row =>
          row.map(cell =>
            cell.value === number ? { ...cell, marked: true } : cell
          )
        );
        
        const newLines = checkBingoLines(newBoard, player.completedLines);
        const newCompletedLines = [...player.completedLines, ...newLines];
        
        if (newLines.length > 0 && isSoundEnabled) {
          playLineSound();
        }

        return {
          ...player,
          board: newBoard,
          completedLines: newCompletedLines,
          dots: newCompletedLines.length,
          stats: {
            ...player.stats,
            linesCompleted: newCompletedLines.length
          }
        };
      });
    });

    setPlayers(prev => {
      const potentialWinner = prev.find(player => player.dots >= 5);
      if (potentialWinner && !victoryPlayedRef.current) {
        setTimeout(() => {
          setWinner(potentialWinner);
          if (isSoundEnabled) {
            playVictorySound();
            victoryPlayedRef.current = true;
          }
        }, 500);
      }
      return prev;
    });

    setTimeout(handleTurnEnd, 1000);
  };

  const handleGameStart = (autoSelectEnabled: boolean) => {
    setAutoSelect(autoSelectEnabled);
    setShowRules(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    setSidebarContent(null);
  };

  return (
    <div className="h-full flex flex-col">
      <AnimatePresence>
        {winner && (
          <VictoryOverlay winner={winner} onClose={() => setWinner(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRules && (
          <GameRules onStart={handleGameStart} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPaused && (
          <PauseOverlay onResume={handlePauseResume} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sidebarContent && !isPaused && !winner && (
          <SidebarPopup
            title={sidebarContent === 'players' ? 'Players' : sidebarContent === 'stats' ? 'Stats' : 'Chat'}
            icon={
              sidebarContent === 'players' ? <Users className="w-5 h-5" /> :
              sidebarContent === 'stats' ? <BarChart2 className="w-5 h-5" /> :
              <MessageSquare className="w-5 h-5" />
            }
            onClose={() => setSidebarContent(null)}
          >
            {sidebarContent === 'players' && (
              <div className="space-y-4">
                {players.map((player, index) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    isActive={currentPlayer === index}
                    calledNumber={lastPlayedNumbers[player.id] || null}
                    timeLeft={currentPlayer === index ? timeLeft : null}
                    showStats
                  />
                ))}
              </div>
            )}
            {sidebarContent === 'chat' && (
              <ChatBox players={players} currentPlayer={players[currentPlayer]} />
            )}
          </SidebarPopup>
        )}
      </AnimatePresence>

      <ConfirmDialog
        isOpen={showExitConfirm}
        onClose={() => setShowExitConfirm(false)}
        onConfirm={() => navigate('/')}
        title="Leave Game"
        message="Are you sure you want to leave? Your progress will be lost."
        confirmText="Leave Game"
        cancelText="Keep Playing"
        type="warning"
      />

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="text-3xl font-bold text-indigo-600 flex items-center gap-2 
                     hover:opacity-80 transition-opacity"
          >
            <Grid className="w-8 h-8" />
            BIDINGO
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarContent(sidebarContent === 'players' ? null : 'players')}
              className={`p-2 hover:bg-white/80 rounded-lg transition-colors ${
                sidebarContent === 'players' ? 'bg-white text-indigo-600 shadow-md' : 'text-gray-500'
              }`}
            >
              <Users className="w-6 h-6" />
            </button>
            <button
              onClick={() => setSidebarContent(sidebarContent === 'chat' ? null : 'chat')}
              className={`p-2 hover:bg-white/80 rounded-lg transition-colors ${
                sidebarContent === 'chat' ? 'bg-white text-indigo-600 shadow-md' : 'text-gray-500'
              }`}
            >
              <MessageSquare className="w-6 h-6" />
            </button>
            <button
              onClick={handlePauseResume}
              className="p-2 hover:bg-white/80 rounded-lg transition-colors text-gray-500"
            >
              <Pause className="w-6 h-6" />
            </button>
            <VolumeControl
              isSoundEnabled={isSoundEnabled}
              volume={volume}
              onVolumeChange={setVolume}
              onToggle={() => setIsSoundEnabled(!isSoundEnabled)}
            />
          </div>
        </div>

        <PlayerSummaryWidget 
          players={players}
          currentPlayerId={players[currentPlayer].id}
          timeLeft={timeLeft}
          lastPlayedNumbers={lastPlayedNumbers}
        />

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-[min(90vw,70vh)]">
            <BingoHeader completedLines={humanPlayer.completedLines} />
          </div>

          <motion.div 
            className="grid grid-cols-5 gap-3 bg-white rounded-xl p-6 shadow-lg w-full max-w-[min(90vw,70vh)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {humanPlayer.board.map((row, rowIndex) => (
              row.map((cell, colIndex) => (
                <motion.button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => !cell.marked && !turnInProgress && currentPlayer === 0 && !isPaused && markNumber(cell.value)}
                  disabled={cell.marked || turnInProgress || currentPlayer !== 0 || isPaused}
                  whileHover={{ scale: cell.marked || turnInProgress || isPaused ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    aspect-square flex items-center justify-center
                    text-sm sm:text-base md:text-lg lg:text-2xl font-bold 
                    rounded-sm sm:rounded-md lg:rounded-lg
                    transition-all duration-300
                    p-0.5 sm:p-1 md:p-2
                    ${cell.marked
                      ? 'bg-indigo-600 text-white shadow-inner scale-95'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                    ${calledNumber === cell.value ? 'ring-2 sm:ring-4 ring-yellow-400 animate-pulse' : ''}
                    disabled:cursor-not-allowed
                  `}
                >
                  {cell.value}
                </motion.button>
              ))
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}