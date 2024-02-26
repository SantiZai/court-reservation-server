import { SPORTS, SURFACES } from '@prisma/client';

class ClubDto {
  club: {
    name: string;
    location: string;
    courts?: CourtDto[];
    sports?: SPORTS[];
  };
  userId: string;
}

class CourtDto {
  court: {
    name: string;
    surface: SURFACES;
    sport: SPORTS;
  };
  clubId: string;
}

class UserDto {
  fullname: string;
  email: string;
  password: string;
}

export { ClubDto, CourtDto, UserDto };
