import { apiClient } from "@/lib/api";

export interface ExternalRating {
  rating?: number | null;
  url?: string | null;
  provider?: "trustpilot" | "google" | null;
}

export interface Agent {
  _id: string;
  name: string;
  email: string;
  whatsapp: string;
  agentType: "individual" | "agency";
  companyName?: string;
  imageUrl?: string;
  logoUrl?: string;
  websiteUrl?: string;
  instagramUrl?: string;
  externalRating?: ExternalRating | null;
  isActive: boolean;
  reviewStats: {
    totalReviews: number;
    averageRating: number;
    verifiedReviews: number;
    recentReviews: Array<{
      rating: number;
      comment: string;
      reviewerName: string;
      createdAt: string;
      isVerified: boolean;
    }>;
  };
}

export interface AgentsResponse {
  success: boolean;
  data: Agent[];
  message?: string;
  error?: string;
}

class AgentService {
  async getAllAgents(): Promise<AgentsResponse> {
    try {
      const response = await apiClient.get<Agent[]>("/agents");

      // The backend returns agents directly as an array, not wrapped in success/data
      const wrappedResponse: AgentsResponse = {
        success: true,
        data: response,
        message: "Agents retrieved successfully",
      };

      return wrappedResponse;
    } catch (error: unknown) {
      return {
        success: false,
        data: [],
        error:
          error instanceof Error ? error.message : "Failed to fetch agents",
      };
    }
  }

  async getAgentById(
    id: string
  ): Promise<{ success: boolean; data?: Agent; error?: string }> {
    try {
      // Reusing getAllAgents and filtering for now since we don't know if /agents/:id exists
      // Optimization: Ideally backend should have get by ID.
      const allAgents = await this.getAllAgents();
      if (allAgents.success) {
        const agent = allAgents.data.find((a) => a._id === id);
        if (agent) {
          return { success: true, data: agent };
        }
        return { success: false, error: "Agent not found" };
      }
      return { success: false, error: allAgents.error };
    } catch (error: unknown) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch agent",
      };
    }
  }
}

const agentService = new AgentService();
export default agentService;
