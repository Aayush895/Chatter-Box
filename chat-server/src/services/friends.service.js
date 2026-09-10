import { StatusCodes } from 'http-status-codes';
import { fetchUserDetails } from '../repository/appRepository.js';
import { sendFriendRequestRepository } from '../repository/friendsRepository.js';

export async function sendFriendRequestService(senderUserName, receiverUserName) {
  // Find if the senderUsername & receiverUsername exist in the Users table or not
  // If both of them exist in the users table then send the DB request to the friendship table to store the ids of the sender & receiver

  const fetchSenderDetails = await fetchUserDetails(senderUserName);
  const fetchReceiverDetails = await fetchUserDetails(receiverUserName);

  if (fetchSenderDetails.id == fetchReceiverDetails.id) {
    const error = new Error(`Invalid Request! Please try again`);
    error.status = StatusCodes.BAD_REQUEST;
    throw error;
  }

  // Send both userdetails to the the friendship table
  const friendRequestResponse = await sendFriendRequestRepository(
    fetchSenderDetails,
    fetchReceiverDetails
  );

  if (!friendRequestResponse) {
    const error = new Error(`Couldn't send friend request, please try again later`);
    error.status = StatusCodes.BAD_REQUEST;
    throw error;
  }

  const responseData = {
    id: friendRequestResponse.id,
    senderInformation: {
      senderId: friendRequestResponse.requesterId,
      senderUserName: fetchSenderDetails.userName,
      senderEmail: fetchSenderDetails.email,
    },
    receiverInformation: {
      receiverId: friendRequestResponse.receiverId,
      receiverUserName: fetchReceiverDetails.userName,
      receiverEmail: fetchReceiverDetails.email,
    },
  };

  return responseData;
}
