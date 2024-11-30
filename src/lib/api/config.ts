import { getConfig } from '../../config/modes';

const config = getConfig();

export const API_CONFIG = {
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  retries: config.api.retries
};

export const QUERY_CONFIG = {
  defaultOptions: {
    queries: {
      staleTime: config.query.staleTime,
      gcTime: config.query.gcTime,
      retry: config.api.retries,
      retryDelay: config.query.retryDelay,
      refetchOnWindowFocus: config.query.refetchOnWindowFocus
    }
  }
};