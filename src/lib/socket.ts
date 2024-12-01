import { io, Socket } from 'socket.io-client';
import type { RoomEvents, GameEvents, ChatEvents } from '../types/events';

interface ServerToClientEvents extends RoomEvents, GameEvents, ChatEvents {
  connect: () => void;
  disconnect: () => void;
  connect_error: (error: Error) => void;
}

interface ClientToServerEvents {
  'room:join': (data: { roomCode: string }) => void;
  'room:leave': (data: { roomCode: string }) => void;
}

class SocketClient {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(token: string) {
    if (this.socket?.connected) return;

    this.socket = io(import.meta.env.VITE_WS_URL || 'ws://localhost:3000', {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
      timeout: 10000
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.reconnectAttempts++;

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('Max reconnection attempts reached');
      }
    });
  }

  joinRoom(roomCode: string) {
    this.socket?.emit('room:join', { roomCode });
  }

  leaveRoom(roomCode: string) {
    this.socket?.emit('room:leave', { roomCode });
  }

  onRoomEvent<K extends keyof RoomEvents>(
    event: K,
    callback: (payload: RoomEvents[K]) => void
  ) {
    this.socket?.on(event, callback as any);
  }

  onGameEvent<K extends keyof GameEvents>(
    event: K,
    callback: (payload: GameEvents[K]) => void
  ) {
    this.socket?.on(event, callback as any);
  }

  onChatEvent<K extends keyof ChatEvents>(
    event: K,
    callback: (payload: ChatEvents[K]) => void
  ) {
    this.socket?.on(event, callback as any);
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export const socketClient = new SocketClient();
export default socketClient;