import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { admin, Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { MailService } from '../mail/service/mail.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  async create(data: Prisma.adminCreateInput): Promise<admin> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        email: data.email,
      },
    });

    if (admin) {
      throw new BadRequestException('User already exists');
    }

    const adminCreated = await this.prisma.admin.create({ data });

    await this.mail.sendWelcome(data.email, data.name);

    delete adminCreated.password;

    return adminCreated;
  }

  async readOne(id: number): Promise<admin> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        id,
      },
    });

    if (!admin) {
      throw new BadRequestException('User already exists');
    }

    delete admin.password;
    delete admin.resetPassCode;

    return admin;
  }

  async update(data: Prisma.adminUpdateInput, id: number): Promise<admin> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        id,
      },
    });

    if (!admin) {
      throw new BadRequestException('User not found');
    }

    const adminUpdated = await this.prisma.admin.update({
      where: {
        id,
      },
      data,
    });

    delete adminUpdated.password;

    return adminUpdated;
  }

  async disable(id: number): Promise<admin> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        id,
      },
    });

    if (!admin) {
      throw new BadRequestException('User not found');
    }

    const adminDisabled = await this.prisma.admin.update({
      where: {
        id,
      },
      data: {
        status: 'Block',
      },
    });

    delete adminDisabled.password;

    return adminDisabled;
  }

  async enable(id: number): Promise<admin> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        id,
      },
    });

    if (!admin) {
      throw new BadRequestException('Admin not found');
    }

    if (admin.status === 'Activate') {
      throw new NotAcceptableException('Admin already activate');
    }

    const adminDisabled = await this.prisma.admin.update({
      where: {
        id,
      },
      data: {
        status: 'Activate',
      },
    });

    delete adminDisabled.password;

    return adminDisabled;
  }
}
