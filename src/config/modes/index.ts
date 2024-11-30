import { developmentConfig } from './development';
import { testConfig } from './test';
import { productionConfig } from './production';

export type Environment = 'development' | 'test' | 'production';
export type Config = typeof developmentConfig;

const configs = {
  development: developmentConfig,
  test: testConfig,
  production: productionConfig
} as const;

export function getConfig(): Config {
  const env = (import.meta.env.VITE_ENV || 'development') as Environment;
  return configs[env];
}