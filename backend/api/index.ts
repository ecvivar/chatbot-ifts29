import { createApp } from '../src/app';

/**
 * Función serverless para Vercel.
 * Exporta la instancia de Express creada a partir de la misma app
 * que se utiliza en desarrollo (src/app.ts).
 */
const app = createApp();

export default app;