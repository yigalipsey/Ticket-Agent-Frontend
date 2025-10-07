export interface League {
  _id: string;
  id?: string; // Alias for _id
  leagueId: number;
  name: string;
  nameHe: string;
  slug: string;
  country: string;
  countryHe: string;
  logoUrl: string;
  type: string;
  isPopular: boolean;
  teams?: Team[]; // Optional teams array
}

export interface Team {
  _id: string;
  id?: string; // Alias for _id
  name: string;
  name_he: string;
  name_en: string;
  code: string;
  slug: string;
  logoUrl: string;
  country: string;
  country_he: string;
  country_en: string;
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
