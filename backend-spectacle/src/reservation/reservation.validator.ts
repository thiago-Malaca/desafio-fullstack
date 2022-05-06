import { Injectable } from '@nestjs/common';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { PrismaService } from 'src/prisma/prisma.service';
import { ValidateSpectacleId } from 'src/spectacle/spectacle.validator';

@ValidatorConstraint()
@Injectable()
export class ValidateReservationId implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}
  public async validate(inputId) {
    const id = parseInt(inputId);
    if (id) {
      const Reservation = await this.prisma.reservation.findUnique({
        where: { id },
      });
      return !!Reservation;
    }
    return true;
  }
}

export class CreateReservationDTO {
  @IsString()
  @IsNotEmpty()
  personName: string;

  @IsString()
  @IsNotEmpty()
  personCPF: string;

  @IsNumber()
  @Validate(ValidateSpectacleId, {
    message: 'entered spectacleId does not correspond to any Spectacle',
  })
  spectacleId: number;
}

export class UpdateReservationDTO {}
