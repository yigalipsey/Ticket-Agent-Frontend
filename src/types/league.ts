export interface League {
  _id: string;
  leagueId: number;
  name: string;
  nameHe: string;
  slug: string;
  country: string;
  countryHe: string;
  logoUrl: string;
  type: string;
  isPopular: boolean;
}

export interface LeagueFilters {
  country?: string;
  type?: string;
}

export interface LeagueQuery {
  page?: number;
  limit?: number;
  sortBy?: "name" | "popularity";
  sortOrder?: "asc" | "desc";
  filters?: LeagueFilters;
}

export interface LeagueRound {
  round: number;
  fixtures: string[]; // Fixture IDs
  startDate: string;
  endDate: string;
  status: "scheduled" | "finished";
}
