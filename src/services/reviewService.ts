import { apiClient } from "@/lib/api";

export interface ReviewData {
  rating: number;
  comment?: string;
  reviewerName: string;
  reviewerEmail: string;
  agentId: string;
}

export interface ReviewResponse {
  success: boolean;
  message?: string;
  error?: string;
}

class ReviewService {
  async submitReview(data: ReviewData): Promise<ReviewResponse> {
    try {
      const response = await apiClient.post<ReviewResponse>(`/reviews`, data);
      return {
        success: true,
        message: response.message || "Review submitted successfully",
      };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to submit review",
      };
    }
  }
}

const reviewService = new ReviewService();
export default reviewService;
