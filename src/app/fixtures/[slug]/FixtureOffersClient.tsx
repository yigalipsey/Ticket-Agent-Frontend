'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOfferStream } from "@/hooks/offers/useOfferStream";
import { useFixtureById } from "@/hooks/fixture/useFixtureById";
import { FixtureOfferHeader } from "@/components/offer/FixtureOfferHeader";
import { OffersList } from "@/components/offer/OffersList";
import { OffersSkeleton } from "@/components/offer/OffersSkeleton";
import OfferService from "@/services/offerService";
import StreamLoader from "@/components/ui/StreamLoader";

interface FixtureOffersClientProps {
    slug: string;
    initialFixtureId: string | null;
    initialFixtureData?: any;
}

export default function FixtureOffersClient({
    slug,
    initialFixtureId,
    initialFixtureData,
}: FixtureOffersClientProps) {
    const router = useRouter();
    const [fixtureId, setFixtureId] = useState<string | null>(initialFixtureId);
    const [isResolvingSlug, setIsResolvingSlug] = useState(!initialFixtureId && !initialFixtureData);

    // Use SSE streaming hook with real-time progress
    const { fixture: streamFixture, offers, isLoading, progress, error } = useOfferStream(fixtureId);

    // Fetch fixture details immediately using ID (leverages TanStack Query cache)
    const { data: cachedFixture } = useFixtureById(fixtureId);

    // Use either stream, cache, or initial server data
    const fixture = streamFixture || cachedFixture || initialFixtureData;

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
                <div className="max-w-2xl space-y-4">
                    <h1 className="text-2xl font-bold text-red-900">שגיאה</h1>
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    const showContent = fixture !== null;
    const homeName = fixture?.homeTeam?.name || (fixture as any)?.homeTeamName || "";
    const awayName = fixture?.awayTeam?.name || (fixture as any)?.awayTeamName || "";

    return (
        <>
            {/* Constant Title and Loader Section */}
            <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-right min-h-[40px]">
                    {homeName && awayName ? `כרטיסים ${homeName} נגד ${awayName}` : ""}
                </h2>

                {isLoading && (
                    <div className="mb-6">
                        <StreamLoader progress={progress} />
                    </div>
                )}
            </div>

            {/* Content Area: Offers or Skeleton */}
            {offers.length > 0 ? (
                <OffersList
                    offers={offers}
                    homeTeam={{ name: homeName }}
                    awayTeam={{ name: awayName }}
                />
            ) : (isLoading || !showContent) ? (
                <div className="mt-4">
                    <OffersSkeleton />
                </div>
            ) : (
                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <p className="text-base font-medium text-yellow-900">
                        אין הצעות זמינות למשחק זה כרגע
                    </p>
                </div>
            )}
        </>
    );
}
