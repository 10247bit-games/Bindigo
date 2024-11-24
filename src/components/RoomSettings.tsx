import React from 'react';
import { Settings, Clock, Users } from 'lucide-react';
import type { RoomSettings } from '../types/room';
import { useUpdateSettings } from '../hooks/useRoomSystem';

interface RoomSettingsProps {
  roomId: string;
  settings: RoomSettings;
  isHost: boolean;
}

export default function RoomSettings({ roomId, settings, isHost }: RoomSettingsProps) {
  const { mutate: updateSettings } = useUpdateSettings();

  const handleSettingChange = (key: keyof RoomSettings, value: number | boolean) => {
    if (!isHost) return;
    updateSettings({ roomId, settings: { [key]: value } });
  };

  return (
    <div className="space-y-4 bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2 text-indigo-600 font-medium">
        <Settings className="w-5 h-5" />
        Room Settings
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">Max Players</span>
          </div>
          <select
            value={settings.maxPlayers}
            onChange={(e) => handleSettingChange('maxPlayers', Number(e.target.value))}
            disabled={!isHost}
            className="px-2 py-1 rounded border border-gray-300 text-sm disabled:opacity-50"
          >
            {[2, 3, 4].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">Turn Duration</span>
          </div>
          <select
            value={settings.turnDuration}
            onChange={(e) => handleSettingChange('turnDuration', Number(e.target.value))}
            disabled={!isHost}
            className="px-2 py-1 rounded border border-gray-300 text-sm disabled:opacity-50"
          >
            {[10, 15, 20, 30].map(num => (
              <option key={num} value={num}>{num}s</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Auto-start when all ready</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoStart}
              onChange={(e) => handleSettingChange('autoStart', e.target.checked)}
              disabled={!isHost}
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
    </div>
  );
}