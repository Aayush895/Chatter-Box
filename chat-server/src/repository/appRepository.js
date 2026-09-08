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

export async function fetchUserDetails(userName) {
  // Select * from Users where username = userName; --> Command to fetch the userName
  const userDetails = await User.findOne({
    where: {
      userName: {
        [Op.eq]: userName,
      },
    },
  });

  if (!userDetails) {
    const error = new Error('Something went wrong while searching for user details');
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  return userDetails;
}
