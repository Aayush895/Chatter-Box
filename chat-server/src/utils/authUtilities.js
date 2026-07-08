import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
export async function hashPassword(rawPasswordStr) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(rawPasswordStr, salt);
  } catch (error) {
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
}

export async function comparePassword(enteredPass, actualPass) {
  const isPassCorrect = await bcrypt.compare(enteredPass, actualPass);
  return isPassCorrect;
}
