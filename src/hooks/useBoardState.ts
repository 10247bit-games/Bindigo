import { useState, useRef, useEffect } from 'react';
import type { Player, BotPlayer } from '@/types';
import { generateRandomBoard, checkBingoLines } from '@/utils/gameUtils';
import { COLORS } from '@/types/game';

export function useBoardState(playerName: string | undefined, bots: BotPlayer[] | undefined) {
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
      bots.forEach((bot, index) => {
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
  const [winner, setWinner] = useState<Player | null>(null);
  const [moveStartTime, setMoveStartTime] = useState<number>(Date.now());
  const [turnInProgress, setTurnInProgress] = useState<boolean>(false);
  const [lastPlayedNumbers, setLastPlayedNumbers] = useState<Record<string, number>>({});

  useEffect(() => {
    if (calledNumber !== null) {
      lastCalledNumberRef.current = calledNumber;
      setLastPlayedNumbers(prev => ({
        ...prev,
        [players[currentPlayer].id]: calledNumber
      }));
    }
  }, [calledNumber, currentPlayer, players]);

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

  const markNumber = (number: number) => {
    if (turnInProgress) return;
    
    setTurnInProgress(true);
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
          victoryPlayedRef.current = true;
        }, 500);
      }
      return prev;
    });

    setTimeout(handleTurnEnd, 1000);
  };

  return {
    players,
    currentPlayer,
    winner,
    setWinner,
    timeLeft,
    setTimeLeft,
    calledNumber,
    lastPlayedNumbers,
    turnInProgress,
    markNumber,
    handleTurnEnd
  };
}