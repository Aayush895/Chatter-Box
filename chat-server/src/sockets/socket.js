import { Server } from 'socket.io';
import { jwtAuthSocketMiddleware } from '../middlewares/jwtAuthSocketMiddleware.js';

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
  });

  return io;
}

export default intializeSocketServer;
