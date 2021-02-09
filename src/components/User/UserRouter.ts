import { Router } from 'express';

import * as UserComponent from '.';

const router: Router = Router();

router.get('/info', UserComponent.info);

router.get('/latency', UserComponent.latency);

export default router;
