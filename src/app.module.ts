import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClubsController } from './clubs/clubs.controller';
import { UsersController } from './users/users.controller';
import { AppService } from './app.service';
import { ClubsService } from './clubs/clubs.service';
import { UsersService } from './users/users.service';
import { PrismaService } from './prisma.service';
import { ReservationsController } from './reservations/reservations.controller';
import { ReservationsService } from './reservations/reservations.service';
import { CourtsController } from './courts/courts.controller';
import { CourtsService } from './courts/courts.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [
    AppController,
    ClubsController,
    UsersController,
    CourtsController,
    ReservationsController,
  ],
  providers: [
    AppService,
    PrismaService,
    ClubsService,
    UsersService,
    CourtsService,
    ReservationsService,
  ],
})
export class AppModule {}
