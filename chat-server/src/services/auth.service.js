import { StatusCodes } from 'http-status-codes';
import { registerUser, loginUser } from '../repository/authRepository.js';

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
  const databaseResponseData = await loginUser(email, password);
  return databaseResponseData;
}
