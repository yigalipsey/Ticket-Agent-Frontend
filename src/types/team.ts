export interface Team {
  _id?: string;
  id?: string;
  name: string;
  nameHe?: string;
  slug: string;
  logo?: string;
  logoUrl?: string;
  country: string;
  city?: string;
  founded?: number;
  stadium?: string;
  capacity?: number;
  website?: string;
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  colors?: {
    primary: string;
    secondary: string;
  };
  description?: string;
  code?: string;
  venueId?: any;
  isHot?: boolean;
}

export interface TeamFilters {
  country?: string;
  city?: string;
  league?: string;
}

export interface TeamQuery {
  page?: number;
  limit?: number;
  sortBy?: "name" | "founded" | "popularity";
  sortOrder?: "asc" | "desc";
  filters?: TeamFilters;
}

export interface TeamStats {
  teamId: string;
  leagueId: string;
  season: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  position: number;
}
