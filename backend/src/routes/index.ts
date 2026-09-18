import { Router } from 'express';
import { chatRouter } from './chat.routes';
import { healthRouter } from './health.routes';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/chat', chatRouter);