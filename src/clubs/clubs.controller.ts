import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { Club, USER_TYPES } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Controller('clubs')
export class ClubsController {
  constructor(
    private clubsService: ClubsService,
    private usersService: UsersService,
  ) {}

  @Get()
  async findAll(): Promise<Club[]> {
    return await this.clubsService.getClubs();
  }

  // TODO: valid if the club exists before return
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Club | null> {
    return await this.clubsService.getClub(id);
  }

  @Post()
  @HttpCode(204)
  async create(@Body() data: { club: Club; userId: string }): Promise<Club> {
    const existingUser = await this.usersService.getUser(data.userId);
    await this.usersService.updateUser({
      id: existingUser.id,
      userType: USER_TYPES.superadmin,
    });

    // map the user to UserCreateNestedOneWithoutClubInput that prisma waits
    const mappedUser = {
      connect: {
        id: existingUser.id,
      },
    };
    return await this.clubsService.createClub({
      ...data.club,
      admin: mappedUser,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() club: Club,
  ): Promise<Club | null> {
    const existingClub = await this.clubsService.getClub(id);
    if (!existingClub) throw new Error('Club not found');
    return await this.clubsService.updateClub(id, club);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<Club | null> {
    const existingClub = await this.clubsService.getClub(id);
    if (!existingClub) throw new Error('Club not found');
    return await this.clubsService.deleteClub(id);
  }
}
