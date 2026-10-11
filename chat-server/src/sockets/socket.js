import { Server } from 'socket.io';
import { jwtAuthSocketMiddleware } from '../middlewares/jwtAuthSocketMiddleware.js';
import { updateFriendshipStatusController } from '../controllers/friends.controller.js';
import { acknowledgementCallback, parseIncomingData } from '../utils/socketUtils.js';

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

    socket.on('friend-request:accept', async (data, acknowledge) => {
      try {
        const { senderId, receiverId, friendshipStatus } = parseIncomingData(data);
        const response = await updateFriendshipStatusController({
          senderId,
          receiverId,
          friendshipStatus,
        });

        io.to(`user:${senderId}`).to(`user:${receiverId}`).emit('request-status', response);
        acknowledge({ success: true, data: response });
      } catch (error) {
        acknowledge(acknowledgementCallback(error));
      }
    });
  });

  return io;
}

export default intializeSocketServer;
