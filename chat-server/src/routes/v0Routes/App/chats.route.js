import { Router } from 'express';
import { jwtAuthMiddleware } from '../../../middlewares/jwtAuthMiddleware.js';
import { getChatsController } from '../../../controllers/chat.controller.js';

const chatRouter = Router();
// TODO: Need to test this route as well
chatRouter.get('/chats', jwtAuthMiddleware, getChatsController);

export { chatRouter };
