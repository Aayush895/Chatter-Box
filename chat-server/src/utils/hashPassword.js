import bcrypt from 'bcryptjs';
import { AppError } from './Request_Response_Classes.js';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export async function hashPassword(rawPasswordStr) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPasswordStr, salt);

    return hashedPassword;
  } catch (error) {
    return new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      ReasonPhrases.INTERNAL_SERVER_ERROR,
      'Something went wrong while hashing the pass',
      error.message
    );
  }
}

export async function comparePassword() {}
