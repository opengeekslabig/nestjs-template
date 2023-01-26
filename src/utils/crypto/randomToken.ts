import * as crypto from 'crypto';

export const randomToken = (number) =>
  crypto.randomBytes(number).toString('hex');
