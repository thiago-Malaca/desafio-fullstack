import { Prisma, Spectacle } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export type UpsertSpectacle = {
  where: Prisma.SpectacleWhereUniqueInput;
  create: Prisma.SpectacleCreateInput;
  update?: Prisma.SpectacleUpdateInput;
};

@Injectable()
export class SpectacleService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    args: Prisma.SpectacleFindUniqueArgs,
  ): Promise<Spectacle | null> {
    return await this.prisma.spectacle.findUnique(args);
  }

  async findFirst(
    args: Prisma.SpectacleFindFirstArgs,
  ): Promise<Spectacle | null> {
    return await this.prisma.spectacle.findFirst(args);
  }

  async find(args: Prisma.SpectacleFindManyArgs): Promise<Spectacle[]> {
    return await this.prisma.spectacle.findMany(args);
  }

  async create(data: Prisma.SpectacleCreateInput): Promise<Spectacle> {
    return await this.prisma.spectacle.create({
      data,
    });
  }

  async update(args: Prisma.SpectacleUpdateArgs): Promise<Spectacle> {
    return await this.prisma.spectacle.update(args);
  }

  async delete(args: Prisma.SpectacleDeleteArgs): Promise<Spectacle> {
    return await this.prisma.spectacle.delete(args);
  }
  async upsert({ create, update, where }: UpsertSpectacle): Promise<Spectacle> {
    let spectacle = await this.prisma.spectacle.findUnique({ where });
    if (spectacle) {
      if (update) await this.prisma.spectacle.update({ where, data: update });
    } else {
      spectacle = await this.prisma.spectacle.create({ data: create });
    }
    return spectacle;
  }
}
