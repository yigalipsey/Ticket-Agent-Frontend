"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import agentAuthService, {
  Agent,
  AgentLoginCredentials,
} from "@/services/agentAuthService";

export interface UseAgentAuthReturn {
  agent: Agent | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AgentLoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshAgent: () => Promise<void>;
}

export function useAgentAuth(): UseAgentAuthReturn {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);

        // Get current agent from service
        const currentAgent = agentAuthService.getCurrentAgentSync();
        const currentToken = agentAuthService.getToken();

        if (currentAgent && currentToken) {
          // Use cached agent data, no need to verify on every page load
          setAgent(currentAgent);
          setToken(currentToken);
          setIsAuthenticated(true);
        } else {
          setAgent(null);
          setToken(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Agent auth initialization error:", error);
        setAgent(null);
        setToken(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (credentials: AgentLoginCredentials) => {
    try {
      setIsLoading(true);
      const { token: newToken, agent: newAgent } = await agentAuthService.login(
        credentials
      );

      setAgent(newAgent);
      setToken(newToken);
      setIsAuthenticated(true);
    } catch (error) {
      throw error; // Re-throw to let component handle it
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await agentAuthService.logout();

      setAgent(null);
      setToken(null);
      setIsAuthenticated(false);

      // Redirect to login page
      router.push("/agent/login");
    } catch (error) {
      console.error("Agent logout error:", error);
      // Even if logout fails on server, clear local state
      setAgent(null);
      setToken(null);
      setIsAuthenticated(false);
      router.push("/agent/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const refreshAgent = useCallback(async () => {
    try {
      const freshAgent = await agentAuthService.getCurrentAgent();
      if (freshAgent) {
        setAgent(freshAgent);
      } else {
        // Agent session expired
        setAgent(null);
        setToken(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Refresh agent error:", error);
      setAgent(null);
      setToken(null);
      setIsAuthenticated(false);
    }
  }, []);

  return {
    agent,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshAgent,
  };
}
