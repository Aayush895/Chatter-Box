import { Server } from 'socket.io';
import { jwtAuthSocketMiddleware } from '../middlewares/jwtAuthSocketMiddleware.js';
import { updateFriendRequestStatusService } from '../services/friends.service.js';
import { StatusCodes } from 'http-status-codes';

function intializeSocketServer(httpServer) {
  // Initializing a web socket server
  const io = new Server(httpServer, {
    cors: 'http://localhost:5173',
  });

  io.use(jwtAuthSocketMiddleware);

  io.on('connection', socket => {
    // 1. Write a socket middleware which will make use of the incoming accessToken from the client to verify the user first for establishing a connection
    // 2. After that use this socket connection to create a room
    // 3. For sending a friend request, handle the event and send the data of who sent the request to the recevier

    // Create the room using the userId
    const { userInfo } = socket;
    const userId = userInfo.userId;
    console.log('ROOM ID: ', userId);
    socket.join(`user:${userId}`);
    // TODO: Need to test it once integrated with client
    socket.on('friend-request:accept', async (data, acknowledge) => {
      const { senderId, receiverId } = data;
      let { friendshipStatus } = data;
      if (!senderId || !receiverId || !friendshipStatus) {
        const err = new Error(`Please provide relevant data`);
        err.statusCode = StatusCodes.BAD_REQUEST;
        err.code = 'VALIDATION_ERROR';
        throw err;
      }
      friendshipStatus = typeof friendshipStatus == 'string' && friendshipStatus.toLowerCase();
      try {
        const response = await updateFriendRequestStatusService({
          senderId,
          receiverId,
          friendshipStatus,
        });

        socket.emit('request-status', response);
        acknowledge({ success: true, data: response });
      } catch (error) {
        const isKnownError = Boolean(error.statusCode) && error.statusCode < 500;
        acknowledge({
          success: false,
          error: {
            code: error.code || 'INTERNAL_ERROR',
            message: isKnownError ? error.message : 'Something went wrong',
            statusCode: error.statusCode || 500,
          },
        });
      }
    });
  });

  return io;
}

export default intializeSocketServer;
