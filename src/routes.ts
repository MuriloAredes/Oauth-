import {Router} from 'express';

import UserController from './app/Controllers/UserController';
import AuthController from './app/Controllers/AuthController';
import AuthMiddleware from './app/middleware/AuthMiddleware';

const router = Router();

router.post('/users', UserController.store)
router.post('/auth', AuthController.authenticate)
router.get('/auth', AuthMiddleware,AuthController.index)
export default router 