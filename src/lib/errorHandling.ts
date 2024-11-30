import { QueryCache } from '@tanstack/react-query';

// Create a dedicated query cache with error handling
export const queryCache = new QueryCache({
  onError: (error) => {
    console.error('React Query error:', error);
  },
});

// Setup global error handlers
export const setupErrorHandlers = () => {
  // Global error handler
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    event.preventDefault();
  });

  // Promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
  });

  if (import.meta.env.DEV) {
    console.info('Error handlers initialized in development mode');
  }
};