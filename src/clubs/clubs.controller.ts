import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { Club, User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Controller('clubs')
export class ClubsController {
    constructor(private clubsService: ClubsService, private usersService: UsersService) { }

    @Get()
    async findAll(): Promise<Club[]> {
        return await this.clubsService.getClubs();
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<Club> {
        return await this.clubsService.getClub(id)
    }

    @Post()
    @HttpCode(204)
    async create(@Body() data: { club: Club, userId: string }): Promise<Club> {
        const existingUser = await this.usersService.getUser(data.userId)

        // map the user to UserCreateNestedOneWithoutClubInput that prisma waits
        const mappedUser = {
            connect: {
                id: existingUser.id
            }
        }
        return await this.clubsService.createClub({
            ...data.club,
            admin: mappedUser
        })
    }
}
