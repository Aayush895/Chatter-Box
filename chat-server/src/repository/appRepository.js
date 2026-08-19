import { Op } from 'sequelize';
import { User } from '../schemas/Auth/AuthSchemas.js';
import { StatusCodes } from 'http-status-codes';

export async function fetchUsersRepository(searchQuery) {
  const searchResults = await User.findAll({
    attributes: ['userName', 'email'],
    where: {
      userName: {
        [Op.like]: `${searchQuery}%`,
      },
    },
  });

  if (!searchResults) {
    const error = new Error('Something went wrong while searching, please try again later!');
    error.statusCode = StatusCodes.BAD_REQUEST;
    throw error;
  }

  return searchResults;
}
