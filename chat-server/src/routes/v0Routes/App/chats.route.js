import { Router } from 'express';
import { jwtAuthMiddleware } from '../../../middlewares/jwtAuthMiddleware';
import { getChatsController } from '../../../controllers/chat.controller';

const chatRouter = Router();
// TODO: Need to test this route as well
chatRouter.get('/chats', jwtAuthMiddleware, getChatsController);
