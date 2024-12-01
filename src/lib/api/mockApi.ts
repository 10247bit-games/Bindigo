import type { Room, RoomPlayer, Profile, GameState, Player } from '@/types';
import { mockRooms, mockProfiles, mockGames } from './mockData';
import { COLORS } from '@/types/game';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async createRoom(player: RoomPlayer): Promise<Room> {
    await delay(500);
    const roomId = Math.random().toString(36).substring(2, 7).toUpperCase();
    const room: Room = {
      id: roomId,
      settings: {
        maxPlayers: 4,
        turnDuration: 20,
        autoStart: true,
        minPlayers: 2
      },
      players: [player],
      status: 'waiting',
      createdAt: Date.now()
    };
    mockRooms[roomId] = room;
    return room;
  },

  async getRoom(roomId: string): Promise<Room> {
    await delay(300);
    const room = mockRooms[roomId];
    if (!room) throw new Error('Room not found');
    return room;
  },

  async joinRoom(roomId: string, player: RoomPlayer): Promise<Room> {
    await delay(500);
    const room = mockRooms[roomId];
    if (!room) throw new Error('Room not found');
    if (room.players.length >= room.settings.maxPlayers) {
      throw new Error('Room is full');
    }
    room.players.push(player);
    return room;
  },

  async createGame(roomId: string, players: RoomPlayer[]): Promise<GameState> {
    await delay(500);
    const gameId = `game-${Date.now()}`;
    const game: GameState = {
      id: gameId,
      roomId,
      status: 'active',
      currentPlayer: players[0].id,
      players: players.map((player, index): Player => ({
        id: player.id,
        name: player.name,
        isBot: false,
        color: COLORS[index % COLORS.length],
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
      })),
      lastMove: null,
      startedAt: Date.now()
    };
    mockGames[gameId] = game;
    return game;
  },

  async getGame(gameId: string): Promise<GameState> {
    await delay(300);
    const game = mockGames[gameId];
    if (!game) throw new Error('Game not found');
    return game;
  },

  async makeMove(gameId: string, playerId: string, number: number): Promise<GameState> {
    await delay(500);
    const game = mockGames[gameId];
    if (!game) throw new Error('Game not found');
    if (game.currentPlayer !== playerId) {
      throw new Error('Not your turn');
    }
    
    game.players = game.players.map((player) => ({
      ...player,
      board: player.board.map((row) => 
        row.map((cell) => 
          cell.value === number ? { ...cell, marked: true } : cell
        )
      )
    }));
    
    game.lastMove = {
      playerId,
      number,
      timestamp: Date.now()
    };
    
    const currentPlayerIndex = game.players.findIndex((player) => player.id === playerId);
    game.currentPlayer = game.players[(currentPlayerIndex + 1) % game.players.length].id;
    
    return game;
  }
};