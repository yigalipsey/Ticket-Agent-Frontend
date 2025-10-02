"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { OfferService } from "@/services";
import { Offer, OfferQuery, LoadingState } from "@/types";

export function useOffers(query: OfferQuery) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["offers", query],
    queryFn: () => OfferService.getOffers(query),
    enabled: !!query.fixtureId,
    staleTime: 2 * 60 * 1000, // 2 minutes - offers change frequently
    retry: 2,
  });

  useEffect(() => {
    setState({
      isLoading: isLoading || isFetching,
      error: error?.message,
    });
  }, [isLoading, isFetching, error]);

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    offers: data?.data || [],
    pagination: data?.pagination,
    total: data?.pagination?.total || 0,
    ...state,
    refresh,
  };
}

export function useOffersByFixture(
  fixtureId: string,
  query?: Omit<OfferQuery, "fixtureId">
) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["offers-by-fixture", fixtureId, query],
    queryFn: () => OfferService.getOffersByFixture(fixtureId, query),
    enabled: !!fixtureId,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });

  useEffect(() => {
    setState({
      isLoading: isLoading || isFetching,
      error: error?.message,
    });
  }, [isLoading, isFetching, error]);

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    offers: data?.data || [],
    pagination: data?.pagination,
    total: data?.pagination?.total || 0,
    ...state,
    refresh,
  };
}

export function useLowestOffer(fixtureId: string) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["lowest-offer", fixtureId],
    queryFn: () => OfferService.getLowestOffer(fixtureId),
    enabled: !!fixtureId,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });

  useEffect(() => {
    setState({
      isLoading,
      error: error?.message,
    });
  }, [isLoading, error]);

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    offer: data,
    ...state,
    refresh,
  };
}

export function useVerifiedOffers(
  fixtureId: string,
  query?: Omit<OfferQuery, "fixtureId">
) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["verified-offers", fixtureId, query],
    queryFn: () => OfferService.getVerifiedOffers(fixtureId, query),
    enabled: !!fixtureId,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });

  useEffect(() => {
    setState({
      isLoading,
      error: error?.message,
    });
  }, [isLoading, error]);

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    offers: data?.data || [],
    pagination: data?.pagination,
    total: data?.pagination?.total || 0,
    ...state,
    refresh,
  };
}

export function useOffersByCategory(
  fixtureId: string,
  category: Offer["category"],
  query?: Omit<OfferQuery, "fixtureId">
) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["offers-by-category", fixtureId, category, query],
    queryFn: () => OfferService.getOffersByCategory(fixtureId, category, query),
    enabled: !!fixtureId && !!category,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });

  useEffect(() => {
    setState({
      isLoading,
      error: error?.message,
    });
  }, [isLoading, error]);

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    offers: data?.data || [],
    pagination: data?.pagination,
    total: data?.pagination?.total || 0,
    ...state,
    refresh,
  };
}

export function usePriceRange(fixtureId: string) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["price-range", fixtureId],
    queryFn: () => OfferService.getPriceRange(fixtureId),
    enabled: !!fixtureId,
    staleTime: 5 * 60 * 1000, // 5 minutes - price range changes less frequently
    retry: 2,
  });

  useEffect(() => {
    setState({
      isLoading,
      error: error?.message,
    });
  }, [isLoading, error]);

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    priceRange: data || { min: 0, max: 0 },
    ...state,
    refresh,
  };
}
