export interface Venue {
  id?: string;
  _id?: string;
  name?: string;
  name_en?: string;
  name_he?: string;
  nameHe?: string;
  slug: string;
  city?: string;
  city_en?: string;
  city_he?: string;
  country: string;
  address?: string;
  capacity: number;
  surface: "grass" | "artificial" | "hybrid";
  opened?: number;
  renovated?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  images?: string[];
  description?: string;
  facilities?: string[];
  parking?: {
    available: boolean;
    capacity?: number;
    price?: number;
  };
  publicTransport?: {
    metro?: string[];
    bus?: string[];
    train?: string[];
  };
}

export interface VenueFilters {
  country?: string;
  city?: string;
  minCapacity?: number;
  maxCapacity?: number;
  surface?: Venue["surface"];
}

export interface VenueQuery {
  page?: number;
  limit?: number;
  sortBy?: "name" | "capacity" | "opened";
  sortOrder?: "asc" | "desc";
  filters?: VenueFilters;
}
