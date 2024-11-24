import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Target, Zap, Settings } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';

interface ProfileCardProps {
  userId: string;
  onSettingsClick?: () => void;
}

export default function ProfileCard({ userId, onSettingsClick }: ProfileCardProps) {
  const { data: profile, isLoading } = useProfile(userId);

  if (isLoading || !profile) {
    return (
      <div className="animate-pulse bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="h-20 bg-gray-200 rounded-full w-20 mx-auto" />
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 
                         flex items-center justify-center text-2xl font-bold text-white">
              {profile.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-sm text-gray-500">
              Joined {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        {onSettingsClick && (
          <button
            onClick={onSettingsClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Trophy className="w-5 h-5" />
            <span className="font-medium">Win Rate</span>
          </div>
          <div className="text-2xl font-bold text-indigo-700">
            {((profile.stats.gamesWon / profile.stats.gamesPlayed) * 100).toFixed(1)}%
          </div>
          <p className="text-sm text-indigo-600">
            {profile.stats.gamesWon} / {profile.stats.gamesPlayed} games
          </p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <Zap className="w-5 h-5" />
            <span className="font-medium">Win Streak</span>
          </div>
          <div className="text-2xl font-bold text-purple-700">
            {profile.stats.currentStreak}
          </div>
          <p className="text-sm text-purple-600">
            Best: {profile.stats.winStreak}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Target className="w-4 h-4" />
            <span>Total Dots</span>
          </div>
          <span className="font-medium">{profile.stats.totalDots}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Avg Time/Move</span>
          </div>
          <span className="font-medium">{profile.stats.avgTimePerMove.toFixed(1)}s</span>
        </div>
      </div>

      {profile.stats.favoriteOpponents.length > 0 && (
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Favorite Opponents</h3>
          <div className="flex flex-wrap gap-2">
            {profile.stats.favoriteOpponents.map((opponent, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
              >
                {opponent}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}