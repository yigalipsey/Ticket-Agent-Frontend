import { apiClient } from "@/lib/api";
import { Agent, AgentLoginCredentials, AgentLoginResponse } from "@/types";

class AgentAuthService {
  private static instance: AgentAuthService;
  private agent: Agent | null = null;

  private constructor() {
    // No localStorage initialization needed - using cookies
  }

  public static getInstance(): AgentAuthService {
    if (!AgentAuthService.instance) {
      AgentAuthService.instance = new AgentAuthService();
    }
    return AgentAuthService.instance;
  }

  /**
   * Login agent with email and password
   */
  async login(credentials: AgentLoginCredentials): Promise<AgentLoginResponse> {
    try {
      const response = (await apiClient.post(
        "/auth/agent/login",
        credentials
      )) as {
        success: boolean;
        data: { token: string; agent: Agent };
        message?: string;
      };

      if (response.success) {
        const { token, agent } = response.data;

        // Store agent data locally (token is in cookie)
        this.agent = agent;

        return { token, agent };
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { error?: { code?: string } } };
      };

      if (!axiosError.response) {
        throw new Error("שגיאת רשת. בדוק את החיבור לאינטרנט");
      }

      const errorData = axiosError.response.data;

      if (errorData?.error?.code === "AGENT_INVALID_CREDENTIALS") {
        throw new Error("אימייל או סיסמה לא נכונים");
      }

      if (errorData?.error?.code === "AGENT_ACCOUNT_DEACTIVATED") {
        throw new Error("החשבון שלך הושבת. פנה למנהל המערכת");
      }

      throw new Error("שגיאה בהתחברות. נסה שוב מאוחר יותר");
    }
  }

  /**
   * Logout agent
   */
  async logout(): Promise<void> {
    try {
      // Logout using cookie-based authentication
      await apiClient.postAuth("/auth/agent/logout", {}, "agent");
    } catch {
      // Ignore logout errors
    } finally {
      this.clearAuth();
    }
  }

  /**
   * Get current agent info
   */
  async getCurrentAgent(): Promise<Agent | null> {
    try {
      // Get agent info using iron-session
      const response = await apiClient.get("/api/auth/agent/me");

      if (response.success) {
        const agent = response.data;
        this.agent = agent;
        return agent;
      }
    } catch {
      // If session is invalid, clear auth
      this.clearAuth();
    }

    return null;
  }

  /**
   * Check if agent is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.agent;
  }

  /**
   * Get current agent (synchronous)
   */
  getCurrentAgentSync(): Agent | null {
    return this.agent;
  }

  /**
   * Clear authentication data
   */
  private clearAuth(): void {
    this.agent = null;
  }
}

// Export singleton instance
const agentAuthService = AgentAuthService.getInstance();
export default agentAuthService;
