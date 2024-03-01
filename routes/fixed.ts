import { Router } from 'express';

import { isChecked, getExtension } from '../controllers/fixed/fixedController';

const router = Router();

router.patch('/checked/:extId', isChecked);

router.get('/', getExtension);

export default router;
