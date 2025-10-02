export interface Offer {
  id: string;
  fixtureId: string;
  agent: Agent;
  price: number;
  currency: "ILS" | "USD" | "EUR";
  quantity: number;
  availableQuantity: number;
  category: "VIP" | "Premium" | "Standard" | "Economy";
  section?: string;
  row?: string;
  seats?: string[];
  description?: string;
  terms?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  logo?: string;
  rating?: number;
  totalSales?: number;
  isVerified: boolean;
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

export interface OfferFilters {
  category?: Offer["category"];
  minPrice?: number;
  maxPrice?: number;
  agent?: string;
  verifiedOnly?: boolean;
}

export interface OfferQuery {
  fixtureId: string;
  page?: number;
  limit?: number;
  sortBy?: "price" | "rating" | "createdAt";
  sortOrder?: "asc" | "desc";
  filters?: OfferFilters;
}
