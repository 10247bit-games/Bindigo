import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from 'lucide-react';

export default function GameHeader() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
    >
      <Grid className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
      BIDINGO
    </button>
  );
}