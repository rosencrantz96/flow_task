import { Router } from 'express';

import { isChecked } from '../controllers/fixed/fixedController';

const router = Router();

router.patch('/checked/:extId', isChecked);

export default router;
