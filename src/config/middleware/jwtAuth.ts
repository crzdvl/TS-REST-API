import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import app from '../../index';
import AuthService from '../../components/Auth/service';

export interface RequestWithUser extends Request {
  user: {
    id: string;
    id_type: string;
    iat: number;
  };
}

export async function isAuthenticated(req: RequestWithUser, res: Response, next: NextFunction): Promise < void > {
  const token: string = req.header('authorization').split(' ')[1].toString();

  if (token) {
    try {
      const resultOfFindToken = await AuthService.findToken(token);

      if (resultOfFindToken === null) throw new Error('Your token isn\'t valid. Please log in or sign up to get a new token.');

      const user: any = jwt.verify(token, app.get('secret'));

      req.user = user;

      return next();
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  }

  res.status(400).json({
    message: 'No token provided. Where is your token?',
  });
}
