import { errorLogger } from './logger';
import { scriptLoader } from './scriptLoader';

export function setupErrorHandlers() {
  // Handle script loading errors
  window.addEventListener('error', (event) => {
    if (event.target instanceof HTMLScriptElement) {
      errorLogger.logError({
        type: 'error',
        error: new Error(`Script loading failed: ${event.target.src}`),
        context: {
          type: 'script-load-error',
          src: event.target.src
        },
        timestamp: Date.now()
      });
      event.preventDefault();
      return;
    }

    errorLogger.logError({
      type: 'error',
      error: event.error || new Error(event.message),
      context: {
        filename: event.filename,
        lineNo: event.lineno,
        colNo: event.colno
      },
      timestamp: Date.now()
    });
  }, true);

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    errorLogger.logError({
      type: 'unhandled-rejection',
      error: event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
      context: {
        promise: event.promise
      },
      timestamp: Date.now()
    });
    event.preventDefault();
  });

  // Handle cross-origin errors
  window.addEventListener('error', (event) => {
    if (event.message === 'Script error.' && !event.error) {
      errorLogger.logError({
        type: 'error',
        error: new Error('Cross-origin script error'),
        context: {
          type: 'cross-origin-error',
          message: 'A cross-origin error occurred. This might be due to missing CORS headers.'
        },
        timestamp: Date.now()
      });
      event.preventDefault();
    }
  }, true);

  if (import.meta.env.DEV) {
    console.info('Error handlers initialized in development mode');
  }
}