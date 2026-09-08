import { StatusCodes } from 'http-status-codes';
import { Friendship } from '../schemas/FriendshipSchema.js';

export async function sendFriendRequestRepository(senderDetails, receiverDetails) {
  try {
    const sendRequestResponse = await Friendship.create({
      requesterId: senderDetails.id,
      receiverId: receiverDetails.id,
    });

    return sendRequestResponse;
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const err = new Error('A friend request between these users already exists');
      err.statusCode = StatusCodes.CONFLICT;
      throw err;
    }

    if (error.name === 'SequelizeForeignKeyConstraintError') {
      const err = new Error('One or both users do not exist');
      err.statusCode = StatusCodes.BAD_REQUEST;
      throw err;
    }

    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
}
