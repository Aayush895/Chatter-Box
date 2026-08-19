import { fetchUsersRepository } from '../repository/appRepository.js';
import { StatusCodes } from 'http-status-codes';

export async function fetchUserssService(searchQuery) {
  const searchResults = await fetchUsersRepository(searchQuery);
  if (!searchResults) {
    const error = new Error('Something went wrong when searching in DB, please try again later!');

    error.statusCode = StatusCodes.BAD_REQUEST;
    throw error;
  }

  return searchResults;
}
