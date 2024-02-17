import { Injectable } from '@nestjs/common';
import { Reservation } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prismaService: PrismaService) {}

  async getReservationsByUserId(id: string): Promise<Reservation[] | null> {
    return await this.prismaService.reservation.findMany({
      where: {
        userId: id,
      },
      include: {
        user: true,
        court: true,
      },
    });
  }
}
