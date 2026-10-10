import { Server } from 'socket.io';
import { StatusCodes } from 'http-status-codes';
import { jwtAuthSocketMiddleware } from '../middlewares/jwtAuthSocketMiddleware.js';
import { updateFriendshipStatusController } from '../controllers/friends.controller.js';

function intializeSocketServer(httpServer) {
  // Initializing a web socket server
  const io = new Server(httpServer, {
    cors: 'http://localhost:5173',
  });

  io.use(jwtAuthSocketMiddleware);

  io.on('connection', socket => {
    // Create the room using the userId
    const { userInfo } = socket;
    const userId = userInfo.userId;

    // Create individual rooms for the individual users for receiving notifications when user is loggedin and socket is connected
    console.log('ROOM ID: ', userId);
    socket.join(`user:${userId}`);

    // TODO: Find a way to segregate these event listener logics
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
        const response = await updateFriendshipStatusController({
          senderId,
          receiverId,
          friendshipStatus,
        });

        io.to(`user:${senderId}`).to(`user:${receiverId}`).emit('request-status', response);
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
