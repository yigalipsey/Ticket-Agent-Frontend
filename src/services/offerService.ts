import { apiClient } from "@/lib/api";

export interface CreateOfferData {
  fixtureId: string;
  price: number;
  currency: string;
  ticketType: string;
  url?: string;
}

export interface CreateOfferResponse {
  success: boolean;
  data?: unknown;
  error?: {
    code?: string;
    message?: string;
  };
  message?: string;
}

export interface ExternalRating {
  rating?: number | null;
  url?: string | null;
  provider?: "trustpilot" | "google" | null;
}

export interface OfferOwnerInfo {
  id?: string;
  _id?: string;
  name?: string;
  slug?: string;
  whatsapp?: string;
  imageUrl?: string;
  logoUrl?: string;
  agentType?: string;
  companyName?: string;
  isActive?: boolean;
  externalRating?: ExternalRating | null;
  // Backward compatibility
  trustpilotRating?: number | null;
  trustpilotUrl?: string | null;
}

export interface OfferResponse {
  id?: string;
  _id?: string;
  fixtureId: string;
  fixture?: {
    id: string;
    date: string;
    homeTeam: { name: string; logoUrl: string };
    awayTeam: { name: string; logoUrl: string };
    league: { name: string; nameHe?: string };
    venue: { name: string; city: string };
  };
  ownerType?: "Agent" | "Supplier";
  owner?: OfferOwnerInfo;
  ownerId?: OfferOwnerInfo;
  // Backward compatibility - populated by backend
  agentId?: OfferOwnerInfo;
  price: number;
  currency: "EUR" | "USD" | "ILS" | "GBP";
  ticketType?: "standard" | "vip";
  isHospitality?: boolean;
  isAvailable: boolean;
  notes?: string | null;
  url?: string | null;
  fallbackContact?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

class OfferService {
  async getFixtureIdBySlug(slug: string) {
    try {
      const response = await apiClient.get(`/fixtures/by-slug/${slug}`);
      return response;
    } catch {
      return null;
    }
  }

  async getOffersByFixtureId(
    fixtureId: string,
    options?: {
      limit?: number;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    }
  ) {
    try {
      const response = await apiClient.get(`/offers/fixture/${fixtureId}`, {
        params: options,
      });
      return response;
    } catch {
      return null;
    }
  }

  async createOffer(offerData: CreateOfferData): Promise<CreateOfferResponse> {
    console.log(
      "%c[OFFER CREATE] 🟢 Starting to create offer",
      "color: #10b981; font-weight: bold; font-size: 12px;",
      {
        fixtureId: offerData.fixtureId,
        price: offerData.price,
        currency: offerData.currency,
        ticketType: offerData.ticketType,
      }
    );

    try {
      const response = await apiClient.postAuth(`/offers`, offerData, "agent");

      console.log(
        "%c[OFFER CREATE] ✅ Offer created successfully",
        "color: #10b981; font-weight: bold; font-size: 12px;",
        {
          fixtureId: offerData.fixtureId,
          price: offerData.price,
          currency: offerData.currency,
          response,
        }
      );

      return {
        success: true,
        data: response,
        message: "Offer created successfully",
      };
    } catch (err: unknown) {
      console.error(
        "%c[OFFER CREATE] ❌ Error creating offer",
        "color: #ef4444; font-weight: bold; font-size: 12px;",
        {
          fixtureId: offerData.fixtureId,
          error: err,
        }
      );
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: {
            data?: {
              error?: {
                code?: string;
                message?: string;
              };
              message?: string;
            };
            status?: number;
          };
        };

        return {
          success: false,
          error: {
            code: axiosError.response?.data?.error?.code,
            message:
              axiosError.response?.data?.error?.message ||
              axiosError.response?.data?.message,
          },
        };
      }

      return {
        success: false,
        error: {
          message: err instanceof Error ? err.message : "Unknown error",
        },
      };
    }
  }

  async getAgentOffers(query?: {
    page?: number;
    limit?: number;
    isAvailable?: boolean;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<{
    success: boolean;
    data: OfferResponse[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
    error?: string;
  }> {
    try {
      // apiClient.getAuth מחזיר ישירות את data מתוך תגובת ה־backend
      // כלומר כאן נקבל ישירות מערך של הצעות (OfferResponse[])
      const offers = await apiClient.getAuth<OfferResponse[]>(
        "/offers/agent",
        query,
        "agent"
      );

      return {
        success: true,
        data: offers,
        pagination: undefined,
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch agent offers",
      };
    }
  }

  async getOfferById(
    offerId: string
  ): Promise<{ success: boolean; data?: OfferResponse; error?: string }> {
    try {
      const offer = await apiClient.get<OfferResponse>(`/offers/${offerId}`);
      return {
        success: true,
        data: offer,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch offer",
      };
    }
  }

  async updateOffer(
    offerId: string,
    offerData: Partial<CreateOfferData>
  ): Promise<CreateOfferResponse> {
    console.log(
      "%c[OFFER UPDATE] 🔵 Starting to update offer",
      "color: #3b82f6; font-weight: bold; font-size: 12px;",
      {
        offerId,
        updateData: offerData,
      }
    );

    try {
      const response = await apiClient.putAuth(
        `/offers/${offerId}`,
        offerData,
        "agent"
      );

      console.log(
        "%c[OFFER UPDATE] ✅ Offer updated successfully",
        "color: #10b981; font-weight: bold; font-size: 12px;",
        {
          offerId,
          updateData: offerData,
          response,
        }
      );

      return {
        success: true,
        data: response,
        message: "Offer updated successfully",
      };
    } catch (err: unknown) {
      console.error(
        "%c[OFFER UPDATE] ❌ Error updating offer",
        "color: #ef4444; font-weight: bold; font-size: 12px;",
        {
          offerId,
          updateData: offerData,
          error: err,
        }
      );
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: {
            data?: {
              error?: {
                code?: string;
                message?: string;
              };
              message?: string;
            };
            status?: number;
          };
        };

        return {
          success: false,
          error: {
            code: axiosError.response?.data?.error?.code,
            message:
              axiosError.response?.data?.error?.message ||
              axiosError.response?.data?.message,
          },
        };
      }

      return {
        success: false,
        error: {
          message: err instanceof Error ? err.message : "Unknown error",
        },
      };
    }
  }

  async deleteOffer(
    offerId: string
  ): Promise<{ success: boolean; error?: string }> {
    console.log(
      "%c[OFFER DELETE] 🟡 Starting to delete offer",
      "color: #f59e0b; font-weight: bold; font-size: 12px;",
      {
        offerId,
      }
    );

    try {
      // Use deleteAuth to send authentication cookies
      await apiClient.deleteAuth(`/offers/${offerId}`, "agent");

      console.log(
        "%c[OFFER DELETE] ✅ Offer deleted successfully",
        "color: #10b981; font-weight: bold; font-size: 12px;",
        {
          offerId,
        }
      );

      return { success: true };
    } catch (error) {
      console.error(
        "%c[OFFER DELETE] ❌ Error deleting offer",
        "color: #ef4444; font-weight: bold; font-size: 12px;",
        {
          offerId,
          error,
        }
      );

      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to delete offer",
      };
    }
  }
}

const offerService = new OfferService();
export default offerService;
