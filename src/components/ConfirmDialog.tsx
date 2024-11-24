import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
}

export default function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning'
}: ConfirmDialogProps) {
  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <AlertCircle className="w-6 h-6 text-red-600" />;
      case 'info':
        return <Info className="w-6 h-6 text-blue-600" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-amber-600" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'danger':
        return {
          bg: 'bg-red-600',
          hover: 'hover:bg-red-700',
          text: 'text-red-600'
        };
      case 'info':
        return {
          bg: 'bg-blue-600',
          hover: 'hover:bg-blue-700',
          text: 'text-blue-600'
        };
      default:
        return {
          bg: 'bg-amber-600',
          hover: 'hover:bg-amber-700',
          text: 'text-amber-600'
        };
    }
  };

  const colors = getColors();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-auto p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-4">
              {getIcon()}
              <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            
            <p className="text-gray-600 mb-8">{message}</p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={onConfirm}
                className={`px-4 py-3 ${colors.bg} text-white rounded-lg 
                         ${colors.hover} transition-colors font-medium`}
              >
                {confirmText}
              </button>
              <button
                onClick={onClose}
                className={`px-4 py-3 bg-gray-100 ${colors.text} rounded-lg 
                         hover:bg-gray-200 transition-colors font-medium`}
              >
                {cancelText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}