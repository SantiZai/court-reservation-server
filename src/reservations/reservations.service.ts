import { Injectable } from '@nestjs/common';
import { Prisma, Reservation } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async getReservationsByUserId(id: string): Promise<Reservation[] | null> {
    return await this.prisma.reservation.findMany({
      where: {
        userId: id,
      },
      include: {
        court: true,
      },
    });
  }

  async createReservation(
    data: Prisma.ReservationCreateInput,
  ): Promise<Reservation> {
    return await this.prisma.reservation.create({ data });
  }

  async deleteReservation(id: string): Promise<Reservation | null> {
    return await this.prisma.reservation.delete({
      where: {
        id,
      },
    });
  }
}
