import { useState } from 'react';

export function useGameLogic(skipRules: boolean) {
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(1);
  const [sidebarContent, setSidebarContent] = useState<'players' | 'stats' | 'chat' | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [showRules, setShowRules] = useState<boolean>(!skipRules);
  const [autoSelect, setAutoSelect] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const handleGameStart = (autoSelectEnabled: boolean) => {
    setAutoSelect(autoSelectEnabled);
    setShowRules(false);
  };

  return {
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
    autoSelect,
    isPaused,
    setIsPaused,
    handleGameStart
  };
}