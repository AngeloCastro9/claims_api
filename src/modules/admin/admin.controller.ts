import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminService } from './admin.service';
import CreateAdminDto from './dto/createAdmin.dto';
import UpdateAdminDto from './dto/updateAdmin.dto';
import { ParseCreateAdminPipe } from './pipes/parseCreateAdmin.pipe';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post()
  async create(@Body(new ParseCreateAdminPipe()) data: CreateAdminDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Admin created!',
      data: await this.adminService.create(data),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async readOne(@Param('id') id: number) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Admin returned!',
      data: await this.adminService.readOne(id),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Body(new ParseCreateAdminPipe()) data: UpdateAdminDto,
    @Param('id') id: number,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Admin updated!',
      data: await this.adminService.update(data, id),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('/disable/:id')
  async disable(@Param('id') id: number) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Admin disabled!',
      data: await this.adminService.disable(id),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('/enable/:id')
  async enable(@Param('id') id: number) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Admin enabled!',
      data: await this.adminService.enable(id),
    };
  }
}
