import { StatusCodes } from 'http-status-codes';
import { registerUser, loginUser } from '../repository/authRepository.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwts.js';
import { JWT_OPTIONS, JWT_SECRET, JWT_ACC_SECRET } from '../config/serverConfig.js';

export async function signupService(userName, email, password) {
  if (!userName || !password || !email) {
    const err = new Error(
      'Incoming request from the client is missing username, password or email'
    );
    err.statusCode = StatusCodes.BAD_REQUEST;
    throw err;
  }

  return registerUser(userName, email, password);
}

export async function loginService(email, password) {
  if (!email || !password) {
    const err = new Error(
      'Incoming request from client is missing either email or password or both'
    );
    err.statusCode = StatusCodes.BAD_REQUEST;
    throw err;
  }

  const databaseResponseData = await loginUser(email, password);
  const refreshToken = generateRefreshToken(
    {
      userName: databaseResponseData.userName,
      email: databaseResponseData.email,
    },
    JWT_SECRET,
    JWT_OPTIONS
  );

  const accessToken = generateAccessToken(
    {
      userName: databaseResponseData.userName,
      email: databaseResponseData.email,
    },
    JWT_ACC_SECRET,
    {
      expiresIn: '1h',
    }
  );

  return {
    databaseResponseData,
    accessToken,
    refreshToken,
  };
}
