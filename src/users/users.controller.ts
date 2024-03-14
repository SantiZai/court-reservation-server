import {
  Controller,
  Get,
  HttpCode,
  Param,
  Body,
  Delete,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Get(':email')
  async findOne(@Param('email') email: string): Promise<User | null> {
    return await this.usersService.getUser(email);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.usersService.createUser(user);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<User | null> {
    return await this.usersService.deleteUser(id);
  }
}
