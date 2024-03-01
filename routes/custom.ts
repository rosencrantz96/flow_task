import { Router } from 'express';

import {
  createExtension,
  getExtension,
  deleteExtension,
} from '../controllers/custom/customController';

const router = Router();

router.get('/', getExtension);

router.post('/create', createExtension);

router.delete('/delete/:extId', deleteExtension);

export default router;
