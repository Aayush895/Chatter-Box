import { Router } from 'express';
import { signupController, loginController } from '../../../controllers/auth.controller.js';

const authRouterInstance = Router();
authRouterInstance.post('/sign-up', signupController);
authRouterInstance.post('/login', loginController);
export { authRouterInstance };
