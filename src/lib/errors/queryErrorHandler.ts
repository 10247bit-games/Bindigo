import { QueryCache } from '@tanstack/react-query';
import { errorLogger } from './logger';

export const queryCache = new QueryCache({
  onError: (error, query) => {
    errorLogger.logError({
      type: 'query-error',
      error: error instanceof Error ? error : new Error(String(error)),
      context: {
        queryKey: query.queryKey,
        queryHash: query.queryHash,
        state: query.state
      },
      timestamp: Date.now()
    });
  }
});