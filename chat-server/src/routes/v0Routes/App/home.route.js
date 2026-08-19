import { Router } from 'express';
import { jwtAuthMiddleware } from '../../../middlewares/jwtAuthMiddleware.js';
import { welcomeController, fetchUsersController } from '../../../controllers/chat.controller.js';

const homeRouter = Router();

homeRouter.get('/welcome', jwtAuthMiddleware, welcomeController);
homeRouter.post('/users', jwtAuthMiddleware, fetchUsersController);

export { homeRouter };
