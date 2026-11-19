import jwt from 'jsonwebtoken';

export function generateRefreshToken(payload, jwtSecret, options) {
  return jwt.sign(payload, jwtSecret, options);
}

export function generateAccessToken(decodedTokenPayload, accessTokenSecret, options) {
  return jwt.sign(decodedTokenPayload, accessTokenSecret, options);
}
