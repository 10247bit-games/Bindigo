export interface RoomSettings {
  maxPlayers: number;
  turnDuration: number;
  autoStart: boolean;
  minPlayers: number;
}

export interface RoomPlayer {
  id: string;
  name: string;
  isHost: boolean;
  isReady: boolean;
  joinedAt: number;
}

export interface Room {
  id: string;
  settings: RoomSettings;
  players: RoomPlayer[];
  status: 'waiting' | 'starting' | 'playing';
  createdAt: number;
}