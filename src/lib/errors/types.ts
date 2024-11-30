export interface ErrorEvent {
  type: 'error' | 'unhandled-rejection' | 'query-error';
  error: Error;
  context?: Record<string, unknown>;
  timestamp: number;
}

export interface ErrorMetadata {
  environment: string;
  version: string;
  userAgent: string;
  url: string;
}