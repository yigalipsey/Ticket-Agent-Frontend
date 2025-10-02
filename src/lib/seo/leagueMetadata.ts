"use client";

import { getTranslations } from "next-intl/server";
import { League } from "@/types";
import type { Metadata } from "next";

/**
 * יוצר metadata דינמי עבור דפי ליגות
 * תואם SEO ומכיל תרגומים
 */
export async function generateLeagueMetadata(
  league: League,
  locale: string
): Promise<Metadata> {
  const t = await getTranslations({ locale });
  
  const leagueName = locale === "he" ? league.nameHe || league.name : league.name;
  const countryName = league.country;
  
  const title = `${leagueName} ${t("leagues.title")} | TicketAgent`;
  const description = `${t("leagues.viewFixtures")} ${leagueName} ${countryName} - ${league.season}. ${t("leagues.upcomingMatches")}, ${t("leagues.recentResults")} ועוד`;
  
  return {
    title,
    description,
    keywords: [
      leagueName,
      countryName,
      league.season,
      t("leagues.title"),
      t("leagues.upcomingMatches"),
      t("leagues.recentResults"),
      "football tickets",
      "כרטיסי כדורגל",
      "משחקי כדורגל",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
      images: [
        {
          url: league.logo || "/images/default-league.jpg",
          width: 1200,
          height: 630,
          alt: leagueName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [league.logo || "/images/default-league.jpg"],
    },
    alternates: {
      canonical: `/leagues/${league.slug}`,
      languages: {
        "he": `/he/leagues/${league.slug}`,
        "en": `/en/leagues/${league.slug}`,
      },
    },
  };
}

/**
 * יוצר metadata עבור דף הליגות הראשי
 */
export async function generateLeaguesPageMetadata(
  locale: string
): Promise<Metadata> {
  const t = await getTranslations({ locale });
  
  const title = `${t("leagues.title")} | TicketAgent`;
  const description = `${t("leagues.allLeagues")} - ${t("leagues.popularLeagues")}, ${t("leagues.activeLeagues")} ועוד. ${t("leagues.viewFixtures")} עבור כל ליגה`;
  
  return {
    title,
    description,
    keywords: [
      t("leagues.title"),
      t("leagues.allLeagues"),
      t("leagues.popularLeagues"),
      t("leagues.activeLeagues"),
      "football leagues",
      "ליגות כדורגל",
      "משחקי כדורגל",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
      images: [
        {
          url: "/images/leagues-banner.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/leagues-banner.jpg"],
    },
    alternates: {
      canonical: "/leagues",
      languages: {
        "he": "/he/leagues",
        "en": "/en/leagues",
      },
    },
  };
}
