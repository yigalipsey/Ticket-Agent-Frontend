"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import agentAuthService from "@/services/agentAuthService";
import { Agent, AgentLoginCredentials } from "@/types";

interface AgentAuthContextType {
  agent: Agent | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AgentLoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshAgent: () => Promise<void>;
}

const AgentAuthContext = createContext<AgentAuthContextType | undefined>(
  undefined
);

export function AgentAuthProvider({ children }: { children: React.ReactNode }) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state once
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const currentAgent = await agentAuthService.getCurrentAgent();

        if (currentAgent) {
          setAgent(currentAgent);
          setIsAuthenticated(true);
        } else {
          setAgent(null);
          setIsAuthenticated(false);
        }
      } catch {
        setAgent(null);
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
      const { agent: newAgent } = await agentAuthService.login(credentials);

      setAgent(newAgent);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await agentAuthService.logout();

      setAgent(null);
      setIsAuthenticated(false);
      router.push("/agent/login");
    } catch {
      setAgent(null);
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
        setIsAuthenticated(true);
      } else {
        setAgent(null);
        setIsAuthenticated(false);
      }
    } catch {
      setAgent(null);
      setIsAuthenticated(false);
    }
  }, []);

  const value: AgentAuthContextType = {
    agent,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshAgent,
  };

  return (
    <AgentAuthContext.Provider value={value}>
      {children}
    </AgentAuthContext.Provider>
  );
}

export function useAgentAuth(): AgentAuthContextType {
  const context = useContext(AgentAuthContext);
  if (context === undefined) {
    throw new Error("useAgentAuth must be used within an AgentAuthProvider");
  }
  return context;
}
