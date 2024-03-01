import { Router } from 'express';

import {
  createExtension,
  getExtension,
} from '../controllers/custom/customController';

const router = Router();

router.get('/', getExtension);

router.post('/create', createExtension);

export default router;
