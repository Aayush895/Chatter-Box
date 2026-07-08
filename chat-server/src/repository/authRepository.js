import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { User } from '../schemas/Auth/AuthSchemas.js';
import { AppError } from '../utils/Request_Response_Classes.js';
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
  try {
    const findUser = await User.findOne({ where: { email: email } });
    if (comparePassword(password, findUser.password) == false) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        ReasonPhrases.UNAUTHORIZED,
        'Wrong password was entered. Please check the password and try again later!',
        'Wrong password was provided by the user'
      );
    }
    delete findUser.password;
    return findUser;
  } catch (error) {
    return new AppError(
      StatusCodes.BAD_REQUEST,
      ReasonPhrases.BAD_REQUEST,
      error.message,
      'Something went wrong on user creation in DB'
    );
  }
}
