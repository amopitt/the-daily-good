import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express';
import { UnauthorizedError } from './errorModels';

export function ErrorHandler(app: express.Router) {
  app.use(function errorHandler(err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {
    if (err instanceof UnauthorizedError) {
      console.warn(`Caught Unauthorized error for ${req.path}:`, err.message);
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
    if (err instanceof Error) {
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
    next();
  });
}
