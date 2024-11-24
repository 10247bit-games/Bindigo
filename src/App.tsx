import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import WaitingRoom from './components/WaitingRoom';
import PlayWithBots from './components/PlayWithBots';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="h-full overflow-auto">
        <div className="min-h-full px-4 py-6">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainMenu />} />
              <Route path="/create" element={<CreateRoom />} />
              <Route path="/join" element={<JoinRoom />} />
              <Route path="/waiting/:roomCode" element={<WaitingRoom />} />
              <Route path="/play-with-bots" element={<PlayWithBots />} />
              <Route path="/play" element={<GameBoard />} />
              <Route path="/reset-game" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;