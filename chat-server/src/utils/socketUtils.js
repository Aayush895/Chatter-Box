import { StatusCodes } from 'http-status-codes';

export function acknowledgementCallback(error) {
  const isKnownError = Boolean(error.statusCode) && error.statusCode < 500;
  return {
    success: false,
    error: {
      code: error.code || 'INTERNAL_ERROR',
      message: isKnownError ? error.message : 'Something went wrong',
      statusCode: error.statusCode || 500,
    },
  };
}

export function parseIncomingData(data) {
  const { senderId, receiverId } = data;
  let { friendshipStatus } = data;

  if (!senderId || !receiverId || !friendshipStatus) {
    const err = new Error(`Please provide relevant data`);
    err.statusCode = StatusCodes.BAD_REQUEST;
    err.code = 'VALIDATION_ERROR';
    throw err;
  }

  friendshipStatus = typeof friendshipStatus == 'string' && friendshipStatus.toLowerCase();
  return {
    senderId,
    receiverId,
    friendshipStatus,
  };
}
