import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smile } from 'lucide-react';

interface ChatMessage {
  id: string;
  player: string;
  color: string;
  message: string;
  timestamp: number;
  isEmoji?: boolean;
}

interface ChatBoxProps {
  players: Array<{
    name: string;
    color: string;
    isBot: boolean;
  }>;
  currentPlayer: {
    name: string;
    color: string;
  };
}

const QUICK_EMOJIS = ['👍', '👏', '🎉', '🎯', '🎲', '🎮', '🔥', '💫', '✨', '🌟'];

const BOT_MESSAGES = [
  "Good move!",
  "I'm thinking...",
  "Almost there!",
  "Well played!",
  "That was close!",
  "My turn now!",
  "Interesting strategy...",
  "BINGO incoming!",
  "Let me focus...",
  "Nice one!"
];

export default function ChatBox({ players, currentPlayer }: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (players.find(p => p.name === currentPlayer.name)?.isBot) {
      const message = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];
      setTimeout(() => {
        addMessage(currentPlayer.name, currentPlayer.color, message);
      }, Math.random() * 1000 + 500);
    }
  }, [currentPlayer]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (player: string, color: string, message: string, isEmoji: boolean = false) => {
    const newMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      player,
      color,
      message,
      timestamp: Date.now(),
      isEmoji
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleEmojiClick = (emoji: string) => {
    addMessage(currentPlayer.name, currentPlayer.color, emoji, true);
    setShowEmojis(false);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      addMessage(currentPlayer.name, currentPlayer.color, newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-lg shadow-inner h-full flex flex-col"
    >
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm" style={{ color: msg.color }}>
                {msg.player}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className={`text-sm ${msg.isEmoji ? 'text-2xl' : 'text-gray-700'}`}>
              {msg.message}
            </p>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <AnimatePresence>
        {showEmojis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-3 border-t grid grid-cols-5 gap-2"
          >
            {QUICK_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleEmojiClick(emoji)}
                className="text-xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {emoji}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
        <button
          type="button"
          onClick={() => setShowEmojis(!showEmojis)}
          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 
                   rounded-lg transition-colors"
        >
          <Smile className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 
                   focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </motion.div>
  );
}