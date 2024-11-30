import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 
                    flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full space-y-4">
        <div className="flex items-center gap-3 text-amber-600">
          <AlertTriangle className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Something went wrong</h2>
        </div>
        
        <div className="space-y-2">
          <p className="text-gray-600">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          {import.meta.env.DEV && (
            <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto max-h-32">
              {error.message}
            </pre>
          )}
        </div>

        <div className="space-y-2">
          <button
            onClick={resetErrorBoundary}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                     text-white font-medium hover:from-indigo-700 hover:to-purple-700 
                     transition-all duration-200"
          >
            Try Again
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 px-4 rounded-lg bg-gray-100 text-gray-700
                     font-medium hover:bg-gray-200 transition-all duration-200"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}