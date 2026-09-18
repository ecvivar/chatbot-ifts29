import { env } from './env';

const localOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

export const allowedOrigins = [
  env.frontendUrl,
  ...(env.nodeEnv !== 'production' ? localOrigins : []),
].filter((origin) => origin.length > 0);