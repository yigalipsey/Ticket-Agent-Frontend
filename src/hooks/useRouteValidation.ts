"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface RouteValidationResult {
  isValid: boolean;
  isLoading: boolean;
  error: string | null;
}

interface RouteValidationOptions {
  validateFunction?: (pathname: string) => Promise<boolean>;
  timeout?: number;
}

export function useRouteValidation(options: RouteValidationOptions = {}): RouteValidationResult {
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const validateRoute = async () => {
      if (!options.validateFunction) {
        setIsValid(true);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const timeout = options.timeout || 5000;
        
        const validationPromise = options.validateFunction(pathname);
        const timeoutPromise = new Promise<boolean>((_, reject) => {
          setTimeout(() => reject(new Error('Validation timeout')), timeout);
        });

        const result = await Promise.race([validationPromise, timeoutPromise]);
        setIsValid(result);
        
        if (!result) {
          setError('Route not found or invalid');
        }
      } catch (err) {
        setIsValid(false);
        setError(err instanceof Error ? err.message : 'Validation failed');
      } finally {
        setIsLoading(false);
      }
    };

    validateRoute();
  }, [pathname, options.validateFunction, options.timeout]);

  return { isValid, isLoading, error };
}

// Specific validation functions for different route types
export const routeValidators = {
  league: async (pathname: string): Promise<boolean> => {
    const slug = pathname.split('/leagues/')[1]?.split('/')[0];
    if (!slug) return false;
    
    try {
      // Make API call to validate league exists
      const response = await fetch(`/api/leagues/${slug}`);
      return response.ok;
    } catch {
      return false;
    }
  },

  team: async (pathname: string): Promise<boolean> => {
    const slug = pathname.split('/teams/')[1]?.split('/')[0];
    if (!slug) return false;
    
    try {
      // Make API call to validate team exists
      const response = await fetch(`/api/teams/${slug}`);
      return response.ok;
    } catch {
      return false;
    }
  },

  fixture: async (pathname: string): Promise<boolean> => {
    const slug = pathname.split('/fixtures/')[1]?.split('/')[0];
    if (!slug) return false;
    
    try {
      // Make API call to validate fixture exists
      const response = await fetch(`/api/fixtures/${slug}`);
      return response.ok;
    } catch {
      return false;
    }
  },

  agentFixture: async (pathname: string): Promise<boolean> => {
    const id = pathname.split('/agent/fixtures/')[1]?.split('/')[0];
    if (!id) return false;
    
    try {
      // Make API call to validate fixture exists
      const response = await fetch(`/api/fixtures/${id}`);
      return response.ok;
    } catch {
      return false;
    }
  }
};
