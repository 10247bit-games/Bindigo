import React from 'react';
import { AlertTriangle, RefreshCw, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 
                flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full space-y-6"
      >
        <div className="flex items-center gap-3 text-amber-600">
          <AlertTriangle className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Something went wrong</h2>
        </div>
        
        <div className="space-y-2">
          <p className="text-gray-600">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          {import.meta.env.DEV && (
            <pre className="text-xs bg-gray-50 p-3 rounded-lg overflow-auto max-h-32 
                         font-mono text-gray-700">
              {error.message}
              {error.stack && (
                <div className="mt-2 text-gray-500">
                  {error.stack.split('\n').slice(1).join('\n')}
                </div>
              )}
            </pre>
          )}
        </div>

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resetErrorBoundary}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                     text-white font-medium hover:from-indigo-700 hover:to-purple-700 
                     transition-all duration-200 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.reload()}
            className="w-full py-3 px-4 rounded-lg bg-gray-100 text-gray-700
                     font-medium hover:bg-gray-200 transition-all duration-200
                     flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Refresh Page
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}