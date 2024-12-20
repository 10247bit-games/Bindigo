export interface Cell {
  value: number;
  marked: boolean;
}

export interface Player {
  id: string;
  name: string;
  isBot: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  dots: number;
  color: string;
  board: Cell[][];
  completedLines: string[];
  stats: {
    numbersMarked: number;
    linesCompleted: number;
    avgTimePerMove: number;
  };
  lastMessage?: string;
}

export interface BotPlayer {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  ready: boolean;
}

export interface GameState {
  id: string;
  roomId: string;
  status: 'active' | 'completed';
  currentPlayer: string;
  players: Player[];
  lastMove: {
    playerId: string;
    number: number;
    timestamp: number;
  } | null;
  startedAt: number;
}

export const COLORS = ['#4F46E5', '#059669', '#DC2626', '#D97706'] as const;

export const BOT_MESSAGES = [
  "Good move!",
  "I'm thinking...",
  "Almost there!",
  "Well played!",
  "That was close!",
  "My turn now!",
  "Interesting strategy...",
  "BINGO incoming!",
  "Let me focus...",
  "Nice one!"
] as const;