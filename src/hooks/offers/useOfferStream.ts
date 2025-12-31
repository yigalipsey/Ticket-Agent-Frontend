'use client';

import { useState, useEffect } from 'react';
import OfferService, { type OfferResponse } from '@/services/offerService';

interface Fixture {
    _id?: string;
    date?: string;
    homeTeam?: {
        name?: string;
        logoUrl?: string;
    };
    awayTeam?: {
        name?: string;
        logoUrl?: string;
    };
    venue?: {
        name?: string;
        city?: string;
    };
    league?: {
        name?: string;
    };
    homeTeamName?: string;
    awayTeamName?: string;
}

interface UseOfferStreamResult {
    fixture: Fixture | null;
    offers: OfferResponse[];
    isLoading: boolean;
    progress: number;
    error: string | null;
    summary: {
        total: number;
        agents: number;
        suppliers: number;
        errors: number;
    } | null;
}

/**
 * React Hook for streaming offers using Server-Sent Events
 */
export function useOfferStream(fixtureId: string | null): UseOfferStreamResult {
    const [fixture, setFixture] = useState<Fixture | null>(null);
    const [offers, setOffers] = useState<OfferResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalChunks, setTotalChunks] = useState<number>(0);
    const [currentChunks, setCurrentChunks] = useState<number>(0);
    const [summary, setSummary] = useState<{
        total: number;
        agents: number;
        suppliers: number;
        errors: number;
    } | null>(null);

    // Calculate progress (0-100)
    const progress = totalChunks > 0
        ? Math.min(95, Math.ceil((currentChunks / totalChunks) * 100))
        : isLoading ? 15 : 100;

    useEffect(() => {
        if (!fixtureId) {
            setIsLoading(false);
            return;
        }

        console.log('🌊 [SSE] Starting stream for fixture:', fixtureId);
        setIsLoading(true);
        setError(null);
        setOffers([]);
        setFixture(null);
        setTotalChunks(0);
        setCurrentChunks(0);

        const cleanup = OfferService.streamOffersByFixture(fixtureId, {
            onMetadata: (data) => {
                setTotalChunks(data.totalChunks);
            },

            onFixture: (fixtureData) => {
                console.log('📍 [SSE] Received fixture:', fixtureData);
                setFixture(fixtureData);
                setCurrentChunks((prev) => prev + 1);
            },

            onOffers: (data) => {
                console.log('📦 [SSE] Received batch:', data.count, 'offers from', data.source);
                setOffers((prev) => [...prev, ...data.offers]);
                setCurrentChunks((prev) => prev + 1);
            },

            onOffer: (data) => {
                console.log('🎫 [SSE] Received offer:', data.offer.id, 'from', data.source);
                setOffers((prev) => [...prev, data.offer]);
                setCurrentChunks((prev) => prev + 1);
            },

            onError: (errorData) => {
                console.error('❌ [SSE] Error:', errorData.message);
                setCurrentChunks((prev) => prev + 1);

                if (errorData.fatal) {
                    setError(errorData.message);
                    setIsLoading(false);
                }
            },

            onComplete: (summaryData) => {
                console.log('✅ [SSE] Complete! Total:', summaryData.total);
                setSummary(summaryData);
                setIsLoading(false);
                setCurrentChunks(1);
                setTotalChunks(1);
            },
        });

        return () => {
            console.log('🧹 [SSE] Cleaning up stream for fixture:', fixtureId);
            cleanup();
        };
    }, [fixtureId]);

    return {
        fixture,
        offers,
        isLoading,
        progress: isLoading ? progress : 100,
        error,
        summary,
    };
}
