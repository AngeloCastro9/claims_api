import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcryptjs';
import { admin } from '.prisma/client';
import { MailService } from '../mail/service/mail.service';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private mailService: MailService,
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

  async sendRecoverPassword(email: string): Promise<admin> {
    const admin = await this.prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      throw new BadRequestException('Admin not found.');
    }

    const token = randomBytes(32).toString('hex');

    await this.prisma.admin.update({
      where: { email },
      data: { resetPassCode: token },
    });

    await this.mailService.sendRecoverPassword(admin.email, admin.name, token);

    return admin;
  }

  async resetPassword(token: string, password: string): Promise<admin> {
    const admin = await this.prisma.admin.findUnique({
      where: { resetPassCode: token },
    });

    if (!admin) {
      throw new BadRequestException('Wrong token.');
    }

    await this.prisma.admin.update({
      where: {
        resetPassCode: token,
      },
      data: {
        password,
        resetPassCode: '',
      },
    });

    await this.mailService.sendRecoveredPassword(admin.email, admin.name);

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
