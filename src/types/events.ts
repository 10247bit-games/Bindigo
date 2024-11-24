export interface RoomEvents {
  'room:player_joined': {
    roomId: string;
    player: {
      id: string;
      name: string;
      isBot: boolean;
    };
  };
  'room:player_left': {
    roomId: string;
    playerId: string;
  };
  'room:settings_updated': {
    roomId: string;
    settings: {
      maxPlayers: number;
      turnDuration: number;
      autoStart: boolean;
      minPlayers: number;
    };
  };
  'room:game_starting': {
    roomId: string;
    countdown: number;
  };
  'room:game_started': {
    roomId: string;
    gameId: string;
  };
}

export interface GameEvents {
  'game:turn_started': {
    gameId: string;
    playerId: string;
    timeLeft: number;
  };
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
  };
  'game:turn_timeout': {
    gameId: string;
    playerId: string;
    autoSelectedNumber?: number;
  };
  'game:completed': {
    gameId: string;
    winner: {
      playerId: string;
      stats: {
        numbersMarked: number;
        linesCompleted: number;
        avgTimePerMove: number;
      };
    };
  };
}

export interface ChatEvents {
  'chat:message': {
    roomId: string;
    message: {
      id: string;
      playerId: string;
      content: string;
      timestamp: number;
    };
  };
  'chat:typing': {
    roomId: string;
    playerId: string;
  };
}