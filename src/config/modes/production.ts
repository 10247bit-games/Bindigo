export const productionConfig = {
  api: {
    baseURL: 'https://api.bidingo.in',
    timeout: 10000,
    retries: 3
  },
  features: {
    multiplayer: false,
    botGame: true,
    analytics: true
  },
  query: {
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retryDelay: 1000,
    refetchOnWindowFocus: true
  },
  logging: {
    level: 'error',
    enabled: false
  }
};