import { Public } from 'src/decorators/public';
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
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Request as ExpressRequest } from 'express';
import { UserService } from './user.service';
import {
  CreateUserDTO,
  DeleteParamUserDTO,
  UpdateParamUserDTO,
  UpdateUserDTO,
} from './user.validator';
import { UpdateInterceptor } from 'src/interceptors/update.interceptor';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findMany(@Request() req: ExpressRequest): Promise<User[]> {
    try {
      return await this.userService.find(getQuery(req));
    } catch (error) {
      return buildError(error);
    }
  }

  @Get('find-unique')
  async findUnique(@Request() req: ExpressRequest): Promise<User> {
    try {
      const { where } = getQuery(req);
      if (!where) throw new HttpError(`missing param 'where'`, 400);
      const user = await this.userService.findOne({ where });
      if (!user) {
        throw new HttpError('user not found', 404);
      }
      return user;
    } catch (error) {
      return buildError(error);
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id,
    @Request() req: ExpressRequest,
  ): Promise<User> {
    try {
      const entity = await this.userService.findOne({
        ...getQuery(req),
        where: { id: parseInt(id) || -1 },
      });
      if (!entity) {
        throw new HttpError('user not found', 404);
      }
      return entity;
    } catch (error) {
      return buildError(error);
    }
  }

  @Delete(':id')
  async deleteOne(@Param() { id }: DeleteParamUserDTO): Promise<User> {
    try {
      return await this.userService.delete({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      return buildError(error);
    }
  }

  @Public()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  @Post()
  async createOne(@Body() dto: CreateUserDTO): Promise<User> {
    try {
      const user = await this.userService.create(dto);
      return user;
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
    @Param() { id }: UpdateParamUserDTO,
    @Body() dto: UpdateUserDTO,
  ) {
    try {
      const res = await this.userService.update({
        where: { id: parseInt(id) },
        data: dto,
      });
      return res;
    } catch (error) {
      return buildError(error);
    }
  }
}
