import { NextFunction, Request, Response } from 'express';

class HttpException extends Error {
  status: number;

  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction): void {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response
    .status(status)
    .json({
      status,
      message,
    });
}

export { errorMiddleware, HttpException };
