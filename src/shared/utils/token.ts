import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class tokenService {
  constructor() {}

  async generateToken() {
    return randomBytes(32).toString('hex');
  }
}
