export interface Profile {
  id: string;
  name: string;
  avatar?: string;
  stats: {
    gamesPlayed: number;
    gamesWon: number;
    totalDots: number;
    avgTimePerMove: number;
    favoriteOpponents: string[];
    winStreak: number;
    currentStreak: number;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    soundEnabled: boolean;
    notifications: boolean;
    language: string;
  };
  createdAt: number;
  updatedAt: number;
}