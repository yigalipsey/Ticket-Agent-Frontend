import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  locale?: string;
  alternateLocales?: { [key: string]: string };
}

export function generateSEOMetadata({
  title,
  description,
  keywords,
  image = "/og-image.jpg",
  url,
  type = "website",
  locale = "he_IL",
  alternateLocales = { en: "/en" },
}: SEOProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ticketagent.com";
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  return {
    title: `${title} | TicketAgent`,
    description,
    keywords:
      keywords ||
      "כרטיסים, כדורגל, משחקים, ליגות, קבוצות, אצטדיונים, השוואת מחירים",
    authors: [{ name: "TicketAgent Team" }],
    creator: "TicketAgent",
    publisher: "TicketAgent",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullUrl,
      languages: alternateLocales,
    },
    openGraph: {
      title: `${title} | TicketAgent`,
      description,
      url: fullUrl,
      siteName: "TicketAgent",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | TicketAgent`,
      description,
      images: [fullImageUrl],
      creator: "@ticketagent",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_VERIFICATION_CODE,
    },
  };
}

// Predefined SEO configurations for common pages
export const seoConfigs = {
  home: {
    title: "השוואת כרטיסים למשחקי כדורגל",
    description:
      "הרכיבו את החבילה המושלמת למשחקים שאתם אוהבים. השוואת הצעות כרטיסים למשחקי כדורגל מכל העולם.",
    keywords:
      "כרטיסים, כדורגל, משחקים, ליגות, קבוצות, אצטדיונים, השוואת מחירים, Premier League, Champions League",
  },
  leagues: {
    title: "ליגות כדורגל",
    description:
      "גלו את כל הליגות הזמינות והמשחקים המרתקים ביותר מכל העולם. Premier League, La Liga, Bundesliga ועוד.",
    keywords:
      "ליגות, Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Champions League, Europa League",
  },
  teams: {
    title: "קבוצות כדורגל",
    description:
      "גלו את כל הקבוצות המובילות והמשחקים המרתקים ביותר מכל העולם. Real Madrid, Barcelona, Manchester United ועוד.",
    keywords:
      "קבוצות, Real Madrid, Barcelona, Manchester United, Liverpool, Bayern Munich, PSG, Juventus",
  },
  fixtures: {
    title: "משחקי כדורגל",
    description:
      "גלו את כל המשחקים הקרובים וההצעות הטובות ביותר לכרטיסים. השוואת מחירים והזמנה בטוחה.",
    keywords:
      "משחקים, כרטיסים, השוואת מחירים, הזמנה, Derbies, Clasico, El Clasico",
  },
  venues: {
    title: "אצטדיונים",
    description:
      "גלו את כל האצטדיונים המובילים והמשחקים המרתקים ביותר מכל העולם. Wembley, Camp Nou, Santiago Bernabeu ועוד.",
    keywords:
      "אצטדיונים, Wembley, Camp Nou, Santiago Bernabeu, Old Trafford, Anfield, Allianz Arena",
  },
  search: {
    title: "חיפוש כרטיסים",
    description:
      "חפשו כרטיסים למשחקי כדורגל מכל העולם. השוואת מחירים והזמנה בטוחה.",
    keywords: "חיפוש, כרטיסים, השוואת מחירים, הזמנה",
  },
  about: {
    title: "אודות TicketAgent",
    description:
      "למידע נוסף על TicketAgent - פלטפורמת השוואת כרטיסים למשחקי כדורגל המובילה בישראל.",
    keywords: "אודות, TicketAgent, פלטפורמה, השוואת כרטיסים",
  },
  contact: {
    title: "צור קשר",
    description: "צרו קשר עם צוות TicketAgent לקבלת עזרה ותמיכה.",
    keywords: "צור קשר, תמיכה, עזרה, TicketAgent",
  },
};

// Generate structured data for different page types
export function generateStructuredData(
  type: string,
  data: Record<string, unknown>
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ticketagent.com";

  switch (type) {
    case "organization":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "TicketAgent",
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: "פלטפורמת השוואת כרטיסים למשחקי כדורגל המובילה בישראל",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+972-XX-XXX-XXXX",
          contactType: "customer service",
          availableLanguage: ["Hebrew", "English"],
        },
        sameAs: [
          "https://www.facebook.com/ticketagent",
          "https://www.twitter.com/ticketagent",
          "https://www.instagram.com/ticketagent",
        ],
      };

    case "website":
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "TicketAgent",
        url: baseUrl,
        description: "השוואת כרטיסים למשחקי כדורגל מכל העולם",
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      };

    case "fixture":
      return {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        location: {
          "@type": "Place",
          name: data.venue?.name,
          address: data.venue?.address,
        },
        organizer: {
          "@type": "Organization",
          name: data.league?.name,
        },
        offers: (data.offers as Array<Record<string, unknown>>)?.map(
          (offer) => ({
            "@type": "Offer",
            price: offer.price,
            priceCurrency: offer.currency,
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: offer.agent?.name,
            },
          })
        ),
      };

    case "venue":
      return {
        "@context": "https://schema.org",
        "@type": "StadiumOrArena",
        name: data.name,
        description: data.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: data.address,
          addressLocality: data.city,
          addressCountry: data.country,
        },
        capacity: data.capacity,
        openingDate: data.opened,
      };

    case "league":
      return {
        "@context": "https://schema.org",
        "@type": "SportsOrganization",
        name: data.name,
        description: data.description,
        sport: "Football",
        location: {
          "@type": "Country",
          name: data.country,
        },
      };

    default:
      return null;
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ticketagent.com";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}
