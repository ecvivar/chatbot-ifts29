import type { NextFunction, Request, Response } from 'express';

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ success: false, error: 'Ruta no encontrada.' });
}

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  console.error('Error no controlado:', err);
  res.status(500).json({ success: false, error: 'Error interno del servidor.' });
}