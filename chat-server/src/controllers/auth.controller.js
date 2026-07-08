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
  // Login / auth procedure:
  // 2. Create a middleware for JWT tokens.
  // 3. We receive the access token from the UI side
  // 4. If the access token is either undefined or expired, we check for the refresh token
  // 5. If the refresh token is also not undefined or expired, we generate a fresh refresh token and from that refresh token, we generate a fresh access token that is sent back to the UI.
  // 6. If the refresh token is present and not expired, we use it to generate a fresh access token and send it back to the UI.
  // 7. The refresh token is stored in an `HTTP-Only` Cookie and the access-token is sent back to the UI by first sending the user data along with the access token to the service layer.
  // 8. Service layer checks in the db if the user is present or not.
  // 9. If the user is present, then send the login details as response and if not present, urge the user to signup first through response.
  if (!email || !password) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      ReasonPhrases.BAD_REQUEST,
      'Credentials not provided, please provide the required credentials and try again!',
      'Incoming request missing either Email or Password or both'
    );
  }

  const loginServiceResponse = await loginService(email, password);
  return res.json(
    new AppResponse(
      StatusCodes.OK,
      ReasonPhrases.OK,
      'User was logged in successfully',
      '',
      loginServiceResponse
    )
  );
}
