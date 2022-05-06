import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtModule } from './jwt/jwt.module';
import { SpectacleModule } from './spectacle/spectacle.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    AuthModule,
    UserModule,
    JwtModule,
    SpectacleModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
