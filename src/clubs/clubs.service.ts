import { Injectable } from '@nestjs/common';
import { Club, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClubsService {
  constructor(private prisma: PrismaService) {}
  
  async getClubs(): Promise<Club[]> {
    return await this.prisma.club.findMany();
  }

  async getClub(id: string): Promise<Club | null> {
    const club = await this.prisma.club.findUnique({
      where: {
        id,
      },
      include: {
        courts: true,
      },
    });
    return club;
  }

  async createClub(data: Prisma.ClubCreateInput): Promise<Club> {
    return await this.prisma.club.create({ data });
  }

  async updateClub(id: string, club: Club): Promise<Club | null> {
    return await this.prisma.club.update({
      where: {
        id,
      },
      data: club,
      include: {
        courts: true,
      },
    });
  }

  async deleteClub(id: string): Promise<Club | null> {
    return await this.prisma.club.delete({
      where: {
        id,
      },
    });
  }
}
