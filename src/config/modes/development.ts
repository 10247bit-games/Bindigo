export const developmentConfig = {
  api: {
    baseURL: 'http://localhost:5173/api',
    timeout: 5000,
    retries: 1
  },
  features: {
    multiplayer: true,
    botGame: true,
    analytics: false
  },
  query: {
    staleTime: 0,
    gcTime: 1000 * 60,
    retryDelay: 1000,
    refetchOnWindowFocus: false
  },
  logging: {
    level: 'debug',
    enabled: true
  }
};