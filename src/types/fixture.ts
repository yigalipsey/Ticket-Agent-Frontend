export interface Fixture {
  id: string;
  _id?: string; // MongoDB ObjectId
  slug: string;
  homeTeam: Team;
  awayTeam: Team;
  venue: Venue;
  league: League;
  date: string;
  time: string;
  status: "scheduled" | "finished" | "postponed";
  round?: number;
  season?: string;
  offers: Offer[];
  lowestPrice?: number;
  totalOffers?: number;
  minPrice?: {
    amount: number;
    currency: string;
    updatedAt: string;
  };
}

export interface FixtureFilters {
  league?: string;
  team?: string;
  venue?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: Fixture["status"];
  minPrice?: number;
  maxPrice?: number;
}

export interface FixtureQuery {
  page?: number;
  limit?: number;
  sortBy?: "date" | "price" | "popularity";
  sortOrder?: "asc" | "desc";
  upcoming?: string;
  filters?: FixtureFilters;
}

import { Team } from "./team";
import { Venue } from "./venue";
import { League } from "./league";
import { Offer } from "./offer";
