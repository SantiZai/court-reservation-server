import { SPORTS } from '@prisma/client';

export const mapLocation = (location: string) => {
  return location
    .split(',')
    .map((part: string) => part.split('-').join(" "))
    .join(',');
};

export const mapSportToEnum = (sport: string) => {
  switch (sport) {
    case 'tenis':
      return SPORTS.tenis;
    case 'futbol':
      return SPORTS.futbol;
    case 'basquet':
      return SPORTS.basquet;
    case 'voleibol':
      return SPORTS.voleibol;
    case 'hockey':
      return SPORTS.hockey;
    case 'rugby':
      return SPORTS.rugby;
    default:
      throw new Error('Invalid sport value');
  }
};
