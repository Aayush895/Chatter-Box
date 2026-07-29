import jwt from 'jsonwebtoken';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { AppError } from '../utils/Request_Response_Classes.js';
import { JWT_ACC_SECRET, JWT_SECRET } from '../config/serverConfig.js';
import { generateAccessToken } from '../utils/jwts.js';

export async function jwtAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader?.replace('Bearer ', '');

  const refreshToken = req.cookies.refreshToken;

  let decodeAccessToken = null;
  if (accessToken) {
    decodeAccessToken = jwt.verify(accessToken, JWT_ACC_SECRET);
  }

  const decodeRefreshToken = jwt.verify(refreshToken, JWT_SECRET);

  // If botht the access token and refresh token are missing / expired
  if (!decodeAccessToken && !decodeRefreshToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        new AppError(
          StatusCodes.UNAUTHORIZED,
          'Access token & Refresh token are invalid',
          'Access invalid. Please login to visit the page!',
          ReasonPhrases.UNAUTHORIZED
        )
      );
  }

  if (!decodeAccessToken && decodeRefreshToken) {
    const newAccessToken = generateAccessToken(decodeRefreshToken, JWT_ACC_SECRET);
    req.accessToken = newAccessToken;
    req.userInfo = decodeRefreshToken;
  } else {
    req.accessToken = accessToken;
    req.userInfo = decodeAccessToken;
  }

  next();
}
