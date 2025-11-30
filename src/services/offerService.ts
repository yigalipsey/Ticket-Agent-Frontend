import { apiClient } from "@/lib/api";

export interface CreateOfferData {
  fixtureId: string;
  price: number;
  currency: string;
  ticketType: string;
  notes?: string;
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

export interface OfferResponse {
  _id: string;
  fixtureId: string;
  ownerType?: "Agent" | "Supplier";
  ownerId?: {
    _id?: string;
    name?: string;
    whatsapp?: string;
    imageUrl?: string;
    agentType?: string;
    companyName?: string;
    isActive?: boolean;
  };
  // Backward compatibility - populated by backend
  agentId?: {
    _id?: string;
    name?: string;
    whatsapp?: string;
    imageUrl?: string;
    agentType?: string;
    companyName?: string;
    isActive?: boolean;
  };
  price: number;
  currency: "EUR" | "USD" | "ILS" | "GBP";
  ticketType?: "standard" | "vip";
  isHospitality?: boolean;
  isAvailable: boolean;
  notes?: string;
  url?: string;
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
