import { apiClient } from "@/lib/api";

export interface CreateOfferData {
  fixtureId: string;
  price: number;
  currency: string;
  ticketType: string;
  isHospitality?: boolean;
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

  /**
   * Stream offers by fixture ID using Server-Sent Events (SSE)
   * Returns offers in real-time as they become available
   */
  streamOffersByFixture(
    fixtureId: string,
    callbacks: {
      onFixture?: (fixture: any) => void;
      onOffers?: (data: { offers: OfferResponse[]; source: string; count: number }) => void;
      onOffer?: (data: { offer: OfferResponse; source: string; fromCache: boolean; isLive: boolean }) => void;
      onMetadata?: (data: { totalChunks: number }) => void;
      onError?: (error: { message: string; offerId?: string; fatal?: boolean }) => void;
      onComplete?: (summary: { total: number; agents: number; suppliers: number; errors: number }) => void;
    }
  ): () => void {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
    const eventSource = new EventSource(`${apiUrl}/offers/fixture/${fixtureId}/stream`);

    // Listen for metadata event - provides the total number of expected chunks
    eventSource.addEventListener('metadata', (e: Event) => {
      try {
        const data = JSON.parse((e as MessageEvent).data);
        callbacks.onMetadata?.(data);
      } catch (error) {
        console.error('[SSE] Error parsing metadata event:', error);
      }
    });

    // Listen for fixture event
    eventSource.addEventListener('fixture', (e: Event) => {
      try {
        const fixture = JSON.parse((e as MessageEvent).data);
        callbacks.onFixture?.(fixture);
      } catch (error) {
        console.error('[SSE] Error parsing fixture event:', error);
      }
    });

    // Listen for batch offers event
    eventSource.addEventListener('offers', (e: Event) => {
      try {
        const data = JSON.parse((e as MessageEvent).data);
        callbacks.onOffers?.(data);
      } catch (error) {
        console.error('[SSE] Error parsing offers event:', error);
      }
    });

    // Listen for individual offer event
    eventSource.addEventListener('offer', (e: Event) => {
      try {
        const data = JSON.parse((e as MessageEvent).data);
        callbacks.onOffer?.(data);
      } catch (error) {
        console.error('[SSE] Error parsing offer event:', error);
      }
    });

    // Listen for custom error events from backend (with data)
    eventSource.addEventListener('error', (e: Event) => {
      const messageEvent = e as MessageEvent;
      // Only parse if there's actual data (custom error event from backend)
      if (messageEvent.data) {
        try {
          const data = JSON.parse(messageEvent.data);
          callbacks.onError?.(data);

          // Close connection on fatal errors
          if (data.fatal) {
            eventSource.close();
          }
        } catch (error) {
          // If parsing fails, ignore - it's not a JSON error event
          console.warn('[SSE] Received error event but could not parse data');
        }
      }
    });

    // Listen for complete event
    eventSource.addEventListener('complete', (e: Event) => {
      try {
        const summary = JSON.parse((e as MessageEvent).data);
        callbacks.onComplete?.(summary);
        eventSource.close();
      } catch (error) {
        console.error('[SSE] Error parsing complete event:', error);
        eventSource.close();
      }
    });

    // Handle EventSource connection errors (not custom events)
    eventSource.onerror = () => {
      console.warn('[SSE] Connection closed or error occurred');
      // Don't treat this as a fatal error - stream might have completed
      eventSource.close();
    };

    // Return cleanup function
    return () => {
      eventSource.close();
    };
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
