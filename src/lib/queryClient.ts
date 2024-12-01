import { QueryClient } from '@tanstack/react-query';
import { getConfig } from '../config/modes';

const config = getConfig();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: config.query.staleTime,
      gcTime: config.query.gcTime,
      retry: config.api.retries,
      retryDelay: config.query.retryDelay,
      refetchOnWindowFocus: config.query.refetchOnWindowFocus
    }
  }
});