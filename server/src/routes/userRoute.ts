import { Router } from 'express';

import { checkJwt } from 'middlewares/jwt';
import userController from 'controllers/userController';

const router = Router();

router.route('/').put(checkJwt, userController.updateUser);

export default router;
