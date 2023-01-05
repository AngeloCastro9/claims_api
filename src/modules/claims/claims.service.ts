import { Injectable } from '@nestjs/common';
import { claims } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import CreateClaimsDto from './dto/createClaims.dto';

@Injectable()
export class ClaimsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateClaimsDto): Promise<claims> {
    const claim = await this.prisma.claims.create({ data });
    return claim;
  }

  async readOne(id: number): Promise<claims> {
    try {
      const claim = await this.prisma.claims.findUniqueOrThrow({
        where: {
          id,
        },
      });

      return claim;
    } catch (error) {
      return error;
    }
  }

  async readAll(take: number, skip: number): Promise<claims[]> {
    try {
      return this.prisma.claims.findMany({
        take,
        skip,
      });
    } catch (error) {
      return error;
    }
  }
}
