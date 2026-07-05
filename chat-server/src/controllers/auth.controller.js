import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { AppError, AppResponse } from '../utils/Request_Response_Classes.js';
import { signupService } from '../services/auth.service.js';

export async function signupController(req, res) {
  const { userName, password, email } = req.body;
  if (!userName || !password || !email) {
    return res.json(
      new AppError(
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST,
        'Missing username, password or email. Please check once then try again later!',
        'Incoming request from the client is missing username, password or email'
      )
    );
  }

  try {
    const signupServiceResponse = await signupService(userName, email, password);
    return res.json(
      new AppResponse(
        StatusCodes.CREATED,
        ReasonPhrases.CREATED,
        'User was registered successfully!',
        '',
        signupServiceResponse
      )
    );
  } catch (error) {
    return res.json(
      new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        'Something went wrong on signup',
        error.message
      )
    );
  }
}
