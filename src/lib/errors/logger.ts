const ENV = import.meta.env.VITE_ENV || 'development';
const VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

interface ErrorMetadata {
  environment: string;
  version: string;
  userAgent: string;
  url: string;
}

interface ErrorEvent {
  type: 'error' | 'unhandled-rejection' | 'query-error';
  error: Error;
  context?: Record<string, unknown>;
  timestamp: number;
}

class ErrorLogger {
  private metadata: ErrorMetadata;
  private initialized: boolean = false;

  constructor() {
    this.metadata = {
      environment: ENV,
      version: VERSION,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
  }

  initialize() {
    if (this.initialized) return;
    this.initialized = true;

    if (ENV === 'development') {
      console.info('[ErrorLogger] Initialized in development mode');
    }
  }

  logError(event: ErrorEvent) {
    if (!this.initialized) {
      this.initialize();
    }

    const errorData = {
      ...event,
      metadata: {
        ...this.metadata,
        timestamp: new Date().toISOString(),
        url: window.location.href
      }
    };

    if (ENV === 'development') {
      console.error('[ErrorLogger]', errorData);
      return;
    }

    // In production, you could send to your own error tracking service
    // or use localStorage to store errors for later analysis
    try {
      const errors = JSON.parse(localStorage.getItem('error_logs') || '[]');
      errors.push(errorData);
      localStorage.setItem('error_logs', JSON.stringify(errors.slice(-50))); // Keep last 50 errors
    } catch (e) {
      console.error('Failed to store error log:', e);
    }
  }

  clearErrors() {
    if (ENV === 'development') {
      console.info('[ErrorLogger] Errors cleared');
    }
    localStorage.removeItem('error_logs');
  }
}

export const errorLogger = new ErrorLogger();