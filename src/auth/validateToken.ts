import { HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const validateToken = async (auth: string) => {
  if (auth.split(' ')[0] !== 'Bearer') {
    throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
  }
  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.LOGIN_PRIVATE_KEY);
    return decoded;
  } catch (err) {
    const message = 'Token error: ' + (err.message || err.name);
    throw new HttpException(message, HttpStatus.UNAUTHORIZED);
  }
};
