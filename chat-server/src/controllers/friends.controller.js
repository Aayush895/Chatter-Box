import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { AppError, AppResponse } from '../utils/Request_Response_Classes.js';
import { sendFriendRequestService } from '../services/friends.service.js';

// Protected route
export async function sendFriendRequest(req, res) {
  const { senderUserName, receiverUserName } = req.body;

  if (!senderUserName || !receiverUserName) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      ReasonPhrases.BAD_REQUEST,
      'Sender or Receiver user name is missing!',
      ''
    );
  }

  // Send the username and receiver name to the service layer
  try {
    const requestServiceResponse = await sendFriendRequestService(senderUserName, receiverUserName);

    return res
      .status(StatusCodes.OK)
      .json(
        new AppResponse(
          StatusCodes.OK,
          ReasonPhrases.OK,
          'Friend request sent successfully!',
          '',
          requestServiceResponse
        )
      );
  } catch (error) {
    const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    return res
      .status(status)
      .json(
        new AppError(
          status,
          'Something went wrong while sending the request to the users',
          `Cannot send friend request, please try again after sometime`,
          error.message
        )
      );
  }
}
