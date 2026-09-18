import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service';

export function handleChat(req: Request, res: Response): void {
  const { message } = req.body;
  const reply = chatService.respond(message);
  res.json({ success: true, reply });
}