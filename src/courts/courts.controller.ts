import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common';
import { CourtsService } from './courts.service';
import { Court } from '@prisma/client';

@Controller('courts')
export class CourtsController {
  constructor(private courtsService: CourtsService) {}

  @Get(':id')
  async findAllByClubId(@Param('id') id: string): Promise<Court[]> {
    return await this.courtsService.getCourtsByClubId(id);
  }

  @Patch(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() court: Court,
  ): Promise<Court | null> {
    return await this.courtsService.updateCourt(id, court);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<Court> {
    return await this.courtsService.deleteCourt(id);
  }
}
