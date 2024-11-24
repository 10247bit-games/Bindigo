import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface ChatMessage {
  id: string;
  player: string;
  color: string;
  message: string;
  timestamp: number;
}

// Simulated API calls (replace with real API in production)
const fetchMessages = async (roomCode: string): Promise<ChatMessage[]> => {
  // In production, this would be a real API call
  return JSON.parse(localStorage.getItem(`chat-${roomCode}`) || '[]');
};

const sendMessage = async ({ 
  roomCode, 
  message 
}: { 
  roomCode: string; 
  message: ChatMessage 
}) => {
  // In production, this would be a real API call
  const messages = await fetchMessages(roomCode);
  messages.push(message);
  localStorage.setItem(`chat-${roomCode}`, JSON.stringify(messages));
  return message;
};

export function useChat(roomCode: string) {
  return useQuery({
    queryKey: ['chat', roomCode],
    queryFn: () => fetchMessages(roomCode),
    refetchInterval: 1000 // Poll every second
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onMutate: async ({ roomCode, message }) => {
      await queryClient.cancelQueries({ queryKey: ['chat', roomCode] });
      
      const previousMessages = queryClient.getQueryData(['chat', roomCode]);
      
      queryClient.setQueryData(['chat', roomCode], (old: ChatMessage[] = []) => [
        ...old,
        { ...message, pending: true }
      ]);
      
      return { previousMessages };
    },
    onError: (err, { roomCode }, context) => {
      queryClient.setQueryData(['chat', roomCode], context?.previousMessages);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['chat', variables.roomCode] });
    }
  });
}