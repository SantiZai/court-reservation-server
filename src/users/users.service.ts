import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
    async getUsers(): Promise<User[]> {
        const users = await this.prisma.user.findMany()
        return users;
    }

    async getUser(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        })
        return user;
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return await this.prisma.user.create({ data })
    }
}
