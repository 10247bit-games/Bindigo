import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface SidebarPopupProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
}

export default function SidebarPopup({ title, icon, children, onClose }: SidebarPopupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed right-4 top-20 w-80 bg-white rounded-xl shadow-xl overflow-hidden z-50"
    >
      <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center gap-2 text-indigo-600">
          {icon}
          <h3 className="font-semibold">{title}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/50 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div className="p-4 max-h-[calc(100vh-160px)] overflow-y-auto">
        {children}
      </div>
    </motion.div>
  );
}