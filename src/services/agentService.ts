import { apiClient } from "@/lib/api";

export interface Agent {
  _id: string;
  name: string;
  email: string;
  whatsapp: string;
  agentType: "individual" | "agency";
  companyName?: string;
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
}

const agentService = new AgentService();
export default agentService;
