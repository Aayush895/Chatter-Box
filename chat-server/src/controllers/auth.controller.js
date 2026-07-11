import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { AppError, AppResponse } from '../utils/Request_Response_Classes.js';
import { signupService, loginService } from '../services/auth.service.js';

export async function signupController(req, res) {
  const { userName, password, email } = req.body;
  if (!userName || !password || !email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(
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
    return res
      .status(StatusCodes.CREATED)
      .json(
        new AppResponse(
          StatusCodes.CREATED,
          ReasonPhrases.CREATED,
          'User was registered successfully!',
          '',
          signupServiceResponse
        )
      );
  } catch (error) {
    // Distinguish known errors (e.g. duplicate email) from unexpected ones
    const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    return res
      .status(status)
      .json(
        new AppError(
          status,
          error.reasonPhrase || ReasonPhrases.INTERNAL_SERVER_ERROR,
          'Something went wrong on signup',
          error.message
        )
      );
  }
}

export async function loginController(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          new AppError(
            StatusCodes.BAD_REQUEST,
            ReasonPhrases.BAD_REQUEST,
            'Credentials not provided, please provide the required credentials and try again!',
            'Incoming request missing either Email or Password or both'
          )
        );
    }

    const { databaseResponseData, accessToken, refreshToken } = await loginService(email, password);

    const options = {
      httpOnly: true,
      secure: true,
    };
    databaseResponseData.dataValues.accessToken = accessToken;
    return res
      .status(StatusCodes.OK)
      .cookie('refreshToken', refreshToken, options)
      .json(
        new AppResponse(
          StatusCodes.OK,
          ReasonPhrases.OK,
          'User was logged in successfully',
          '',
          databaseResponseData
        )
      );
  } catch (error) {
    const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    return res
      .status(status)
      .json(
        new AppError(
          status,
          error.reasonPhrase || ReasonPhrases.INTERNAL_SERVER_ERROR,
          'Something went wrong on login',
          error.message
        )
      );
  }
}
