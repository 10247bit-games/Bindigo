import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type BotPlayer } from '../types/game';

interface Player {
  id: string;
  name: string;
  isBot: boolean;
  dots: number;
  color: string;
  board: Cell[][];
  completedLines: string[];
  stats: {
    numbersMarked: number;
    linesCompleted: number;
    avgTimePerMove: number;
  };
}

interface Cell {
  value: number;
  marked: boolean;
}

// Simulated API calls (replace with real API in production)
const fetchGameState = async (gameId: string): Promise<{
  players: Player[];
  currentPlayer: number;
  calledNumber: number | null;
}> => {
  // In production, this would be a real API call
  return JSON.parse(localStorage.getItem(`game-${gameId}`) || '{}');
};

const makeMove = async ({ gameId, number }: { gameId: string; number: number }) => {
  // In production, this would be a real API call
  const gameState = await fetchGameState(gameId);
  // Update game state
  localStorage.setItem(`game-${gameId}`, JSON.stringify({
    ...gameState,
    calledNumber: number
  }));
  return number;
};

export function useGameState(gameId: string) {
  return useQuery({
    queryKey: ['game', gameId],
    queryFn: () => fetchGameState(gameId),
    refetchInterval: 1000 // Poll every second
  });
}

export function useGameMove() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: makeMove,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['game', variables.gameId] });
    }
  });
}

export function usePlayerStats(playerId: string) {
  return useQuery({
    queryKey: ['player', playerId, 'stats'],
    queryFn: async () => {
      // In production, this would be a real API call
      return JSON.parse(localStorage.getItem(`player-${playerId}-stats`) || '{}');
    },
    staleTime: 5 * 60 * 1000 // Consider data fresh for 5 minutes
  });
}