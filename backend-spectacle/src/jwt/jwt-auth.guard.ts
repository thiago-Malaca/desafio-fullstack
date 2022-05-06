import { buildError } from './../utils/error';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/decorators/public';
import { HttpError } from 'src/utils/error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private jwtService: JwtService) {
    super();
  }

  async getAuthenticateOptions(context: any): Promise<any> {
    const token = context
      .getRequest()
      .headers?.authorization?.split('Bearer ')?.[1];
    if (!token) {
      throw new HttpError('missing token', 403);
    }
    try {
      this.jwtService.verify(token);
    } catch (error) {
      buildError(error);
    }
  }

  canActivate(context: ExecutionContext) {
    context.switchToHttp().getRequest();
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
