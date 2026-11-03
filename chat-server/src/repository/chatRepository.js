import { Op } from 'sequelize';
import { Message } from '../schemas/MessageSchema.js';
import { StatusCodes } from 'http-status-codes';

export async function fetchChatRepository(senderId, receiverId) {
  // select * from Messages where senderId = senderId and receiverId = receiverId
  const chatsList = await Message.findAll({
    attributes: [
      'senderId',
      'receiverId',
      'messageType',
      'content',
      'attachmentUrl',
      'attachmentName',
    ],
    where: {
      senderId: {
        [Op.eq]: senderId,
      },
      receiverId: {
        [Op.eq]: receiverId,
      },
    },
  });

  if (!chatsList) {
    const error = new Error('Something went wrong while fetching the chat details');
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  return chatsList;
}
