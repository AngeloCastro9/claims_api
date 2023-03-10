import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from '../admin/admin.controller';
import { PrismaService } from '../../database/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from '../auth/auth.controller';
import { ClaimsModule } from '../claims/claims.module';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    ClaimsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AdminController, AuthController],
  providers: [PrismaService],
})
export class AppModule {}
