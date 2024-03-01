import { Router } from 'express';

import fixed from './fixed';

const router = Router();

router.use('/fixed', fixed);

export default router;
