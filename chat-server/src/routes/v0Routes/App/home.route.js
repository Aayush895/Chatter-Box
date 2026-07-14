import { Router } from 'express';
import { jwtAuthMiddleware } from '../../../middlewares/jwtAuthMiddleware.js';
import { welcomeController } from '../../../controllers/chat.controller.js';

const homeRouter = Router();

homeRouter.post('/welcome', jwtAuthMiddleware, welcomeController);

export { homeRouter };
