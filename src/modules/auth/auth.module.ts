import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserStrategy } from './strategies/user.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { jwtConstants } from './constants';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [
    PassportModule,
    MailerModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '604800s' },
    }),
    PrismaModule,
  ],
  providers: [AuthService, JwtStrategy, UserStrategy],
  exports: [AuthService],
})
export class AuthModule {}
