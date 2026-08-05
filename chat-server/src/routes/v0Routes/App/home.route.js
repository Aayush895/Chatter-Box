import { Router } from 'express';
import { jwtAuthMiddleware } from '../../../middlewares/jwtAuthMiddleware.js';
import { welcomeController } from '../../../controllers/chat.controller.js';

const homeRouter = Router();

homeRouter.get('/welcome', jwtAuthMiddleware, welcomeController);

export { homeRouter };
