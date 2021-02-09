import * as express from 'express';
import {
  Request, Response, NextFunction,
} from 'express';
import * as http from 'http';
import * as jwtConfig from './middleware/jwtAuth';
import AuthRouter from '../components/Auth/AuthRouter';
import UserRouter from '../components/User/UserRouter';

export function init(app: express.Application): void {
  const router: express.Router = express.Router();

  app.use('/user', jwtConfig.isAuthenticated, UserRouter);

  app.use('/auth', AuthRouter);

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send(http.STATUS_CODES[404]);
  });

  app.use(router);
}
