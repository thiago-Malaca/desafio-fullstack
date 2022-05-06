import { ConfigService } from './../config/config.service';
import { Prisma, User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './user.validator';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

export type UpsertUser = {
  where: Prisma.UserWhereUniqueInput;
  create: Prisma.UserCreateInput;
  update?: Prisma.UserUpdateInput;
};

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async findOne(args: Prisma.UserFindUniqueArgs): Promise<User | null> {
    return await this.prisma.user.findUnique(args);
  }

  async findFirst(args: Prisma.UserFindFirstArgs): Promise<User | null> {
    return await this.prisma.user.findFirst(args);
  }

  async find(args: Prisma.UserFindManyArgs): Promise<User[]> {
    return await this.prisma.user.findMany(args);
  }

  async create(data: CreateUserDTO): Promise<User> {
    const password = await bcrypt.hash(
      data.password,
      this.configService.passwordSaltRounds,
    );
    return await this.prisma.user.create({
      data: { ...data, password },
    });
  }

  async update(args: Prisma.UserUpdateArgs): Promise<User> {
    return await this.prisma.user.update(args);
  }

  async delete(args: Prisma.UserDeleteArgs): Promise<User> {
    return await this.prisma.user.delete(args);
  }
  async upsert({ create, update, where }: UpsertUser): Promise<User> {
    let user = await this.prisma.user.findUnique({ where });
    if (user) {
      if (update) await this.prisma.user.update({ where, data: update });
    } else {
      user = await this.prisma.user.create({ data: create });
    }
    return user;
  }
}
