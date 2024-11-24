# BIDINGO Backend Requirements

## Overview
This document outlines the backend requirements for the BIDINGO game, including API endpoints, WebSocket events, data models, and technical specifications.

## API Endpoints

### 1. Room Management

#### Create Room
```http
POST /api/rooms
Content-Type: application/json

Request:
{
  "hostPlayer": {
    "name": string,
    "id": string
  },
  "settings": {
    "maxPlayers": number,
    "turnDuration": number,
    "autoStart": boolean,
    "minPlayers": number
  }
}

Response:
{
  "roomId": string,
  "code": string,
  "hostId": string,
  "settings": RoomSettings,
  "createdAt": number
}
```

#### Join Room
```http
POST /api/rooms/:code/join
Content-Type: application/json

Request:
{
  "player": {
    "name": string,
    "id": string
  }
}

Response:
{
  "success": boolean,
  "room": Room,
  "playerId": string
}
```

#### Get Room Status
```http
GET /api/rooms/:code

Response:
{
  "id": string,
  "code": string,
  "status": "waiting" | "starting" | "playing",
  "players": Player[],
  "settings": RoomSettings,
  "createdAt": number,
  "updatedAt": number
}
```

#### Update Room Settings
```http
PATCH /api/rooms/:code/settings
Content-Type: application/json

Request:
{
  "settings": Partial<RoomSettings>
}

Response:
{
  "success": boolean,
  "room": Room
}
```

#### Remove Player
```http
DELETE /api/rooms/:code/players/:playerId

Response:
{
  "success": boolean
}
```

### 2. Game Management

#### Initialize Game
```http
POST /api/games
Content-Type: application/json

Request:
{
  "roomId": string,
  "players": Player[]
}

Response:
{
  "gameId": string,
  "boards": Record<string, number[][]>,
  "currentPlayer": string,
  "status": "active"
}
```

#### Make Move
```http
POST /api/games/:gameId/moves
Content-Type: application/json

Request:
{
  "playerId": string,
  "number": number
}

Response:
{
  "success": boolean,
  "nextPlayer": string,
  "markedCells": {
    "playerId": string,
    "numbers": number[]
  }[],
  "completedLines": {
    "playerId": string,
    "lines": string[]
  }[]
}
```

#### Get Game State
```http
GET /api/games/:gameId

Response:
{
  "id": string,
  "status": "active" | "completed",
  "winner": string | null,
  "currentPlayer": string,
  "players": {
    "id": string,
    "name": string,
    "board": number[][],
    "dots": number,
    "completedLines": string[],
    "stats": PlayerStats
  }[],
  "lastMove": {
    "player": string,
    "number": number,
    "timestamp": number
  }
}
```

### 3. Chat System

#### Send Message
```http
POST /api/rooms/:code/messages
Content-Type: application/json

Request:
{
  "playerId": string,
  "content": string
}

Response:
{
  "id": string,
  "timestamp": number,
  "success": boolean
}
```

#### Get Messages
```http
GET /api/rooms/:code/messages?since=timestamp&limit=number

Response:
{
  "messages": Message[],
  "hasMore": boolean
}
```

## WebSocket Events

### Room Events
```typescript
interface RoomEvents {
  'room:player_joined': {
    roomId: string;
    player: Player;
  }
  'room:player_left': {
    roomId: string;
    playerId: string;
  }
  'room:settings_updated': {
    roomId: string;
    settings: RoomSettings;
  }
  'room:game_starting': {
    roomId: string;
    countdown: number;
  }
  'room:game_started': {
    roomId: string;
    gameId: string;
  }
}
```

### Game Events
```typescript
interface GameEvents {
  'game:turn_started': {
    gameId: string;
    playerId: string;
    timeLeft: number;
  }
  'game:move_made': {
    gameId: string;
    playerId: string;
    number: number;
    affectedPlayers: {
      playerId: string;
      markedNumbers: number[];
      newLines: string[];
      dots: number;
    }[];
  }
  'game:turn_timeout': {
    gameId: string;
    playerId: string;
    autoSelectedNumber?: number;
  }
  'game:completed': {
    gameId: string;
    winner: {
      playerId: string;
      stats: PlayerStats;
    };
  }
}
```

### Chat Events
```typescript
interface ChatEvents {
  'chat:message': {
    roomId: string;
    message: Message;
  }
  'chat:typing': {
    roomId: string;
    playerId: string;
  }
}
```

## Data Models

### Room
```typescript
interface Room {
  id: string;
  code: string;
  hostId: string;
  status: RoomStatus;
  settings: RoomSettings;
  players: Player[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Game
```typescript
interface Game {
  id: string;
  roomId: string;
  status: GameStatus;
  boards: Map<string, Board>;
  currentPlayer: string;
  moves: Move[];
  startedAt: Date;
  completedAt?: Date;
  winner?: string;
}
```

### Player
```typescript
interface Player {
  id: string;
  name: string;
  isBot: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  stats: PlayerStats;
}
```

## Technical Requirements

### Authentication
- JWT-based authentication
- Session management for reconnection
- Rate limiting for API endpoints

### Database
- MongoDB for game/room data
- Redis for real-time data and caching
- Indexes on frequently queried fields

### WebSocket
- Socket.io or WS for real-time communication
- Heartbeat mechanism
- Reconnection handling
- Room-based event broadcasting

### Performance
- Maximum latency: 100ms
- Support for concurrent games
- Horizontal scaling capability
- Load balancing

### Security
- Input validation
- XSS prevention
- CORS configuration
- Rate limiting
- Move validation

### Monitoring
- Error tracking
- Performance metrics
- Player analytics
- Game statistics

### Error Handling
- Graceful degradation
- Automatic reconnection
- State recovery
- Error logging

### Deployment
- Docker containerization
- CI/CD pipeline
- Environment configuration
- Backup strategy