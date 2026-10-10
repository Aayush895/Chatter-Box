import { Router } from 'express';
import { jwtAuthMiddleware } from '../../../middlewares/jwtAuthMiddleware.js';
import { welcomeController, fetchUsersController } from '../../../controllers/chat.controller.js';
import {
  sendFriendRequest,
  showAllPendingRequests,
  fetchUserFriendsController,
} from '../../../controllers/friends.controller.js';

import '../../../schemas/associations.js';

const homeRouter = Router();

homeRouter.get('/welcome', jwtAuthMiddleware, welcomeController);
homeRouter.get('/users', jwtAuthMiddleware, fetchUsersController);
homeRouter.get('/requests', jwtAuthMiddleware, showAllPendingRequests);
// TODO: Have to test this api
homeRouter.get('/friends', jwtAuthMiddleware, fetchUserFriendsController);

homeRouter.post('/request', jwtAuthMiddleware, sendFriendRequest);

export { homeRouter };
