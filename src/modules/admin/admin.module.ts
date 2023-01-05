import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/service/mail.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [MailModule],
  providers: [AdminService, PrismaService, MailService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
