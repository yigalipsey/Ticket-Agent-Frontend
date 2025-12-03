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
  trustpilotRating?: number | null;
  trustpilotUrl?: string | null;
}

export interface OfferResponse {
  id?: string;
  _id?: string;
  fixtureId: string;
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
    try {
      const response = await apiClient.postAuth(`/offers`, offerData, "agent");

      return {
        success: true,
        data: response,
        message: "Offer created successfully",
      };
    } catch (err: unknown) {
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
}

const offerService = new OfferService();
export default offerService;
