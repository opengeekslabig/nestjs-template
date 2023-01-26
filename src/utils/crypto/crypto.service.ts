import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class CryptoService {
  hashPassword(password): Promise<string> {
    return argon2.hash(password);
  }

  verifyPassword(passwordHash, plain): Promise<boolean> {
    return argon2.verify(passwordHash, plain);
  }
}
