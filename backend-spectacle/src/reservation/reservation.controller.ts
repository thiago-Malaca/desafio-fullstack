import { buildError, HttpError } from './../utils/error';
import { getQuery } from './../utils/query';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { Reservation } from '@prisma/client';
import { Request as ExpressRequest } from 'express';
import { ReservationService } from './reservation.service';
import {
  CreateReservationDTO,
  UpdateReservationDTO,
} from './reservation.validator';
import { UpdateInterceptor } from 'src/interceptors/update.interceptor';

@Controller('reservation')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Get()
  async findMany(@Request() req: ExpressRequest): Promise<Reservation[]> {
    try {
      const data = await this.reservationService.find(getQuery(req));
      return data;
    } catch (error) {
      return buildError(error);
    }
  }
  @Get('find-first')
  async findFirst(@Request() req: ExpressRequest): Promise<Reservation> {
    try {
      const query = getQuery(req);
      const data = await this.reservationService.findFirst({ ...query });
      if (!data) {
        throw new HttpError('reservation not found', 404);
      }
      return data;
    } catch (error) {
      return buildError(error);
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: ExpressRequest,
  ): Promise<Reservation> {
    try {
      const data = await this.reservationService.findOne({
        ...getQuery(req),
        where: { id },
      });
      if (!data) {
        throw new HttpError('reservation not found', 404);
      }
      return data;
    } catch (error) {
      return buildError(error);
    }
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const data = await this.reservationService.findOne({
      where: { id },
    });
    if (!data) {
      throw new HttpError('reservation not found', 404);
    }
    try {
      return await this.reservationService.delete({
        where: { id },
      });
    } catch (error) {
      return buildError(error);
    }
  }

  @Put(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  @UseInterceptors(UpdateInterceptor)
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReservationDTO,
  ) {
    try {
      const data = await this.reservationService.findOne({
        where: { id },
      });
      if (!data) {
        throw new HttpError('reservation not found', 404);
      }
      const updatedData = await this.reservationService.update({
        where: { id },
        data: dto,
      });
      return updatedData;
    } catch (error) {
      return buildError(error);
    }
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  @Post()
  async createOne(@Body() dto: CreateReservationDTO): Promise<Reservation> {
    try {
      const reservation = await this.reservationService.create(dto);
      return reservation;
    } catch (error) {
      return buildError(error);
    }
  }
}
