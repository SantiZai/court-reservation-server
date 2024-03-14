import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async getUser(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: { club: true },
    });
    if (user) return user;
    else throw new NotFoundException('User not found');
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    console.log(data)
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
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
