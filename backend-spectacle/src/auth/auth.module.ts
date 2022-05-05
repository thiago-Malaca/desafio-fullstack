import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { ConfigModule } from 'src/config/config.module';

import { AuthValidatorMiddleware } from './auth-validator.middleware';
import { JwtModule } from 'src/jwt/jwt.module';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [AuthService, LocalStrategy],
  imports: [ConfigModule, UserModule, PassportModule, JwtModule],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthValidatorMiddleware).forRoutes('auth/login');
  }
}
