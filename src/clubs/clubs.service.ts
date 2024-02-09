import { Injectable } from '@nestjs/common';
import { Club, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClubsService {
    constructor(private prisma: PrismaService) { }
    async getClubs(): Promise<Club[]> {
        const clubs = await this.prisma.club.findMany()
        return clubs;
    }

    async getClub(id: string ): Promise<Club | null> {
        const club = await this.prisma.club.findUnique({
            where: {
                id
            }
        })
        return club;
    }

    async createClub(data: Prisma.ClubCreateInput): Promise<Club> {
        return await this.prisma.club.create({ data })
    }
}
