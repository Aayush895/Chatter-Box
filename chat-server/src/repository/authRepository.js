import { StatusCodes } from 'http-status-codes';
import { User } from '../schemas/Auth/AuthSchemas.js';
import { comparePassword, hashPassword } from '../utils/authUtilities.js';

export async function registerUser(userName, email, password) {
  try {
    const hashedPassword = await hashPassword(password);
    await User.sync();
    const createUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      isUserActive: false,
    });
    delete createUser.dataValues.password; // actually removes it from the serialized JSON
    return createUser;
  } catch (error) {
    // Handle known Sequelize cases distinctly (e.g. duplicate user/email)
    if (error.name === 'SequelizeUniqueConstraintError') {
      const err = new Error('A user with that username or email already exists');
      err.statusCode = StatusCodes.CONFLICT;
      throw err;
    }
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
}

export async function loginUser(email, password) {
  const findUser = await User.findOne({ where: { email: email } });
  if (!findUser) {
    const err = new Error('No account found for this email');
    err.statusCode = StatusCodes.UNAUTHORIZED; // deliberately not NOT_FOUND — see note below
    throw err;
  }

  if (comparePassword(password, findUser.password) == false) {
    const err = new Error(
      'Wrong password was entered. Please check the password and try again later!'
    );
    err.statusCode = StatusCodes.UNAUTHORIZED;
    throw err;
  }
  delete findUser.dataValues.password;
  return findUser;
}
