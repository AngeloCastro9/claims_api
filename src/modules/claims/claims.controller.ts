import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import CreateClaimsDto from './dto/createClaims.dto';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  async create(@Body() data: CreateClaimsDto) {
    return await this.claimsService.create(data);
  }

  @Get()
  async readAll(@Query() query: { take: string; skip: string }) {
    return await this.claimsService.readAll(
      Number(query.take),
      Number(query.skip),
    );
  }
}
