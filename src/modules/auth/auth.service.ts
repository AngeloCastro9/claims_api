import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcryptjs';
import { admin } from '.prisma/client';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<admin> {
    const admin = await this.prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      throw new BadRequestException('Incorrect email or password.');
    }

    const compare = await bcrypt.compare(password, admin.password);

    if (!compare) {
      throw new BadRequestException('Incorrect email or passwords.');
    }

    if (admin.status === 'Block') {
      throw new BadRequestException('inactive user.');
    }

    return admin;
  }

  async login(user: any) {
    const payload = { id: user.id, sub: user.id };

    delete user.password;
    delete user.resetPassCode;

    return {
      user,
      message: 'Login successfully.',
      token: this.jwtService.sign(payload),
    };
  }
}
