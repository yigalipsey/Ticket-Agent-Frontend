import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.ticketagent.co.il";

  // For now, just return static URLs without trying to fetch leagues from API
  // This prevents build errors when backend is not available

  // URLs סטטיים
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: {
          he: `${baseUrl}/he`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/leagues`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
      alternates: {
        languages: {
          he: `${baseUrl}/he/leagues`,
          en: `${baseUrl}/en/leagues`,
        },
      },
    },
    {
      url: `${baseUrl}/fixtures`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
      alternates: {
        languages: {
          he: `${baseUrl}/he/fixtures`,
          en: `${baseUrl}/en/fixtures`,
        },
      },
    },
    {
      url: `${baseUrl}/teams`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          he: `${baseUrl}/he/teams`,
          en: `${baseUrl}/en/teams`,
        },
      },
    },
    {
      url: `${baseUrl}/venues`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
      alternates: {
        languages: {
          he: `${baseUrl}/he/venues`,
          en: `${baseUrl}/en/venues`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          he: `${baseUrl}/he/about`,
          en: `${baseUrl}/en/about`,
        },
      },
    },
  ];

  return staticUrls;
}
