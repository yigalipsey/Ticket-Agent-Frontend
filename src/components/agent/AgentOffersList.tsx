"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { OfferService } from "@/services";
import { OfferResponse } from "@/services/offerService";
import FixtureCard from "@/components/fixture/FixtureCard";
import type { Fixture } from "@/types";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

export default function AgentOffersList() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [offerToDelete, setOfferToDelete] = useState<string | null>(null);

  // Use TanStack Query to fetch offers
  const {
    data: offers = [],
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["agentOffers"],
    queryFn: async () => {
      const response = await OfferService.getAgentOffers({
        limit: 100,
        sortBy: "createdAt",
        sortOrder: "desc",
      });

      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || "Failed to fetch offers");
    },
  });

  // Delete mutation with optimistic update
  const deleteMutation = useMutation({
    mutationFn: async (offerId: string) => {
      console.log(
        "%c[AGENT OFFERS] 🗑️ Delete mutation started",
        "color: #f59e0b; font-weight: bold; font-size: 12px;",
        { offerId }
      );

      const result = await OfferService.deleteOffer(offerId);
      if (!result.success) {
        throw new Error(result.error || "Failed to delete offer");
      }
      return offerId;
    },
    onSuccess: (deletedId) => {
      console.log(
        "%c[AGENT OFFERS] ✅ Delete mutation succeeded, updating cache",
        "color: #10b981; font-weight: bold; font-size: 12px;",
        { deletedId }
      );

      // Optimistically update the cache - remove deleted offer immediately
      queryClient.setQueryData<OfferResponse[]>(["agentOffers"], (old) => {
        if (!old) return [];
        const filtered = old.filter(
          (offer) => offer.id !== deletedId && offer._id !== deletedId
        );

        console.log(
          "%c[AGENT OFFERS] 📊 Cache updated",
          "color: #3b82f6; font-weight: bold; font-size: 12px;",
          {
            before: old.length,
            after: filtered.length,
            deletedId,
          }
        );

        return filtered;
      });
    },
    onError: (error) => {
      console.error(
        "%c[AGENT OFFERS] ❌ Delete mutation failed",
        "color: #ef4444; font-weight: bold; font-size: 12px;",
        { error }
      );
      alert(error.message || "שגיאה במחיקת ההצעה");
    },
  });

  const normalizedSearch = search.trim().toLowerCase();

  const filteredOffers = useMemo(() => {
    if (!normalizedSearch) return offers;
    return offers.filter((offer) => {
      const home = offer.fixture?.homeTeam?.name?.toLowerCase() || "";
      const away = offer.fixture?.awayTeam?.name?.toLowerCase() || "";
      const league =
        offer.fixture?.league?.nameHe?.toLowerCase() ||
        offer.fixture?.league?.name?.toLowerCase() ||
        "";
      const venue =
        offer.fixture?.venue?.name?.toLowerCase() ||
        offer.fixture?.venue?.city?.toLowerCase() ||
        "";
      return (
        home.includes(normalizedSearch) ||
        away.includes(normalizedSearch) ||
        league.includes(normalizedSearch) ||
        venue.includes(normalizedSearch)
      );
    });
  }, [offers, normalizedSearch]);

  const mapOfferToFixture = (offer: OfferResponse): Fixture => {
    const baseId =
      (offer.fixtureId as string) ||
      (offer.id as string) ||
      (offer._id as string) ||
      "";

    const homeName = offer.fixture?.homeTeam?.name || "קבוצת בית";
    const awayName = offer.fixture?.awayTeam?.name || "קבוצת חוץ";

    const fixture = {
      id: baseId,
      _id: baseId,
      slug: baseId,
      homeTeam: {
        name: homeName,
        slug: "",
        country: "",
        logoUrl: offer.fixture?.homeTeam?.logoUrl || "",
      },
      awayTeam: {
        name: awayName,
        slug: "",
        country: "",
        logoUrl: offer.fixture?.awayTeam?.logoUrl || "",
      },
      venue: {
        slug: "",
        name: offer.fixture?.venue?.name,
        city: offer.fixture?.venue?.city,
        country: "",
        capacity: 0,
        surface: "grass",
      },
      league: {
        _id: "",
        leagueId: 0,
        name: offer.fixture?.league?.name || "",
        nameHe:
          offer.fixture?.league?.nameHe || offer.fixture?.league?.name || "",
        slug: "",
        country: "",
        countryHe: "",
        logoUrl: "",
        type: "",
        isPopular: false,
      },
      date: offer.fixture?.date || "",
      time: "",
      status: "scheduled",
      offers: [],
      lowestPrice: offer.price,
      totalOffers: 1,
      minPrice: {
        amount: offer.price,
        currency: offer.currency,
        updatedAt: offer.createdAt || new Date().toISOString(),
      },
    } as Fixture;

    return fixture;
  };

  const fixtures = useMemo(() => {
    return filteredOffers.map((offer, idx) => {
      // Try to get offerId from multiple possible fields
      // Backend returns 'id' field via formatOfferForResponse
      const offerId = (offer.id as string) || (offer._id as string) || "";

      if (!offerId && idx === 0) {
        // Log only first offer to avoid spam
        console.error("No offerId found in offer:", {
          offerKeys: Object.keys(offer),
          id: offer.id,
          _id: offer._id,
          fullOffer: offer,
        });
      }

      return {
        fixture: mapOfferToFixture(offer),
        offerId,
        fixtureId: offer.fixtureId,
      };
    });
  }, [filteredOffers]);

  const groupedFixtures = useMemo(() => {
    const groups = new Map<
      string,
      {
        name: string;
        fixtures: {
          fixture: Fixture;
          offerId: string | undefined;
          fixtureId: string | undefined;
        }[];
      }
    >();

    fixtures.forEach((item) => {
      const leagueName =
        item.fixture.league?.nameHe || item.fixture.league?.name || "שונות";
      if (!groups.has(leagueName)) {
        groups.set(leagueName, { name: leagueName, fixtures: [] });
      }
      groups.get(leagueName)?.fixtures.push(item);
    });

    return Array.from(groups.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [fixtures]);

  const handleDeleteOffer = (offerId: string) => {
    setOfferToDelete(offerId);
  };

  const confirmDelete = () => {
    if (offerToDelete) {
      deleteMutation.mutate(offerToDelete);
      setOfferToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">טוען הצעות...</p>
      </div>
    );
  }

  if (queryError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">
          {queryError instanceof Error
            ? queryError.message
            : "שגיאה בטעינת ההצעות"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="max-w-md mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="חפש הצעה לפי קבוצה, ליגה או אצטדיון..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      {fixtures.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">לא נמצאו הצעות</p>
        </div>
      ) : (
        <div className="space-y-8">
          {groupedFixtures.map((group) => (
            <div key={group.name} className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 border-r-4 border-primary pr-3">
                {group.name}
              </h2>
              <div className="flex flex-col gap-4 md:gap-0 md:bg-white md:border md:border-gray-200 md:rounded-lg md:overflow-hidden">
                {group.fixtures.map((item, index) => {
                  const offerId = item.offerId;

                  const handleEdit = () => {
                    if (offerId) {
                      // Data is already in TanStack Query cache, no need to store
                      router.push(`/agent/edit-offer/${offerId}`);
                    } else {
                      console.warn("No offerId found for edit");
                    }
                  };

                  const handleDelete = () => {
                    if (offerId) {
                      handleDeleteOffer(offerId);
                    } else {
                      console.warn("No offerId found for delete");
                    }
                  };

                  return (
                    <FixtureCard
                      key={offerId || index}
                      fixture={item.fixture}
                      showOffers={true}
                      showVenue={true}
                      mode="agent-manage"
                      variant="horizontal"
                      onEditOffer={handleEdit}
                      onDeleteOffer={handleDelete}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmationModal
        isOpen={!!offerToDelete}
        onClose={() => setOfferToDelete(null)}
        onConfirm={confirmDelete}
        title="האם למחוק את ההצעה?"
        description=""
        confirmText="מחק הצעה"
        cancelText="ביטול"
        isDestructive={true}
      />
    </div>
  );
}
