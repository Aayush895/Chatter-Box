import { StatusCodes } from 'http-status-codes';
import { Op } from 'sequelize';
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

export async function updateFriendshipStatusRepository({ senderId, receiverId, friendshipStatus }) {
  // UPDATE Friendships SET status = 'ACCEPTED' where requesterId = senderId AND receiverId = receiverId;
  // SELECT f.requesterId,f.receiverId,f.status,req.id AS requesterUserId,req.userName AS requesterUserName,rec.id  AS receiverUserId,rec.userName AS receiverUserName FROM Friendships AS f INNER JOIN Username AS req ON f.requesterId = req.id INNER JOIN Username AS rec ON f.receiverId  = rec.id WHERE f.requesterId = requesterId AND f.receiverId = receiverId;

  try {
    // First update based on the status
    await Friendship.update(
      {
        status: friendshipStatus,
      },
      {
        where: {
          requesterId: senderId,
          receiverId: receiverId,
          status: 'pending',
        },
      }
    );

    // Fetch the updated row, inner-joined with both users
    const updatedFriendship = await Friendship.findOne({
      where: {
        requesterId: senderId,
        receiverId: receiverId,
      },
      attributes: ['requesterId', 'receiverId', 'status'],
      include: [
        {
          model: User,
          as: 'requester',
          attributes: ['id', 'userName'],
          required: true, // INNER JOIN
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'userName'],
          required: true, // INNER JOIN
        },
      ],
    });

    return updatedFriendship;
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

export async function fetchUserFriendsRepository(userId) {
  try {
    const friendships = await Friendship.findAll({
      where: {
        status: 'accepted',
        [Op.or]: [{ requesterId: userId }, { receiverId: userId }],
      },
      include: [
        { model: User, as: 'requester', attributes: ['id', 'userName'] },
        { model: User, as: 'receiver', attributes: ['id', 'userName'] },
      ],
    });

    // Each row has both users; keep whichever one is not the current user
    return friendships.map(f => (f.requesterId === Number(userId) ? f.receiver : f.requester));
  } catch (error) {
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
}
