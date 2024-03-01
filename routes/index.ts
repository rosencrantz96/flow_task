import { Router } from 'express';

import fixed from './fixed';
import custom from './custom';

const router = Router();

router.use('/fixed', fixed);
router.use('/custom', custom);

export default router;
