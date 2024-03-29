import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CourtsService } from './courts.service';
import { Court } from '@prisma/client';
import { ClubsService } from 'src/clubs/clubs.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CourtDto } from 'src/globalsDtos';

@ApiTags('courts')
@ApiBearerAuth()
@Controller('courts')
export class CourtsController {
  constructor(
    private courtsService: CourtsService,
    private clubsService: ClubsService,
  ) {}

  @Get(':id')
  async findAllByClubId(@Param('id') id: string): Promise<Court[]> {
    return await this.courtsService.getCourtsByClubId(id);
  }

  @Get(':clubid/:courtid')
  async findUniqueByClubId(
    @Param('clubid') clubid: string,
    @Param('courtid') courtid: string,
  ): Promise<Court | null> {
    return await this.courtsService.getUniqueCourtByClubId(clubid, courtid);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CourtDto })
  @Post()
  @HttpCode(204)
  async create(@Body() data: { court: Court; clubId: string }): Promise<Court> {
    const existingClub = await this.clubsService.getClub(data.clubId);

    // map the club
    const mappedClub = {
      connect: {
        id: existingClub.id,
      },
    };
    return await this.courtsService.createCourt({
      ...data.court,
      club: mappedClub,
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CourtDto })
  @Patch(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() court: Court,
  ): Promise<Court | null> {
    return await this.courtsService.updateCourt(id, court);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<Court> {
    return await this.courtsService.deleteCourt(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/club/:id')
  @HttpCode(204)
  async deleteAllCourts(@Param('id') id: string): Promise<void> {
    await this.courtsService.deleteAllClubCourts(id);
  }
}
