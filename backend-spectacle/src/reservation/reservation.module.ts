import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { ValidateReservationId } from './reservation.validator';

@Module({
  imports: [PrismaModule],
  controllers: [ReservationController],
  providers: [ReservationService, ValidateReservationId],
  exports: [ReservationService, ValidateReservationId],
})
export class ReservationModule {}
