import { StatusCodes } from 'http-status-codes';
import { fetchUserDetails } from '../repository/appRepository.js';
import { sendFriendRequestRepository } from '../repository/friendsRepository.js';

export async function sendFriendRequestService(senderUserName, receiverUserName) {
  // Find if the senderUsername & receiverUsername exist in the Users table or not
  // If both of them exist in the users table then send the DB request to the friendship table to store the ids of the sender & receiver

  const fetchSenderDetails = await fetchUserDetails(senderUserName);
  const fetchReceiverDetails = await fetchUserDetails(receiverUserName);

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

  return friendRequestResponse;
}
