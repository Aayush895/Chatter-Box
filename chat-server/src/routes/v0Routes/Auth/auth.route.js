import { Router } from 'express';
import { signupController } from '../../../controllers/auth.controller.js';

const authRouterInstance = Router();
authRouterInstance.post('/sign-up', signupController);

export { authRouterInstance };
