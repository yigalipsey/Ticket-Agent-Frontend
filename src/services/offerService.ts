import { apiClient } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";

export interface OfferAgent {
  _id: string;
  name: string;
  whatsapp: string;
  isActive: boolean;
}

export interface OfferResponse {
  _id: string;
  fixtureId: string;
  agentId: OfferAgent;
  price: number;
  currency: "EUR" | "USD" | "ILS";
  isAvailable: boolean;
  description?: string;
  source: string;
  metadata?: {
    seatCategory?: string;
    seatSection?: string;
    seatRow?: string;
    seatNumber?: string;
    notes?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OffersResult {
  offers: OfferResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  fromCache?: boolean;
}

export class OfferService {
  /**
   * קבלת הצעות לפי ID של משחק
   */
  static async getOffersByFixtureId(
    fixtureId: string,
    options: {
      page?: number;
      limit?: number;
      isAvailable?: boolean;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    } = {}
  ): Promise<OffersResult> {
    try {
      const {
        page = 1,
        limit = 20,
        isAvailable,
        sortBy = "price",
        sortOrder = "asc",
      } = options;

      const params: Record<string, unknown> = {
        page,
        limit,
        sortBy,
        sortOrder,
      };

      // Add isAvailable only if explicitly provided
      if (isAvailable !== undefined) {
        params.isAvailable = isAvailable;
      }

      const result = await apiClient.get<OffersResult>(
        `${API_ENDPOINTS.OFFERS}/fixture/${fixtureId}`,
        params
      );

      console.log("📊 [OFFER SERVICE] Result from API:", {
        fixtureId,
        hasOffers: !!result?.offers,
        offersLength: result?.offers?.length || 0,
        result,
      });

      return result;
    } catch (error) {
      const err = error as Error;
      console.error("❌ שגיאה בטעינת הצעות למשחק:", err);
      throw error;
    }
  }

  /**
   * קבלת ID של משחק לפי slug
   */
  static async getFixtureIdBySlug(
    slug: string
  ): Promise<{ _id: string; slug: string; fromCache?: boolean }> {
    try {
      const result = await apiClient.get<{
        _id: string;
        slug: string;
        fromCache?: boolean;
      }>(`${API_ENDPOINTS.FIXTURES}/by-slug/${slug}`);
      return result;
    } catch (error) {
      const err = error as Error;
      console.error("❌ שגיאה בטעינת ID של משחק:", err);
      throw error;
    }
  }
}

export default OfferService;
