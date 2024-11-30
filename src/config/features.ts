import { Environment, getEnvironment } from './environment';

export interface Features {
  multiplayer: boolean;
  botGame: boolean;
  analytics: boolean;
}

const FEATURES: Record<Environment, Features> = {
  development: {
    multiplayer: true,
    botGame: true,
    analytics: false
  },
  test: {
    multiplayer: true,
    botGame: true,
    analytics: true
  },
  production: {
    multiplayer: false,
    botGame: true,
    analytics: true
  }
} as const;

export const getFeatureFlags = (): Features => {
  const env = getEnvironment();
  return FEATURES[env];
};