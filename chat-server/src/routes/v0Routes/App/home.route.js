import { Router } from 'express';
import { jwtAuthMiddleware } from '../../../middlewares/jwtAuthMiddleware.js';
import { welcomeController, fetchUsersController } from '../../../controllers/chat.controller.js';
import { sendFriendRequest } from '../../../controllers/friends.controller.js';

const homeRouter = Router();

homeRouter.get('/welcome', jwtAuthMiddleware, welcomeController);
homeRouter.get('/users', jwtAuthMiddleware, fetchUsersController);
homeRouter.post('/request', jwtAuthMiddleware, sendFriendRequest);

export { homeRouter };
