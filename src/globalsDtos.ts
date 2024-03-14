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

class ReservationDto {
  reservation: {
    date: string;
    hour: string;
  };
  userId: string;
  clubId: string;
  courtId: string;
}

class UserDto {
  fullname: string;
  email: string;
}

export { ClubDto, CourtDto, ReservationDto, UserDto };
