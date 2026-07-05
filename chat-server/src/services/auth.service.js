import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { AppResponse, AppError } from '../utils/Request_Response_Classes.js';
import { registerUser } from '../repository/authRepository.js';

export async function signupService(userName, email, password) {
  if (!userName || !password || !email) {
    return new AppResponse(
      StatusCodes.BAD_REQUEST,
      ReasonPhrases.BAD_REQUEST,
      'Did not receive username, password or email from client.',
      'Incoming request from the client is missing username, password or email'
    );
  }

  try {
    const databaseResponseData = await registerUser(userName, email, password);
    return databaseResponseData;
  } catch (error) {
    return new AppError(
      StatusCodes.BAD_REQUEST,
      ReasonPhrases.BAD_REQUEST,
      error.message,
      'Something went wrong on user creation in DB'
    );
  }
}
