import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { fetchUserssService } from '../services/app.service.js';
import { AppError, AppResponse } from '../utils/Request_Response_Classes.js';

export async function welcomeController(req, res) {
  const accessToken = req.accessToken;
  const userInfo = req.userInfo;

  if (!accessToken || !userInfo) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        new AppError(
          StatusCodes.UNAUTHORIZED,
          ReasonPhrases.UNAUTHORIZED,
          'Unable to fetch user session details!',
          'accessToken or userInfo missing on request — auth middleware may not have run or session is invalid'
        )
      );
  }

  try {
    return res
      .status(StatusCodes.OK)
      .json(
        new AppResponse(
          StatusCodes.OK,
          ReasonPhrases.OK,
          'User credentials fetched successfully!',
          '',
          { userInfo, accessToken }
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
          'Something went wrong while fetching user credentials!',
          error.message
        )
      );
  }
}

export async function fetchUsersController(req, res) {
  const searchQuery = req.query.user;

  if (!searchQuery) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        new AppError(
          StatusCodes.BAD_REQUEST,
          ReasonPhrases.BAD_REQUEST,
          'Please provide some value in order to search something!',
          'Incoming request missing search query!'
        )
      );
  }

  try {
    const searchResults = await fetchUserssService(searchQuery);

    return res
      .status(StatusCodes.OK)
      .json(
        new AppResponse(
          StatusCodes.OK,
          ReasonPhrases.OK,
          'Users were found successfully!',
          '',
          searchResults
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
          'Something went wrong while searching the Users',
          error.message
        )
      );
  }
}
