import type { Metadata } from "next";
import { Inter, Heebo, Rubik } from "next/font/google";
import { Providers } from "./providers";
import { Navbar, Footer } from "@/components/ui";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const heebo = Heebo({
  subsets: ["hebrew"],
  variable: "--font-heebo",
});

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "TicketAgent - השוואת כרטיסים למשחקי כדורגל",
  description:
    "הרכיבו את החבילה המושלמת למשחקים שאתם אוהבים. השוואת הצעות כרטיסים למשחקי כדורגל מכל העולם.",
  keywords: "כרטיסים, כדורגל, משחקים, ליגות, קבוצות, אצטדיונים, השוואת מחירים",
  authors: [{ name: "TicketAgent Team" }],
  creator: "TicketAgent",
  publisher: "TicketAgent",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ticketagent.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TicketAgent - השוואת כרטיסים למשחקי כדורגל",
    description: "הרכיבו את החבילה המושלמת למשחקים שאתם אוהבים",
    url: "https://ticketagent.com",
    siteName: "TicketAgent",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TicketAgent - השוואת כרטיסים למשחקי כדורגל",
      },
    ],
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TicketAgent - השוואת כרטיסים למשחקי כדורגל",
    description: "הרכיבו את החבילה המושלמת למשחקים שאתם אוהבים",
    images: ["/og-image.jpg"],
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
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${inter.variable} ${heebo.variable} ${rubik.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0A1F44" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`min-h-screen bg-gray-50 text-gray-900 font-rubik`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
