export const testConfig = {
  api: {
    baseURL: 'http://localhost:5174/api',
    timeout: 3000,
    retries: 0
  },
  features: {
    multiplayer: true,
    botGame: true,
    analytics: false
  },
  query: {
    staleTime: 0,
    gcTime: 1000 * 30,
    retryDelay: 0,
    refetchOnWindowFocus: false
  },
  logging: {
    level: 'debug',
    enabled: true
  }
};