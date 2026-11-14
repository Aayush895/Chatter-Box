import fs from 'fs';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import cloudinary from '../config/cloudinaryConfig.js';
import { fetchUserssService } from '../services/app.service.js';
import { fetchChatService } from '../services/chat.service.js';
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

export async function getChatsController(req, res) {
  const { senderId, receiverId } = req.query;

  if (!senderId || !receiverId) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      ReasonPhrases.BAD_GATEWAY,
      'Please provide sender or receiver information!',
      ''
    );
  }

  try {
    const chats = await fetchChatService(senderId, receiverId);
    return res
      .status(StatusCodes.OK)
      .json(
        new AppResponse(
          StatusCodes.OK,
          ReasonPhrases.OK,
          'Chats were feched successfully',
          '',
          chats
        )
      );
  } catch (error) {
    const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    return res
      .status(status)
      .json(
        new AppError(
          status,
          'Something went wrong while fetching chats',
          'Cannot fetch chats, please try again after sometime',
          error.message
        )
      );
  }
}

export async function uploadFileController(req, res) {
  const { image, document } = req.files || {};
  const file = image?.[0] || document?.[0];
  try {
    if (!file) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          new AppError(
            StatusCodes.BAD_REQUEST,
            'No file was uploaded',
            'Please attach an image or a document and try again',
            'No file found in request'
          )
        );
    }

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: image ? 'image' : 'raw',
    });
    return res
      .status(StatusCodes.OK)
      .json(
        new AppResponse(
          StatusCodes.OK,
          ReasonPhrases.OK,
          'File was uploaded successfully',
          '',
          result
        )
      );
  } catch (error) {
    const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    return res
      .status(status)
      .json(
        new AppError(
          status,
          'Something went wrong while uploading the file',
          'Cannot upload the file, please try again after sometime',
          error.message
        )
      );
  } finally {
    if (file) {
      await fs.promises.unlink(file.path).catch(() => {});
    }
  }
}
