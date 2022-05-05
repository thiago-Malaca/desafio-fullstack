import { Injectable } from '@nestjs/common';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MinLength,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@ValidatorConstraint()
@Injectable()
export class ValidateUserId implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}
  public async validate(inputId) {
    const id = parseInt(inputId);
    if (id) {
      const company = await this.prisma.user.findUnique({ where: { id } });
      return !!company;
    }
    return true;
  }
}

export class DeleteParamUserDTO {
  @IsNumberString({}, { message: 'param id must be a number string' })
  @Validate(ValidateUserId, {
    message: 'entered param id does not correspond to any User',
  })
  id: string;
}

export class UpdateParamUserDTO {
  @IsNumberString({}, { message: 'param id must be a number string' })
  @Validate(ValidateUserId, {
    message: 'entered param id does not correspond to any User',
  })
  id: string;
}
export class CreateUserDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateUserDTO {}
