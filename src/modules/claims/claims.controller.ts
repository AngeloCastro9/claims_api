import { Body, Controller, Post } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import CreateClaimsDto from './dto/createClaims.dto';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  async create(@Body() data: CreateClaimsDto) {
    return await this.claimsService.create(data);
  }
}
