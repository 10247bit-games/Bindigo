import { QueryClient } from '@tanstack/react-query';

const ENV = import.meta.env.VITE_ENV || 'development';

export const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:5173/mock',
    timeout: 1000,
    useMocks: true
  },
  test: {
    baseURL: 'http://localhost:3001/api',
    timeout: 2000,
    useMocks: false
  },
  production: {
    baseURL: 'https://api.bidingo.com/api',
    timeout: 5000,
    useMocks: false
  }
}[ENV];

export const QUERY_CONFIG = {
  development: {
    defaultOptions: {
      queries: {
        staleTime: 0,
        retry: 0,
        refetchOnWindowFocus: false,
        gcTime: 1000 * 60
      }
    }
  },
  test: {
    defaultOptions: {
      queries: {
        staleTime: 1000,
        retry: 1,
        refetchOnWindowFocus: true,
        gcTime: 1000 * 60 * 5
      }
    }
  },
  production: {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
        retry: 3,
        refetchOnWindowFocus: true,
        gcTime: 1000 * 60 * 30
      }
    }
  }
}[ENV];