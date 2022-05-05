import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SpectacleController } from './spectacle.controller';
import { SpectacleService } from './spectacle.service';
import { ValidateSpectacleId } from './spectacle.validator';

@Module({
  imports: [PrismaModule],
  providers: [SpectacleService, ValidateSpectacleId],
  controllers: [SpectacleController],
  exports: [SpectacleService, ValidateSpectacleId],
})
export class SpectacleModule {}
