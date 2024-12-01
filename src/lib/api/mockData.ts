import type { Room, RoomPlayer, Profile, GameState } from '@/types';
import { COLORS } from '@/types/game';

export const mockRooms: Record<string, Room> = {
  'DEMO1': {
    id: 'DEMO1',
    settings: {
      maxPlayers: 4,
      turnDuration: 20,
      autoStart: true,
      minPlayers: 2
    },
    players: [
      {
        id: 'host1',
        name: 'Demo Host',
        isHost: true,
        isReady: true,
        joinedAt: Date.now()
      }
    ],
    status: 'waiting',
    createdAt: Date.now()
  }
};

export const mockProfiles: Record<string, Profile> = {
  'demo-user': {
    id: 'demo-user',
    name: 'Demo Player',
    stats: {
      gamesPlayed: 10,
      gamesWon: 6,
      totalDots: 45,
      avgTimePerMove: 8.5,
      favoriteOpponents: ['Bot Einstein', 'Bot Curie'],
      winStreak: 3,
      currentStreak: 1
    },
    preferences: {
      theme: 'light',
      soundEnabled: true,
      notifications: true,
      language: 'en'
    },
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
    updatedAt: Date.now()
  }
};

export const mockGames: Record<string, GameState> = {
  'game1': {
    id: 'game1',
    roomId: 'DEMO1',
    status: 'active',
    currentPlayer: 'player1',
    players: [
      {
        id: 'player1',
        name: 'Demo Player',
        isBot: false,
        color: COLORS[0],
        board: Array(5).fill(null).map(() => 
          Array(5).fill(null).map(() => ({
            value: Math.floor(Math.random() * 25) + 1,
            marked: false
          }))
        ),
        dots: 0,
        completedLines: [],
        stats: {
          numbersMarked: 0,
          linesCompleted: 0,
          avgTimePerMove: 0
        }
      }
    ],
    lastMove: null,
    startedAt: Date.now()
  }
};