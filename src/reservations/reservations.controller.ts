import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Reservation } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { CourtsService } from 'src/courts/courts.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('reservations')
@ApiBearerAuth()
@Controller('reservations')
export class ReservationsController {
  constructor(
    private reservationsService: ReservationsService,
    private usersService: UsersService,
    private courtsService: CourtsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findReservationsByUserId(
    @Param('id') id: string,
  ): Promise<Reservation[] | null> {
    return await this.reservationsService.getReservationsByUserId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/new')
  @HttpCode(204)
  async create(
    @Body()
    data: {
      reservation: Reservation;
      userId: string;
      clubId: string;
      courtId: string;
    },
  ): Promise<Reservation> {
    const existingUser = await this.usersService.getUser(data.userId);
    const existingCourt = await this.courtsService.getUniqueCourtByClubId(
      data.clubId,
      data.courtId,
    );

    // map the user
    const mappedUser = {
      connect: {
        id: existingUser.id,
      },
    };
    // map the court
    const mappedCourt = {
      connect: {
        id: existingCourt.id,
      },
    };
    return await this.reservationsService.createReservation({
      ...data.reservation,
      user: mappedUser,
      court: mappedCourt,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<Reservation | null> {
    return await this.reservationsService.deleteReservation(id);
  }
}
