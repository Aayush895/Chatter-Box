import { Server } from 'socket.io';
import { jwtAuthSocketMiddleware } from '../middlewares/jwtAuthSocketMiddleware.js';
import {
  updateFriendshipStatusController,
  storeChatInformationController,
} from '../controllers/friends.controller.js';
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

    // TODO: Need to test this feature on the UI
    // On send-message event emit, receive-message event.
    socket.on('send-message', async (data, acknowledge) => {
      try {
        const { senderId, receiverId, messageContent, messageType, attachmentURL, attachmentName } =
          data;

        const response = await storeChatInformationController(
          senderId,
          receiverId,
          messageContent,
          messageType,
          attachmentURL,
          attachmentName
        );

        const dataObj = {
          senderInformation: {
            senderId: response.senderId,
            senderName: response.senderName,
          },
          receverInformation: {
            receiverId: response.receiverId,
            receiverName: response.receiverName,
          },
          messageType,
          messageContent,
        };
        io.to(`user:${receiverId}`).emit('receive-message', dataObj);
        acknowledge({
          success: true,
          data: messageContent,
          message: 'message received by the sender',
        });
      } catch (error) {
        acknowledge(acknowledgementCallback(error));
      }
    });
  });

  return io;
}

export default intializeSocketServer;
