import { config as _config } from 'dotenv';
import { resolve } from 'path';

const ENV = process.env.NODE_ENV || 'production';
const envFile = resolve(__dirname, `.env.${ENV}`);
_config({ path: envFile });

export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiUrl: process.env.API_URL,
      eas: {
        projectId: "a8f84fa2-34bf-4b00-a857-361a29201903"
      }
    },
  };
};