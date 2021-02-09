import axios from 'axios';
import { NextFunction, Response } from 'express';

import AuthService from '../Auth/service';
import { RequestWithUser } from '../../config/middleware/jwtAuth';
import { HttpException } from '../../config/middleware/errorHandler';

export async function info(req: RequestWithUser, res: Response, next: NextFunction): Promise < void > {
  try {
    const token = req.header('authorization').split(' ')[1];

    await AuthService.deleteUsersToken(token);
    await AuthService.createToken(req.user.id, token);

    res.status(201).json({
      id: req.user.id,
      id_type: req.user.id_type,
    });
  } catch (error) {
    next(new HttpException(error.code, error.message));
  }
}

export async function latency(req: RequestWithUser, res: Response, next: NextFunction): Promise < void > {
  try {
    const token = req.header('authorization').split(' ')[1];

    await AuthService.deleteUsersToken(token);
    await AuthService.createToken(req.user.id, token);

    const startTime = Date.now();

    await axios.get('https://www.google.com/');

    const endTime: number = Date.now() - startTime;

    res.status(201).json({
      site: 'google.com',
      latency: `${endTime} ms`,
      message: 'have a nice day!',
    });
  } catch (error) {
    next(new HttpException(error.code, error.message));
  }
}
