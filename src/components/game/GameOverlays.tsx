import React from 'react';
import { AnimatePresence } from 'framer-motion';
import type { Player } from '@/types';
import VictoryOverlay from '../VictoryOverlay';
import GameRules from '../GameRules';
import PauseOverlay from '../PauseOverlay';
import ConfirmDialog from '../ConfirmDialog';
import SidebarPopup from '../SidebarPopup';
import PlayerCard from '../PlayerCard';
import ChatBox from '../ChatBox';
import { Users, BarChart2, MessageSquare } from 'lucide-react';

interface GameOverlaysProps {
  winner: Player | null;
  onCloseWinner: () => void;
  showRules: boolean;
  onStartGame: (autoSelect: boolean) => void;
  isPaused: boolean;
  onResume: () => void;
  showExitConfirm: boolean;
  onCloseExitConfirm: () => void;
  onConfirmExit: () => void;
  sidebarContent: 'players' | 'stats' | 'chat' | null;
  onCloseSidebar: () => void;
  players: Player[];
  currentPlayer: number;
  lastPlayedNumbers: Record<string, number>;
  timeLeft: number;
}

export default function GameOverlays({
  winner,
  onCloseWinner,
  showRules,
  onStartGame,
  isPaused,
  onResume,
  showExitConfirm,
  onCloseExitConfirm,
  onConfirmExit,
  sidebarContent,
  onCloseSidebar,
  players,
  currentPlayer,
  lastPlayedNumbers,
  timeLeft
}: GameOverlaysProps) {
  return (
    <>
      <AnimatePresence>
        {winner && (
          <VictoryOverlay winner={winner} onClose={onCloseWinner} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRules && (
          <GameRules onStart={onStartGame} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPaused && (
          <PauseOverlay onResume={onResume} />
        )}
      </AnimatePresence>

      <ConfirmDialog
        isOpen={showExitConfirm}
        onClose={onCloseExitConfirm}
        onConfirm={onConfirmExit}
        title="Leave Game"
        message="Are you sure you want to leave? Your progress will be lost."
        confirmText="Leave Game"
        cancelText="Keep Playing"
        type="warning"
      />

      <AnimatePresence>
        {sidebarContent && !isPaused && !winner && (
          <SidebarPopup
            title={sidebarContent === 'players' ? 'Players' : sidebarContent === 'stats' ? 'Stats' : 'Chat'}
            icon={
              sidebarContent === 'players' ? <Users className="w-5 h-5" /> :
              sidebarContent === 'stats' ? <BarChart2 className="w-5 h-5" /> :
              <MessageSquare className="w-5 h-5" />
            }
            onClose={onCloseSidebar}
          >
            {sidebarContent === 'players' && (
              <div className="space-y-4">
                {players.map((player, index) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    isActive={currentPlayer === index}
                    calledNumber={lastPlayedNumbers[player.id] || null}
                    timeLeft={currentPlayer === index ? timeLeft : null}
                    showStats
                  />
                ))}
              </div>
            )}
            {sidebarContent === 'chat' && (
              <ChatBox players={players} currentPlayer={players[currentPlayer]} />
            )}
          </SidebarPopup>
        )}
      </AnimatePresence>
    </>
  );
}