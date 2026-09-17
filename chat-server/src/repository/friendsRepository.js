import { StatusCodes } from 'http-status-codes';
import { Friendship } from '../schemas/FriendshipSchema.js';
import { User } from '../schemas/Auth/AuthSchemas.js';

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

export async function showAllpendingRequestsRepository(userId) {
  try {
    const showPendingRequestsResponse = await Friendship.findAll({
      where: {
        receiverId: userId,
        status: 'pending',
      },
      attributes: ['id', 'requesterId', 'receiverId', 'status'],
      include: [
        {
          model: User,
          as: 'requester',
          attributes: ['id', 'userName'],
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'userName'],
        },
      ],
    });

    return showPendingRequestsResponse;
  } catch (error) {
    if (error.name === 'SequelizeConnectionError') {
      const err = new Error('Unable to connect to the database');
      err.statusCode = StatusCodes.SERVICE_UNAVAILABLE;
      throw err;
    }

    if (error.name === 'SequelizeDatabaseError') {
      const err = new Error('Unable to fetch pending friend requests');
      err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      throw err;
    }

    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
}
