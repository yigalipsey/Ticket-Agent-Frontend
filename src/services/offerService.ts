import { apiClient } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { Offer, OfferQuery, PaginatedResponse } from "@/types";

export class OfferService {
  static async getOffersByFixture(
    fixtureId: string,
    query?: Omit<OfferQuery, "fixtureId">
  ): Promise<PaginatedResponse<Offer>> {
    return apiClient.getPaginated<Offer>(
      `${API_ENDPOINTS.OFFERS}/fixture/${fixtureId}`,
      query
    );
  }
}

export default OfferService;
