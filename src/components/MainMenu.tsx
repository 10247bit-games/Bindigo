import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserPlus, Bot, Sparkles, Heart, Github, Coffee, Grid, Shield } from 'lucide-react';
import MenuButton from './MenuButton';

const ENV = import.meta.env.VITE_ENV || 'development';
const isProd = ENV === 'production';

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto h-full flex flex-col">
      <div className="flex-1">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center gap-3">
            <Grid className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-indigo-600" />
            BIDINGO
          </h1>
          <p className="text-gray-600">The Indian Bingo Game</p>
        </div>

        <div className="space-y-4">
          {!isProd && (
            <>
              <MenuButton 
                icon={<UserPlus className="w-6 h-6" />}
                label="Create a Room"
                description="Start a new game room"
                onClick={() => navigate('/create')}
                gradient="from-indigo-500 to-purple-500"
              />

              <MenuButton 
                icon={<Users className="w-6 h-6" />}
                label="Join a Room"
                description="Enter an existing game"
                onClick={() => navigate('/join')}
                gradient="from-blue-500 to-cyan-500"
              />
            </>
          )}

          <MenuButton 
            icon={<Bot className="w-6 h-6" />}
            label="Play with Bots"
            description="Practice against AI players"
            onClick={() => navigate('/play-with-bots')}
            gradient="from-emerald-500 to-teal-500"
          />
        </div>
      </div>

      <footer className="mt-8 space-y-4">
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/privacy')}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <Shield className="w-4 h-4" />
            Privacy Policy
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center">Version 1.0.0</p>
        {isProd && (
          <p className="text-sm text-indigo-600 text-center">
            Multiplayer features coming soon!
          </p>
        )}
        
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>by</span>
            <a
              href="https://github.com/10247bit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-800 hover:text-indigo-600 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>10247bit</span>
            </a>
          </div>

          <a
            href="https://buymeacoffee.com/10247bit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFDD00] text-[#000000] 
                     rounded-lg hover:bg-[#FFDD00]/90 transition-colors text-sm font-medium"
          >
            <Coffee className="w-4 h-4" />
            Buy Me A Coffee
          </a>
        </div>
      </footer>
    </div>
  );
}