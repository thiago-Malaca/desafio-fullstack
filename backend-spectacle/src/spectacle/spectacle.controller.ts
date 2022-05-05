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
import { Spectacle } from '@prisma/client';
import { Request as ExpressRequest } from 'express';
import { SpectacleService } from './spectacle.service';
import { CreateSpectacleDTO, UpdateSpectacleDTO } from './spectacle.validator';
import { UpdateInterceptor } from 'src/interceptors/update.interceptor';

@Controller('spectacle')
export class SpectacleController {
  constructor(private spectacleService: SpectacleService) {}

  @Get()
  async findMany(@Request() req: ExpressRequest): Promise<Spectacle[]> {
    try {
      const data = await this.spectacleService.find(getQuery(req));
      return data;
    } catch (error) {
      return buildError(error);
    }
  }
  @Get('find-first')
  async findFirst(@Request() req: ExpressRequest): Promise<Spectacle> {
    try {
      const query = getQuery(req);
      const data = await this.spectacleService.findFirst({ ...query });
      if (!data) {
        throw new HttpError('spectacle not found', 404);
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
  ): Promise<Spectacle> {
    try {
      const data = await this.spectacleService.findOne({
        ...getQuery(req),
        where: { id },
      });
      if (!data) {
        throw new HttpError('spectacle not found', 404);
      }
      return data;
    } catch (error) {
      return buildError(error);
    }
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const data = await this.spectacleService.findOne({
      where: { id },
    });
    if (!data) {
      throw new HttpError('spectacle not found', 404);
    }
    try {
      return await this.spectacleService.delete({
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
    @Body() dto: UpdateSpectacleDTO,
  ) {
    try {
      const data = await this.spectacleService.findOne({
        where: { id },
      });
      if (!data) {
        throw new HttpError('spectacle not found', 404);
      }
      const updatedData = await this.spectacleService.update({
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
  async createOne(@Body() dto: CreateSpectacleDTO): Promise<Spectacle> {
    try {
      const spectacle = await this.spectacleService.create(dto);
      return spectacle;
    } catch (error) {
      return buildError(error);
    }
  }
}
