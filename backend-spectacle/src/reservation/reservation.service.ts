import { Prisma, Reservation } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReservationDTO } from './reservation.validator';

export type UpsertReservation = {
  where: Prisma.ReservationWhereUniqueInput;
  create: Prisma.ReservationCreateInput;
  update?: Prisma.ReservationUpdateInput;
};

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    args: Prisma.ReservationFindUniqueArgs,
  ): Promise<Reservation | null> {
    return await this.prisma.reservation.findUnique(args);
  }

  async findFirst(
    args: Prisma.ReservationFindFirstArgs,
  ): Promise<Reservation | null> {
    return await this.prisma.reservation.findFirst(args);
  }

  async find(args: Prisma.ReservationFindManyArgs): Promise<Reservation[]> {
    return await this.prisma.reservation.findMany(args);
  }

  async create({
    spectacleId,
    personCPF,
    personName,
  }: CreateReservationDTO): Promise<Reservation> {
    return await this.prisma.reservation.create({
      data: {
        personCPF,
        personName,
        spectacle: { connect: { id: spectacleId } },
      },
    });
  }

  async update(args: Prisma.ReservationUpdateArgs): Promise<Reservation> {
    return await this.prisma.reservation.update(args);
  }

  async delete(args: Prisma.ReservationDeleteArgs): Promise<Reservation> {
    return await this.prisma.reservation.delete(args);
  }
  async upsert({
    create,
    update,
    where,
  }: UpsertReservation): Promise<Reservation> {
    let reservation = await this.prisma.reservation.findUnique({ where });
    if (reservation) {
      if (update) await this.prisma.reservation.update({ where, data: update });
    } else {
      reservation = await this.prisma.reservation.create({ data: create });
    }
    return reservation;
  }
}
