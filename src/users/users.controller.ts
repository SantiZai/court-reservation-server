import {
  Controller,
  Get,
  Post,
  HttpCode,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return await this.usersService.getUser(id);
  }

  @Post()
  @HttpCode(204)
  async create(@Body() user: User): Promise<User> {
    return await this.usersService.createUser(user);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<User | null> {
    return await this.usersService.deleteUser(id);
  }
}
