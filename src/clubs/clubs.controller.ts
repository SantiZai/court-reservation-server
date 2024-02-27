import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { Club, SPORTS, USER_TYPES } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ClubDto } from 'src/globalsDtos';
import { mapLocation, mapSportToEnum } from 'src/utils';

@ApiTags('clubs')
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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Club | null> {
    return await this.clubsService.getClub(id);
  }

  @Get('search/many')
  async filterClubs(@Query() queries: any): Promise<Club[]> {
    const mappedQueries = {
      ...queries,
      location: mapLocation(queries.location),
      sport: mapSportToEnum(queries.sport)
    }
    return await this.clubsService.filterClubs(mappedQueries.location, mappedQueries.sport);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: ClubDto })
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

  @ApiBearerAuth()
  @ApiBody({ type: ClubDto })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() club: Club,
  ): Promise<Club | null> {
    const existingClub = await this.clubsService.getClub(id);
    if (!existingClub) throw new Error('Club not found');
    return await this.clubsService.updateClub(id, club);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<Club | null> {
    const existingClub = await this.clubsService.getClub(id);
    if (!existingClub) throw new Error('Club not found');
    return await this.clubsService.deleteClub(id);
  }
}
