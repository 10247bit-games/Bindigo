import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(-1)}
      className="absolute left-6 top-6 p-2.5 bg-white rounded-lg shadow-md z-50
                 hover:bg-gray-50 transition-colors"
    >
      <ArrowLeft className="w-5 h-5 text-gray-600" />
    </motion.button>
  );
}