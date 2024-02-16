import { Injectable } from '@nestjs/common';
import { Court } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CourtsService {
  constructor(private prisma: PrismaService) {}

  async getCourtsByClubId(id: string): Promise<Court[]> {
    return await this.prisma.court.findMany({
      where: {
        clubId: id,
      },
      include: {
        reservations: true,
      },
    });
  }

  async updateCourt(id: string, court: Court): Promise<Court | null> {
    return await this.prisma.court.update({
      where: {
        id,
      },
      data: court,
    });
  }

  async deleteCourt(id: string): Promise<Court | null> {
    return await this.prisma.court.delete({
      where: {
        id,
      },
    });
  }
}
