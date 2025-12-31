import React from "react";
import { notFound } from "next/navigation";
import FixtureOffersClient from "./FixtureOffersClient";
import FixtureService from "@/services/fixtureService";
import offerService from "@/services/offerService";
import { FixtureOfferHeader } from "@/components/offer/FixtureOfferHeader";

interface FixtureOffersPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
}

export default async function FixtureOffersPage({
  params,
  searchParams,
}: FixtureOffersPageProps) {
  const { slug } = await params;
  const { id: idFromQuery } = await searchParams;

  let fixtureId = idFromQuery;

  // 1. If no ID in query, resolve it from slug
  if (!fixtureId) {
    const idResult = await offerService.getFixtureIdBySlug(slug) as any;
    fixtureId = idResult?._id || idResult?.id;
  }

  if (!fixtureId) return notFound();

  // 2. Fetch full fixture details by ID
  const fixtureData = await FixtureService.getFixtureById(fixtureId);

  if (!fixtureData) return notFound();

  const homeName = fixtureData.homeTeam?.name || (fixtureData as any).homeTeamName || "";
  const awayName = fixtureData.awayTeam?.name || (fixtureData as any).awayTeamName || "";

  return (
    <div className="min-h-screen bg-white">
      {/* 3. Render Hero on the server */}
      <FixtureOfferHeader
        homeTeam={{
          name: homeName,
          logo: (fixtureData.homeTeam as any)?.logoUrl || (fixtureData.homeTeam as any)?.logo || ""
        }}
        awayTeam={{
          name: awayName,
          logo: (fixtureData.awayTeam as any)?.logoUrl || (fixtureData.awayTeam as any)?.logo || ""
        }}
        date={fixtureData.date || new Date().toISOString()}
        venue={{
          name: fixtureData.venue?.name || "אצטדיון",
          city: (fixtureData.venue as any)?.city
        }}
        league={{
          name: fixtureData.league?.name ?? "ליגה"
        }}
        totalOffers={0}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-8">
        <FixtureOffersClient
          slug={slug}
          initialFixtureId={fixtureId}
          initialFixtureData={fixtureData}
        />
      </main>
    </div>
  );
}
