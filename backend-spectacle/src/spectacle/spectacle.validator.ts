import { Injectable } from '@nestjs/common';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { PrismaService } from 'src/prisma/prisma.service';

@ValidatorConstraint()
@Injectable()
export class ValidateSpectacleId implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}
  public async validate(inputId) {
    const id = parseInt(inputId);
    if (id) {
      const company = await this.prisma.spectacle.findUnique({ where: { id } });
      return !!company;
    }
    return true;
  }
}

export class CreateSpectacleDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  reservationPrice: number;

  @IsInt()
  reservationLimit: number;
}

export class UpdateSpectacleDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  reservationPrice: number;

  @IsInt()
  @IsOptional()
  reservationLimit: number;
}
