export type Environment = 'development' | 'test' | 'production';

export function getEnvironment(): Environment {
  return (import.meta.env.VITE_ENV || 'development') as Environment;
}

export const isProduction = () => getEnvironment() === 'production';
export const isDevelopment = () => getEnvironment() === 'development';
export const isTest = () => getEnvironment() === 'test';