import { APP_GUARD } from '@nestjs/core';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  providers: [JwtStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }],
  imports: [
    ConfigModule,
    NestJwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.jwtAccessTokenSecret,
        };
      },
    }),
  ],
  exports: [NestJwtModule, JwtStrategy],
})
export class JwtModule {}
