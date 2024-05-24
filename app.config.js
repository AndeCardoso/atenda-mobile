import { ExpoConfig, ConfigContext } from '@expo/config';
import { config as _config } from 'dotenv';
import { resolve } from 'path';

const ENV = process.env.NODE_ENV || 'development';
const envFile = resolve(__dirname, `.env.${ENV}`);
_config({ path: envFile });

export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiUrl: process.env.API_URL,
    },
  };
};