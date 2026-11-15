import jwt from 'jsonwebtoken';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { AppError } from '../utils/Request_Response_Classes.js';
import {
  JWT_ACC_SECRET,
  JWT_OPTIONS_FOR_ACCESS_TOKEN,
  JWT_SECRET,
} from '../config/serverConfig.js';
import { generateAccessToken } from '../utils/jwts.js';

export async function jwtAuthMiddleware(req, res, next) {
  // req.headers['Authorization']; --> Use this when checking the api on postman
  const authHeader = req.headers.authorization;
  const accessToken = authHeader?.replace('Bearer ', '');
  const refreshToken = req.cookies.refreshToken;

  if (accessToken) {
    try {
      const decodeAccessToken = jwt.verify(accessToken, JWT_ACC_SECRET);
      req.accessToken = accessToken;
      req.userInfo = decodeAccessToken;

      return next();
    } catch (error) {
      console.log(`Access token rejected: ${error.name}`);
    }
  }

  if (!refreshToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        new AppError(
          StatusCodes.UNAUTHORIZED,
          'Refresh token is not provided',
          'Refresh token is missing',
          ReasonPhrases.UNAUTHORIZED
        )
      );
  }

  let decodeRefreshToken = null;
  try {
    decodeRefreshToken = jwt.verify(refreshToken, JWT_SECRET);
  } catch (error) {
    const errorName = error.name;
    const errorMessage = error.message;
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        new AppError(
          StatusCodes.UNAUTHORIZED,
          'Access token & Refresh token are invalid',
          'Access invalid. Please login to visit the page!',
          `${errorName}: ${errorMessage}`
        )
      );
  }

  // Copy identity fields only. The decoded refresh payload also carries iat/exp,
  // and signing with those plus `expiresIn` is what makes jsonwebtoken throw.
  const { userId, userName, email } = decodeRefreshToken;
  const identity = { userId, userName, email };

  const newAccessToken = generateAccessToken(
    identity,
    JWT_ACC_SECRET,
    JWT_OPTIONS_FOR_ACCESS_TOKEN
  );

  res.setHeader('x-access-token', newAccessToken);
  req.accessToken = newAccessToken;
  req.userInfo = identity;
  next();
}
