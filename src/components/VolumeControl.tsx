import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Volume1, Volume } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VolumeControlProps {
  isSoundEnabled: boolean;
  volume: number;
  onVolumeChange: (volume: number) => void;
  onToggle: () => void;
}

export default function VolumeControl({
  isSoundEnabled,
  volume,
  onVolumeChange,
  onToggle
}: VolumeControlProps) {
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sliderRef.current && 
          buttonRef.current && 
          !sliderRef.current.contains(event.target as Node) &&
          !buttonRef.current.contains(event.target as Node)) {
        setIsSliderVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getVolumeIcon = () => {
    if (!isSoundEnabled) return VolumeX;
    if (volume === 0) return VolumeX;
    if (volume < 0.3) return Volume;
    if (volume < 0.7) return Volume1;
    return Volume2;
  };

  const VolumeIcon = getVolumeIcon();

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={onToggle}
        onContextMenu={(e) => {
          e.preventDefault();
          setIsSliderVisible(!isSliderVisible);
        }}
        className={`p-2 hover:bg-white/80 rounded-lg transition-colors ${
          isSoundEnabled ? 'text-indigo-600' : 'text-gray-400'
        }`}
      >
        <VolumeIcon className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isSliderVisible && (
          <motion.div
            ref={sliderRef}
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            className="absolute right-0 mt-2 bg-white rounded-full shadow-lg p-3
                     w-48 transform origin-top-right z-50"
            style={{
              maxHeight: 'calc(100vh - 100px)',
              top: '100%'
            }}
          >
            <div className="flex items-center gap-3">
              <Volume className="w-4 h-4 text-gray-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="flex-1 h-1 bg-gray-200 rounded-full appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none
                         [&::-webkit-slider-thumb]:h-3
                         [&::-webkit-slider-thumb]:w-3
                         [&::-webkit-slider-thumb]:rounded-full
                         [&::-webkit-slider-thumb]:bg-indigo-600
                         [&::-webkit-slider-thumb]:shadow-md"
              />
              <Volume2 className="w-4 h-4 text-gray-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}