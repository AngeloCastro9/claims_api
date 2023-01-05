import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../../database/prisma.service';
import { UserStrategy } from './strategies/user.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from '../mail/service/mail.service';
import { jwtConstants } from './constants';

@Module({
  imports: [
    PassportModule,
    MailerModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '604800s' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    PrismaService,
    UserStrategy,
    MailService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
