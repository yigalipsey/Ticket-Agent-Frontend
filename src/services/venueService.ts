// services/venueService.ts
import { apiClient } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";

export interface Venue {
    _id: string;
    venueId: number;
    name: string;
    name_he?: string;
    city: string;
    country: string;
    capacity?: number;
    imageUrl?: string;
    externalIds?: {
        apiFootball?: number;
        [key: string]: any;
    };
}

export interface VenuesResponse {
    success: boolean;
    data: Venue[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface ServiceResult<T> {
    data: T | null;
    error: string | null;
    success: boolean;
}

export class VenueService {
    /**
     * קבלת אצטדיונים עם פגינציה וסינון
     */
    static async getVenues(params?: {
        page?: number;
        limit?: number;
        country?: string;
        search?: string;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
    }): Promise<ServiceResult<VenuesResponse>> {
        try {
            // Use getPaginated which handles pagination properly
            const response = await apiClient.getPaginated<Venue>(
                API_ENDPOINTS.VENUES,
                params
            );

            return {
                data: {
                    success: true,
                    data: response.data,
                    pagination: response.pagination ? {
                        ...response.pagination,
                        pages: response.pagination.totalPages,
                    } : {
                        page: params?.page || 1,
                        limit: params?.limit || 10,
                        total: response.data.length,
                        pages: 1,
                    },
                },
                error: null,
                success: true,
            };
        } catch (error: any) {
            console.error("❌ שגיאה בטעינת אצטדיונים:", error);
            return {
                data: null,
                error: `שגיאה בטעינת האצטדיונים: ${error.message || "שגיאה לא ידועה"}`,
                success: false,
            };
        }
    }

    /**
     * קבלת אצטדיון ספציפי לפי מזהה
     */
    static async getVenueById(
        id: string
    ): Promise<ServiceResult<Venue>> {
        try {
            const venue = await apiClient.get<Venue>(
                `${API_ENDPOINTS.VENUES}/${id}`
            );

            return {
                data: venue,
                error: null,
                success: true,
            };
        } catch (error: any) {
            console.error("❌ שגיאה בטעינת אצטדיון:", error);
            return {
                data: null,
                error: `שגיאה בטעינת האצטדיון: ${error.message || "שגיאה לא ידועה"}`,
                success: false,
            };
        }
    }
}

export default VenueService;
