import jwt from 'jsonwebtoken';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { AppError } from '../utils/Request_Response_Classes.js';
import { JWT_ACC_SECRET, JWT_SECRET, JWT_OPTIONS } from '../config/serverConfig.js';
import { generateAccessToken } from '../utils/jwts.js';

export async function jwtAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader.replace('Bearer ', '');

  if (!accessToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        new AppError(
          StatusCodes.UNAUTHORIZED,
          'Access token is not provided',
          'Access token is missing, please provide a valid token to login',
          ReasonPhrases.UNAUTHORIZED
        )
      );
  }

  const refreshToken = req.cookies.refreshToken;

  const decodeAccessToken = jwt.verify(accessToken, JWT_ACC_SECRET);
  const decodeRefreshToken = jwt.verify(refreshToken, JWT_SECRET);

  if (!decodeAccessToken && decodeRefreshToken) {
    const newAccessToken = generateAccessToken(decodeRefreshToken, JWT_ACC_SECRET, JWT_OPTIONS);
    req.accessToken = newAccessToken;
    req.userInfo = decodeRefreshToken;
    next();
  } else {
    req.accessToken = accessToken;
    req.userInfo = decodeAccessToken;
    next();
  }

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
