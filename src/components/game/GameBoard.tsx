import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import type { Cell, BotPlayer, Player } from '@/types';
import { generateRandomBoard, SOUND_URLS, checkBingoLines } from '@/utils/gameUtils';
import { COLORS } from '@/types/game';
import GameHeader from './GameHeader';
import GameContent from './GameContent';
import GameOverlays from './GameOverlays';
import { useBoardState } from '@/hooks/useBoardState';
import { useGameLogic } from '@/hooks/useGameLogic';

export default function GameBoard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { playerName, bots, skipRules } = location.state || {};

  const {
    players,
    currentPlayer,
    winner,
    setWinner,
    timeLeft,
    calledNumber,
    lastPlayedNumbers,
    markNumber,
    handleTurnEnd
  } = useBoardState(playerName, bots);

  const {
    isSoundEnabled,
    setIsSoundEnabled,
    volume,
    setVolume,
    sidebarContent,
    setSidebarContent,
    showExitConfirm,
    setShowExitConfirm,
    showRules,
    setShowRules,
    isPaused,
    setIsPaused,
    handleGameStart
  } = useGameLogic(skipRules);

  const [playMarkSound] = useSound(SOUND_URLS.mark, { soundEnabled: isSoundEnabled, volume });
  const [playLineSound] = useSound(SOUND_URLS.line, { soundEnabled: isSoundEnabled, volume });
  const [playVictorySound] = useSound(SOUND_URLS.victory, { soundEnabled: isSoundEnabled, volume });

  // Redirect if no player name
  useEffect(() => {
    if (!playerName) {
      navigate('/', { replace: true });
    }
  }, [playerName, navigate]);

  // Return null while checking player name to prevent flash
  if (!playerName || players.length === 0) return null;

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    setSidebarContent(null);
  };

  return (
    <div className="h-full flex flex-col">
      <GameOverlays
        winner={winner}
        onCloseWinner={() => setWinner(null)}
        showRules={showRules}
        onStartGame={handleGameStart}
        isPaused={isPaused}
        onResume={handlePauseResume}
        showExitConfirm={showExitConfirm}
        onCloseExitConfirm={() => setShowExitConfirm(false)}
        onConfirmExit={() => navigate('/')}
        sidebarContent={sidebarContent}
        onCloseSidebar={() => setSidebarContent(null)}
        players={players}
        currentPlayer={currentPlayer}
        lastPlayedNumbers={lastPlayedNumbers}
        timeLeft={timeLeft}
      />

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4">
        <GameHeader
          onShowPlayers={() => setSidebarContent(sidebarContent === 'players' ? null : 'players')}
          onShowChat={() => setSidebarContent(sidebarContent === 'chat' ? null : 'chat')}
          onPause={handlePauseResume}
          onExitGame={() => setShowExitConfirm(true)}
          showPlayers={sidebarContent === 'players'}
          showChat={sidebarContent === 'chat'}
          isSoundEnabled={isSoundEnabled}
          volume={volume}
          onVolumeChange={setVolume}
          onToggleSound={() => setIsSoundEnabled(!isSoundEnabled)}
        />

        <GameContent
          players={players}
          currentPlayer={currentPlayer}
          timeLeft={timeLeft}
          calledNumber={calledNumber}
          lastPlayedNumbers={lastPlayedNumbers}
          isPaused={isPaused}
          onMarkNumber={markNumber}
        />
      </div>
    </div>
  );
}