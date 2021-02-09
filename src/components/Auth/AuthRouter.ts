import { Router } from 'express';

import * as AuthComponent from '.';
import * as jwtConfig from '../../config/middleware/jwtAuth';

const router: Router = Router();

router.post('/signup', AuthComponent.signup);

router.post('/signin', AuthComponent.login);

router.get('/logout/:all', jwtConfig.isAuthenticated, AuthComponent.logout);

export default router;
