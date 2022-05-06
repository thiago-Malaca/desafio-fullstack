import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ValidateUserId } from './user.validator';
import { ConfigModule } from 'src/config/config.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ConfigModule, PrismaModule],
  providers: [UserService, ValidateUserId],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
