import { Controller, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async loginUser(@Request() req: any) {
    return await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );
  }
}
