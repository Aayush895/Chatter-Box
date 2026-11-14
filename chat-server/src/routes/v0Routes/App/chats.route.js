import { Router } from 'express';
import { jwtAuthMiddleware } from '../../../middlewares/jwtAuthMiddleware.js';
import { fileUploadMiddleWare } from '../../../middlewares/fileuploadMiddleware.js';
import { getChatsController, uploadFileController } from '../../../controllers/chat.controller.js';

const chatRouter = Router();

chatRouter.get('/chats', jwtAuthMiddleware, getChatsController);

chatRouter.post(
  '/upload',
  jwtAuthMiddleware,
  fileUploadMiddleWare().fields([
    {
      name: 'image',
      maxCount: 1,
    },
    {
      name: 'document',
      maxCount: 1,
    },
  ]),
  uploadFileController
);

export { chatRouter };
