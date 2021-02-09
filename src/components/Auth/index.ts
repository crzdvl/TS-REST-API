import * as Joi from 'joi';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import app from '../../index';
import AuthService from './service';
import { IUserModel } from '../User/model';
import { HttpException } from '../../config/middleware/errorHandler';

export async function signup(req: Request, res: Response, next: NextFunction): Promise < void > {
  try {
    const { error } = Joi.object().keys({
      id: Joi.string().required(),
      password: Joi.string().required(),
    }).validate(req.body);

    if (error) throw new Error(error.message);

    const idType = await AuthService.getIdType(req.body.id);
    const password = await AuthService.getHashedPassword(req.body.password);

    const user: IUserModel = await AuthService.createUser(req.body.id, idType, password);

    const token: string = jwt.sign({ id: user._id, id_type: user.id_type, expiresIn: '7d' }, app.get('secret'));

    AuthService.createToken(user._id, token);

    res.json({
      status: 200,
      logged: true,
      token,
      message: 'Sign in successfull :)',
    });
  } catch (error) {
    next(new HttpException(error.code, error.message));
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise < void > {
  try {
    const { error } = Joi.object().keys({
      id: Joi.string().required(),
      password: Joi.string().required(),
    }).validate(req.body);

    if (error) throw new Error(error.message);

    const user: IUserModel = await AuthService.getUser(req.body.id, req.body.password);

    const token: string = jwt.sign({ id: user._id, id_type: user.id_type, expiresIn: '7d' }, app.get('secret'));

    AuthService.createToken(user._id, token);

    res.json({
      status: 200,
      logged: true,
      token,
      message: 'Log in successfull :)',
    });
  } catch (error) {
    next(new HttpException(error.code, error.message));
  }
}

export async function logout(req: Request, res: Response, next: NextFunction): Promise < void > {
  try {
    const token = req.header('authorization').split(' ')[1];

    const user: any | string = await jwt.verify(token, app.get('secret'));

    if (req.params.all === 'true') await AuthService.deleteAllUsersTokens(user.id);
    else await AuthService.deleteUsersToken(token);

    res.json({
      status: 200,
      logged: true,
      message: 'Log out successfull',
    });
  } catch (error) {
    next(new HttpException(error.code, error.message));
  }
}
