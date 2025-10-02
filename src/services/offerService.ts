import { apiClient } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { Offer, OfferQuery, PaginatedResponse } from "@/types";

export class OfferService {
  static async getOffers(query: OfferQuery): Promise<PaginatedResponse<Offer>> {
    return apiClient.getPaginated<Offer>(API_ENDPOINTS.OFFERS, query);
  }

  static async getOffer(id: string): Promise<Offer> {
    return apiClient.get<Offer>(`${API_ENDPOINTS.OFFERS}/${id}`);
  }

  static async getOffersByFixture(
    fixtureId: string,
    query?: Omit<OfferQuery, "fixtureId">
  ): Promise<PaginatedResponse<Offer>> {
    return apiClient.getPaginated<Offer>(
      `${API_ENDPOINTS.FIXTURES}/${fixtureId}/offers`,
      query
    );
  }

  static async getLowestOffer(fixtureId: string): Promise<Offer | null> {
    try {
      const response = await apiClient.getPaginated<Offer>(
        `${API_ENDPOINTS.FIXTURES}/${fixtureId}/offers`,
        {
          limit: 1,
          sortBy: "price",
          sortOrder: "asc",
        }
      );
      return response.data[0] || null;
    } catch {
      return null;
    }
  }

  static async getOffersByAgent(
    agentId: string,
    query?: Omit<OfferQuery, "fixtureId">
  ): Promise<PaginatedResponse<Offer>> {
    return apiClient.getPaginated<Offer>(`${API_ENDPOINTS.OFFERS}`, {
      ...query,
      filters: {
        ...query?.filters,
        agent: agentId,
      },
    });
  }

  static async getVerifiedOffers(
    fixtureId: string,
    query?: Omit<OfferQuery, "fixtureId">
  ): Promise<PaginatedResponse<Offer>> {
    return apiClient.getPaginated<Offer>(
      `${API_ENDPOINTS.FIXTURES}/${fixtureId}/offers`,
      {
        ...query,
        filters: {
          ...query?.filters,
          verifiedOnly: true,
        },
      }
    );
  }

  static async getOffersByCategory(
    fixtureId: string,
    category: Offer["category"],
    query?: Omit<OfferQuery, "fixtureId">
  ): Promise<PaginatedResponse<Offer>> {
    return apiClient.getPaginated<Offer>(
      `${API_ENDPOINTS.FIXTURES}/${fixtureId}/offers`,
      {
        ...query,
        filters: {
          ...query?.filters,
          category,
        },
      }
    );
  }

  static async getPriceRange(
    fixtureId: string
  ): Promise<{ min: number; max: number }> {
    try {
      const response = await apiClient.get<{ min: number; max: number }>(
        `${API_ENDPOINTS.FIXTURES}/${fixtureId}/price-range`
      );
      return response;
    } catch {
      return { min: 0, max: 0 };
    }
  }
}

export default OfferService;
