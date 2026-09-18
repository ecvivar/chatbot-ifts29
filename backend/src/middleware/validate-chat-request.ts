import type { NextFunction, Request, Response } from 'express';
import { chatService } from '../services/chat.service';

export function validateChatRequest(req: Request, res: Response, next: NextFunction): void {
  const message: unknown = req.body?.message;

  if (typeof message !== 'string' || message.trim() === '') {
    res.status(400).json({ success: false, error: 'El mensaje no puede estar vacío.' });
    return;
  }

  if (message.length > chatService.maxMessageLength) {
    res.status(400).json({
      success: false,
      error: `El mensaje supera el máximo de ${chatService.maxMessageLength} caracteres.`,
    });
    return;
  }

  req.body.message = message.trim();
  next();
}