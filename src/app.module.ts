import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ClubsController } from "./clubs/clubs.controller";
import { UsersController } from "./users/users.controller";
import { AppService } from "./app.service";
import { ClubsService } from "./clubs/clubs.service";
import { UsersService } from "./users/users.service";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [],
  controllers: [AppController, ClubsController, UsersController],
  providers: [AppService, PrismaService, ClubsService, UsersService],
})
export class AppModule { }
