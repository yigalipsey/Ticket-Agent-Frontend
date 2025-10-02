export interface StaticTeamData {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  nameHe: string;
  code: string;
  country: string;
  countryCode: string;
  logo: string;
  stadiumImage: string;
  description: string;
  stadium: {
    name: string;
    nameEn: string;
    city: string;
    capacity: string;
    opened: string;
    surface: string;
  };
  manager: {
    name: string;
    nameEn: string;
    nationality: string;
    appointed: string;
  };
  owner: {
    name: string;
    nameEn: string;
    role: string;
  };
  leagues: string[];
  location: {
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  founded: string;
  colors: {
    primary: string;
    secondary: string;
  };
  nicknames: string[];
  achievements: {
    leagueTitles: number;
    cupTitles: number;
    championsLeague: number;
    worldClubCup: number;
  };
}

export interface TeamCardData {
  label: string;
  value: string;
  icon: string;
}
