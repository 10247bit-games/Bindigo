import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Player {
  id: string;
  name: string;
  isHost: boolean;
}

// Simulated API calls (replace with real API in production)
const fetchRoomDetails = async (roomCode: string): Promise<{
  code: string;
  players: Player[];
  status: 'waiting' | 'starting' | 'playing';
}> => {
  // In production, this would be a real API call
  return JSON.parse(localStorage.getItem(`room-${roomCode}`) || '{}');
};

const joinRoom = async ({ roomCode, player }: { roomCode: string; player: Player }) => {
  // In production, this would be a real API call
  const room = await fetchRoomDetails(roomCode);
  room.players.push(player);
  localStorage.setItem(`room-${roomCode}`, JSON.stringify(room));
  return room;
};

const removePlayer = async ({ roomCode, playerId }: { roomCode: string; playerId: string }) => {
  // In production, this would be a real API call
  const room = await fetchRoomDetails(roomCode);
  room.players = room.players.filter(p => p.id !== playerId);
  localStorage.setItem(`room-${roomCode}`, JSON.stringify(room));
  return room;
};

export function useRoom(roomCode: string) {
  return useQuery({
    queryKey: ['room', roomCode],
    queryFn: () => fetchRoomDetails(roomCode),
    refetchInterval: 1000 // Poll every second
  });
}

export function useJoinRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinRoom,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['room', variables.roomCode] });
    }
  });
}

export function useRemovePlayer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removePlayer,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['room', variables.roomCode] });
    }
  });
}