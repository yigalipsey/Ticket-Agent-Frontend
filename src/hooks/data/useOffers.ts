"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { OfferService } from "@/services";
import { Offer, OfferQuery, LoadingState } from "@/types";

export function useOffersByFixture(
  fixtureId: string,
  query?: Omit<OfferQuery, "fixtureId">,
  options?: { enabled?: boolean }
) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["offers-by-fixture", fixtureId, query],
    queryFn: () => OfferService.getOffersByFixture(fixtureId, query),
    enabled: !!fixtureId && options?.enabled !== false,
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

  // תיקון מבנה הנתונים - אם data הוא object עם offers, נשתמש בו
  const offers =
    (data?.data as { offers?: Offer[]; pagination?: { total?: number } })
      ?.offers ||
    data?.data ||
    [];
  const pagination =
    (data?.data as { offers?: Offer[]; pagination?: { total?: number } })
      ?.pagination || data?.pagination;
  const total = pagination?.total || 0;

  // לוג לדיבוג
  console.log("🔍 useOffersByFixture Debug:", {
    fixtureId,
    data,
    dataData: data?.data,
    dataDataLength: data?.data?.length,
    offers,
    offersLength: offers?.length,
    pagination,
    total,
    isLoading,
    error,
    enabled: !!fixtureId && options?.enabled !== false,
  });

  return {
    offers,
    pagination,
    total,
    ...state,
    refresh,
  };
}
