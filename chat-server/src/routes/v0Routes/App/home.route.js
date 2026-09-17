import { Router } from 'express';
import { jwtAuthMiddleware } from '../../../middlewares/jwtAuthMiddleware.js';
import { welcomeController, fetchUsersController } from '../../../controllers/chat.controller.js';
import {
  sendFriendRequest,
  showAllPendingRequests,
} from '../../../controllers/friends.controller.js';

import '../../../schemas/associations.js';

const homeRouter = Router();

homeRouter.get('/welcome', jwtAuthMiddleware, welcomeController);
homeRouter.get('/users', jwtAuthMiddleware, fetchUsersController);
homeRouter.get('/requests', jwtAuthMiddleware, showAllPendingRequests);

homeRouter.post('/request', jwtAuthMiddleware, sendFriendRequest);
// homeRouter.patch('/request/:id', jwtAuthMiddleware, updateRequestStatus);

export { homeRouter };
