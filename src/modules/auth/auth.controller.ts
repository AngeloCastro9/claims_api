import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Body,
  Param,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserAuthGuard } from './guards/userAuth.guard';
import { RecoverDto } from './dto/recover.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { ParseResetPasswordPipe } from './pipes/parseResetPassword.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  async loginUser(@Request() req: any) {
    return await this.authService.login(req.body);
  }
}
