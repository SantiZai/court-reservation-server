import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async getUser(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: { club: true },
    });
    return user;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async updateUser(user: Partial<User>): Promise<User | null> {
    return await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });
  }

  async deleteUser(id: string): Promise<User | null> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
