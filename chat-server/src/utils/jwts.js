import jwt from 'jsonwebtoken';

export function generateRefreshToken(payload, jwtSecret, options) {
  return jwt.sign(payload, jwtSecret, options);
}

export function generateAccessToken(decodedTokenLayload, accessTokenSecret, options) {
  return jwt.sign(decodedTokenLayload, accessTokenSecret, options);
}
