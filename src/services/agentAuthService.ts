import { apiClient } from "@/lib/api";

export interface Agent {
  _id: string;
  email: string;
  whatsapp?: string;
  name?: string;
  isActive: boolean;
  agentType: "individual" | "agency";
  companyName?: string;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AgentLoginCredentials {
  email: string;
  password: string;
}

export interface AgentLoginResponse {
  token: string;
  agent: Agent;
}

export interface AgentAuthState {
  agent: Agent | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

class AgentAuthService {
  private static instance: AgentAuthService;
  private token: string | null = null;
  private agent: Agent | null = null;

  private constructor() {
    // Load token from localStorage on initialization
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("agent_auth_token");
      const agentData = localStorage.getItem("agent_data");
      if (agentData) {
        try {
          this.agent = JSON.parse(agentData);
        } catch (error) {
          console.error("Error parsing agent data:", error);
          this.clearAuth();
        }
      }
    }
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
      // Login doesn't need auth token - it's a public endpoint
      const response = (await apiClient.post(
        "/auth/agent/login",
        credentials
      )) as any;

      if (response.success) {
        const { token, agent } = response.data;

        // Store auth data
        this.setAuth(token, agent);

        return { token, agent };
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error: unknown) {
      // Handle specific error cases
      const axiosError = error as any;

      // Check for network/server errors first
      if (!axiosError.response) {
        throw new Error("שגיאת רשת. בדוק את החיבור לאינטרנט");
      }

      const statusCode = axiosError.response?.status;
      const errorData = axiosError.response?.data;

      // Handle specific HTTP status codes
      if (statusCode === 500) {
        throw new Error("שגיאת שרת. נסה שוב מאוחר יותר או פנה למנהל המערכת");
      }

      if (statusCode === 401) {
        const errorCode = errorData?.error?.code || errorData?.errorCode;

        if (errorCode === "AGENT_INVALID_CREDENTIALS") {
          throw new Error("אימייל או סיסמה לא נכונים");
        } else if (errorCode === "AGENT_ACCOUNT_DEACTIVATED") {
          throw new Error("החשבון שלך הושבת. פנה למנהל המערכת");
        } else {
          throw new Error("פרטי התחברות לא נכונים");
        }
      }

      if (statusCode === 400) {
        const errorCode = errorData?.error?.code || errorData?.errorCode;

        if (errorCode === "VALIDATION_MISSING_FIELDS") {
          throw new Error("נא למלא את כל השדות הנדרשים");
        } else if (errorCode === "VALIDATION_INVALID_FORMAT") {
          throw new Error("פורמט האימייל לא תקין");
        } else {
          throw new Error("פורמט הנתונים שגוי");
        }
      }

      throw new Error("שגיאה בהתחברות. נסה שוב מאוחר יותר");
    }
  }

  /**
   * Logout agent
   */
  async logout(): Promise<void> {
    try {
      if (this.token) {
        // Logout needs auth token
        await apiClient.postAuth("/auth/agent/logout", {}, "agent");
      }
    } catch (error) {
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
      if (!this.token) return null;

      // Use getAuth with agent token type
      const response = (await apiClient.getAuth(
        "/auth/agent/me",
        {},
        "agent"
      )) as any;

      if (response.success) {
        const agent = response.data;
        this.agent = agent;
        this.setAuth(this.token, agent); // Update stored agent data
        return agent;
      }
    } catch (error) {
      // If token is invalid, clear auth
      this.clearAuth();
    }

    return null;
  }

  /**
   * Check if agent is authenticated
   */
  isAuthenticated(): boolean {
    return !!(this.token && this.agent);
  }

  /**
   * Get current agent
   */
  getCurrentAgentSync(): Agent | null {
    return this.agent;
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Set authentication data
   */
  private setAuth(token: string, agent: Agent): void {
    this.token = token;
    this.agent = agent;

    if (typeof window !== "undefined") {
      localStorage.setItem("agent_auth_token", token);
      localStorage.setItem("agent_data", JSON.stringify(agent));
    }
  }

  /**
   * Clear authentication data
   */
  private clearAuth(): void {
    this.token = null;
    this.agent = null;

    if (typeof window !== "undefined") {
      localStorage.removeItem("agent_auth_token");
      localStorage.removeItem("agent_data");
    }
  }
}

// Export singleton instance
export const agentAuthService = AgentAuthService.getInstance();
export default agentAuthService;
