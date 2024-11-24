import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Room, RoomSettings, RoomPlayer } from '../types/room';

const DEFAULT_SETTINGS: RoomSettings = {
  maxPlayers: 4,
  turnDuration: 20,
  autoStart: true,
  minPlayers: 2
};

// In production, these would be API calls
const api = {
  createRoom: async (hostPlayer: RoomPlayer): Promise<Room> => {
    const room: Room = {
      id: Math.random().toString(36).substring(2, 7).toUpperCase(),
      settings: DEFAULT_SETTINGS,
      players: [hostPlayer],
      status: 'waiting',
      createdAt: Date.now()
    };
    localStorage.setItem(`room-${room.id}`, JSON.stringify(room));
    return room;
  },

  joinRoom: async (roomId: string, player: RoomPlayer): Promise<Room> => {
    const room = await api.getRoom(roomId);
    if (!room) throw new Error('Room not found');
    if (room.players.length >= room.settings.maxPlayers) {
      throw new Error('Room is full');
    }
    room.players.push(player);
    localStorage.setItem(`room-${roomId}`, JSON.stringify(room));
    return room;
  },

  leaveRoom: async (roomId: string, playerId: string): Promise<Room> => {
    const room = await api.getRoom(roomId);
    if (!room) throw new Error('Room not found');
    room.players = room.players.filter(p => p.id !== playerId);
    localStorage.setItem(`room-${roomId}`, JSON.stringify(room));
    return room;
  },

  getRoom: async (roomId: string): Promise<Room | null> => {
    const data = localStorage.getItem(`room-${roomId}`);
    return data ? JSON.parse(data) : null;
  },

  updateSettings: async (roomId: string, settings: Partial<RoomSettings>): Promise<Room> => {
    const room = await api.getRoom(roomId);
    if (!room) throw new Error('Room not found');
    room.settings = { ...room.settings, ...settings };
    localStorage.setItem(`room-${roomId}`, JSON.stringify(room));
    return room;
  },

  setPlayerReady: async (roomId: string, playerId: string, isReady: boolean): Promise<Room> => {
    const room = await api.getRoom(roomId);
    if (!room) throw new Error('Room not found');
    room.players = room.players.map(p => 
      p.id === playerId ? { ...p, isReady } : p
    );
    localStorage.setItem(`room-${roomId}`, JSON.stringify(room));
    return room;
  },

  startGame: async (roomId: string): Promise<Room> => {
    const room = await api.getRoom(roomId);
    if (!room) throw new Error('Room not found');
    room.status = 'playing';
    localStorage.setItem(`room-${roomId}`, JSON.stringify(room));
    return room;
  }
};

export function useCreateRoom() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.createRoom,
    onSuccess: (room) => {
      queryClient.setQueryData(['room', room.id], room);
    }
  });
}

export function useJoinRoom() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ roomId, player }: { roomId: string; player: RoomPlayer }) =>
      api.joinRoom(roomId, player),
    onSuccess: (room) => {
      queryClient.setQueryData(['room', room.id], room);
    }
  });
}

export function useLeaveRoom() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ roomId, playerId }: { roomId: string; playerId: string }) =>
      api.leaveRoom(roomId, playerId),
    onSuccess: (room) => {
      queryClient.setQueryData(['room', room.id], room);
    }
  });
}

export function useRoom(roomId: string | null) {
  return useQuery({
    queryKey: ['room', roomId],
    queryFn: () => api.getRoom(roomId!),
    enabled: !!roomId,
    refetchInterval: 1000
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ roomId, settings }: { roomId: string; settings: Partial<RoomSettings> }) =>
      api.updateSettings(roomId, settings),
    onSuccess: (room) => {
      queryClient.setQueryData(['room', room.id], room);
    }
  });
}

export function useSetPlayerReady() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ roomId, playerId, isReady }: { roomId: string; playerId: string; isReady: boolean }) =>
      api.setPlayerReady(roomId, playerId, isReady),
    onSuccess: (room) => {
      queryClient.setQueryData(['room', room.id], room);
    }
  });
}

export function useStartGame() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.startGame,
    onSuccess: (room) => {
      queryClient.setQueryData(['room', room.id], room);
    }
  });
}