import { Router } from 'express';

import { createExtension } from '../controllers/custom/customController';

const router = Router();

router.post('/create', createExtension);

export default router;
