import { Router } from 'express';
import { handleChat } from '../controllers/chat.controller';
import { validateChatRequest } from '../middleware/validate-chat-request';

export const chatRouter = Router();

chatRouter.post('/', validateChatRequest, handleChat);