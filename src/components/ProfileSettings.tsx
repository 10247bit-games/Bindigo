import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Volume2, Bell, Globe } from 'lucide-react';
import { useUpdateProfile } from '../hooks/useProfile';
import type { Profile } from '../types/profile';

interface ProfileSettingsProps {
  profile: Profile;
  onClose: () => void;
}

export default function ProfileSettings({ profile, onClose }: ProfileSettingsProps) {
  const { mutate: updateProfile } = useUpdateProfile();
  const [preferences, setPreferences] = React.useState(profile.preferences);

  const handleChange = (key: keyof Profile['preferences'], value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    updateProfile({
      id: profile.id,
      preferences
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4"
      >
        <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Theme</label>
            <div className="grid grid-cols-3 gap-2">
              {(['light', 'dark', 'system'] as const).map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleChange('theme', theme)}
                  className={`
                    p-2 rounded-lg border-2 transition-all
                    ${preferences.theme === theme
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200'
                    }
                  `}
                >
                  {theme === 'light' && <Sun className="w-5 h-5 mx-auto" />}
                  {theme === 'dark' && <Moon className="w-5 h-5 mx-auto" />}
                  {theme === 'system' && <Globe className="w-5 h-5 mx-auto" />}
                  <span className="text-sm mt-1 block capitalize">{theme}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium">Sound Effects</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.soundEnabled}
                  onChange={(e) => handleChange('soundEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                              peer-focus:ring-indigo-300 rounded-full peer 
                              peer-checked:after:translate-x-full peer-checked:after:border-white 
                              after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                              after:bg-white after:border-gray-300 after:border after:rounded-full 
                              after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600">
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium">Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.notifications}
                  onChange={(e) => handleChange('notifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                              peer-focus:ring-indigo-300 rounded-full peer 
                              peer-checked:after:translate-x-full peer-checked:after:border-white 
                              after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                              after:bg-white after:border-gray-300 after:border after:rounded-full 
                              after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600">
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Language</label>
            <select
              value={preferences.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="bn">Bengali</option>
              <option value="te">Telugu</option>
              <option value="mr">Marathi</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg 
                     hover:bg-indigo-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}