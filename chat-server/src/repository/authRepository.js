import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { User } from '../schemas/Auth/AuthSchemas.js';
import { AppError } from '../utils/Request_Response_Classes.js';
import { hashPassword } from '../utils/hashPassword.js';

export async function registerUser(userName, email, password) {
  try {
    const hashedPassword = await hashPassword(password);
    // Synchronise the table
    await User.sync();
    const createUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      isUserActive: false,
    });
    return createUser;
  } catch (error) {
    return new AppError(
      StatusCodes.BAD_REQUEST,
      ReasonPhrases.BAD_REQUEST,
      error.message,
      'Something went wrong on user creation in DB'
    );
  }
}
