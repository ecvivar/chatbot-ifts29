import cors from 'cors';
import express from 'express';
import { allowedOrigins } from './config/cors';
import { errorHandler, notFoundHandler } from './middleware/error-handler';
import { apiRouter } from './routes';

export function createApp(): express.Express {
  const app = express();

  app.disable('x-powered-by');
  app.use(express.json({ limit: '10kb' }));
  app.use(
    cors({
      origin: allowedOrigins,
      methods: ['GET', 'POST'],
    }),
  );

  app.use('/api', apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}