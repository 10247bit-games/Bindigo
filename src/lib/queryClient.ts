import { QueryClient } from '@tanstack/react-query';

const ENV = import.meta.env.VITE_ENV || 'development';

const config = {
  development: {
    defaultOptions: {
      queries: {
        staleTime: 0,
        gcTime: 1000 * 60
      }
    }
  },
  test: {
    defaultOptions: {
      queries: {
        staleTime: 0,
        gcTime: 1000 * 60
      }
    }
  },
  production: {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5
      }
    }
  }
}[ENV];

export const queryClient = new QueryClient(config);