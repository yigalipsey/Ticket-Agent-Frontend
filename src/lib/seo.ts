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
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.ticketagent.co.il";
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  return {
    title: `${title} | TicketAgent`,
    description,
    keywords:
      keywords ||
      "כרטיסים, כדורגל, משחקים, ליגות, קבוצות, אצטדיונים, כרטיסים לחו\"ל",
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

// Predefined SEO configurations for common pages - UPDATED MARKETING VERSION
export const seoConfigs = {
  home: {
    title: "כל מי שמוכר כרטיסים למשחק שלך במקום אחד",
    description:
      "זירת הכרטיסים המרכזית למשחקי כדורגל. פלטפורמה אחת המרכזת עבורכם את כל מי שמוכר כרטיסים למשחק שלכם, עם מגוון הצעות מהספקים המובילים בעולם.",
    keywords:
      "כרטיסים לכדורגל, ליגה אנגלית, ליגה ספרדית, ליגת האלופות, כרטיסים למשחקים, ספקי כרטיסים, טיקטאג'נט",
  },
  leagues: {
    title: "ליגות כדורגל מובילות",
    description:
      "גלו את כל הליגות והמשחקים המבוקשים ביותר. ריכוז אפשרויות ל-Premier League, La Liga, Bundesliga וליגות נוספות ברחבי העולם.",
    keywords:
      "ליגות כדורגל, Premier League, La Liga, Bundesliga, Serie A, ליגת האלופות, כרטיסים לליגות",
  },
  teams: {
    title: "כרטיסים לקבוצות המובילות",
    description:
      "כל אפשרויות הצפייה בקבוצות הגדולות בעולם: Real Madrid, Barcelona, Manchester United ועוד. כל מי שמוכר כרטיסים לקבוצה שלכם במקום אחד.",
    keywords:
      "כרטיסים לריאל מדריד, כרטיסים לברצלונה, כרטיסים למנצ'סטר יונייטד, ליברפול, באיירן מינכן, כרטיסים לקבוצות",
  },
  fixtures: {
    title: "כרטיסים למשחקי כדורגל",
    description:
      "מצאו את כל מי שמוכר כרטיסים למשחק שבחרתם. ריכוז הצעות מגוון מכל הספקים המובילים להזמנה בטוחה בראש שקט.",
    keywords:
      "משחקי כדורגל, כרטיסים למשחק, קניית כרטיסים, ספקי כרטיסים, כדורגל בחו\"ל, סופר קלאסיקו",
  },
  venues: {
    title: "כרטיסים באצטדיונים הגדולים",
    description:
      "מתכננים ביקור ב-Wembley, Camp Nou או Santiago Bernabeu? ריכזנו עבורכם את כל מי שמוכר כרטיסים למשחקים באצטדיונים המובילים.",
    keywords:
      "אצטדיוני כדורגל, Wembley, Camp Nou, Santiago Bernabeu, Old Trafford, Anfield, כרטיסים לאצטדיון",
  },
  search: {
    title: "חיפוש כרטיסים למשחקי כדורגל",
    description:
      "חפשו כרטיסים למשחק שלכם וקבלו ריכוז של כל הספקים והאפשרויות במקום אחד.",
    keywords: "חיפוש כרטיסים, כדורגל, מציאת ספקים, כרטיסים למשחק",
  },
  about: {
    title: "אודות TicketAgent",
    description:
      "TicketAgent - זירת הכרטיסים המרכזית המאפשרת לכם למצוא את כל מי שמוכר כרטיסים למשחקי כדורגל בפלטפורמה אחת חכמה.",
    keywords: "אודות, TicketAgent, מי אנחנו, פלטפורמת כרטיסים",
  },
  contact: {
    title: "צור קשר",
    description: "צרו קשר עם צוות TicketAgent לקבלת עזרה ומידע על אפשרויות הכרטיסים שלכם.",
    keywords: "צור קשר, שירות לקוחות, תמיכה, TicketAgent",
  },
};

// Generate structured data for different page types
export function generateStructuredData(
  type: string,
  data: Record<string, unknown>
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.ticketagent.co.il";

  switch (type) {
    case "organization":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "TicketAgent",
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: "זירת הכרטיסים המרכזית למשחקי כדורגל",
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
        description: "כל מי שמוכר כרטיסים למשחק שלך במקום אחד",
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

export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.ticketagent.co.il";

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