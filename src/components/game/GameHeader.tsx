import React from 'react';
import { Grid, Users, MessageSquare, Pause } from 'lucide-react';
import VolumeControl from '../VolumeControl';

interface GameHeaderProps {
  onShowPlayers: () => void;
  onShowChat: () => void;
  onPause: () => void;
  onExitGame: () => void;
  showPlayers: boolean;
  showChat: boolean;
  isSoundEnabled: boolean;
  volume: number;
  onVolumeChange: (volume: number) => void;
  onToggleSound: () => void;
}

export default function GameHeader({
  onShowPlayers,
  onShowChat,
  onPause,
  onExitGame,
  showPlayers,
  showChat,
  isSoundEnabled,
  volume,
  onVolumeChange,
  onToggleSound
}: GameHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={onExitGame}
        className="text-3xl font-bold text-indigo-600 flex items-center gap-2 
                 hover:opacity-80 transition-opacity"
      >
        <Grid className="w-8 h-8" />
        BIDINGO
      </button>
      <div className="flex items-center gap-2">
        <button
          onClick={onShowPlayers}
          className={`p-2 hover:bg-white/80 rounded-lg transition-colors ${
            showPlayers ? 'bg-white text-indigo-600 shadow-md' : 'text-gray-500'
          }`}
        >
          <Users className="w-6 h-6" />
        </button>
        <button
          onClick={onShowChat}
          className={`p-2 hover:bg-white/80 rounded-lg transition-colors ${
            showChat ? 'bg-white text-indigo-600 shadow-md' : 'text-gray-500'
          }`}
        >
          <MessageSquare className="w-6 h-6" />
        </button>
        <button
          onClick={onPause}
          className="p-2 hover:bg-white/80 rounded-lg transition-colors text-gray-500"
        >
          <Pause className="w-6 h-6" />
        </button>
        <VolumeControl
          isSoundEnabled={isSoundEnabled}
          volume={volume}
          onVolumeChange={onVolumeChange}
          onToggle={onToggleSound}
        />
      </div>
    </div>
  );
}