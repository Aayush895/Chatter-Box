import { Router } from 'express';
import {
  signupController,
  loginController,
  refreshTokensController,
} from '../../../controllers/auth.controller.js';
import { jwtAuthMiddleware } from '../../../middlewares/jwtAuthMiddleware.js';

const authRouterInstance = Router();
authRouterInstance.post('/sign-up', signupController);
authRouterInstance.post('/login', loginController);
authRouterInstance.post('/refresh', jwtAuthMiddleware, refreshTokensController);
export { authRouterInstance };
