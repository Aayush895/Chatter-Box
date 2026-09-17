import { StatusCodes } from 'http-status-codes';
import { fetchUserDetails } from '../repository/appRepository.js';
import {
  sendFriendRequestRepository,
  showAllpendingRequestsRepository,
} from '../repository/friendsRepository.js';

export async function sendFriendRequestService(senderUserName, receiverUserName) {
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

  return friendRequestResponse;
}

export async function showAllPendingRequestsService(userId) {
  const allPendingRequests = await showAllpendingRequestsRepository(userId);

  if (!allPendingRequests) {
    const error = new Error(`Could not fetch pending requests`);
    error.status = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }

  return allPendingRequests;
}
