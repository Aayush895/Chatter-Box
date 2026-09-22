import jwt from 'jsonwebtoken';
import { JWT_ACC_SECRET } from '../config/serverConfig.js';

export function jwtAuthSocketMiddleware(socket, next) {
  const accessToken = socket.handshake.auth.accessToken || socket.handshake.query.accessToken;
  try {
    const decodedAccessToken = jwt.verify(accessToken, JWT_ACC_SECRET);
    socket.userInfo = decodedAccessToken;
    next();
  } catch (error) {
    next(new Error(`Unauthorized: ${error.message}`));
  }
}
