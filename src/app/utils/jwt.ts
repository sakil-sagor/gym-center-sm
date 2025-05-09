import jwt from 'jsonwebtoken';
import config from '../config';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expires_in,
  });
};
