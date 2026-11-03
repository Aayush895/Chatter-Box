import { fetchChatRepository } from '../repository/chatRepository.js';
import { StatusCodes } from 'http-status-codes';

export async function fetchChatService(senderId, receiverId) {
  const chatRepositoryResponse = await fetchChatRepository(senderId, receiverId);
  if (!chatRepositoryResponse) {
    const error = new Error('Something went wrong while fetching chats from the DB');
    error.statusCode = StatusCodes.BAD_REQUEST;

    throw error;
  }

  return chatRepositoryResponse;
}
