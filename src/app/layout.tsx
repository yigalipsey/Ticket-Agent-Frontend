import type { Metadata } from "next";
import { Inter, Heebo, Rubik } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Link from "next/link";
import { Providers } from "./providers";
import { Footer } from "@/components";
// import { LanguageToggle } from "@/components/ui";
// import { getHreflangUrls } from "@/lib/seo/canonicalUrls";
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
    languages: {
      he: "/he",
      en: "/en",
    },
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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  const { locale = "he" } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "he" ? "rtl" : "ltr"}
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
          <NextIntlClientProvider messages={messages}>
            <div className="flex flex-col min-h-screen">
              {/* Header */}
              <header className="bg-white shadow-soft border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                      <Link
                        href="/"
                        className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        TicketAgent
                      </Link>
                    </div>
                    <nav className="hidden md:flex space-x-6 space-x-reverse">
                      <Link
                        href="/"
                        className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                      >
                        בית
                      </Link>
                      <Link
                        href="/leagues"
                        className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                      >
                        ליגות
                      </Link>
                      <Link
                        href="/teams"
                        className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                      >
                        קבוצות
                      </Link>
                      <Link
                        href="/fixtures"
                        className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                      >
                        משחקים
                      </Link>
                      <Link
                        href="/venues"
                        className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                      >
                        אצטדיונים
                      </Link>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                      <button className="text-gray-700 hover:text-blue-600 transition-colors p-2">
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center space-x-4 space-x-reverse">
                      {/* <LanguageToggle /> */}
                    </div>
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <main className="flex-1">{children}</main>

              {/* Footer */}
              <footer className="bg-primary-dark text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 w-full max-w-[95%] mx-auto">
                    {/* עמודה 1 - אודות TicketAgent */}
                    <div className="text-center md:text-right">
                      <h4 className="text-xl font-bold mb-6">
                        אודות TicketAgent
                      </h4>
                      <ul className="space-y-3 text-sm">
                        <li>
                          <a
                            href="/leagues"
                            className="hover:text-blue-300 transition-colors"
                          >
                            ליגות
                          </a>
                        </li>
                        <li>
                          <a
                            href="/teams"
                            className="hover:text-blue-300 transition-colors"
                          >
                            קבוצות
                          </a>
                        </li>
                        <li>
                          <a
                            href="/fixtures"
                            className="hover:text-blue-300 transition-colors"
                          >
                            משחקים
                          </a>
                        </li>
                        <li>
                          <a
                            href="/venues"
                            className="hover:text-blue-300 transition-colors"
                          >
                            אצטדיונים
                          </a>
                        </li>
                        <li>
                          <a
                            href="/offers"
                            className="hover:text-blue-300 transition-colors"
                          >
                            הצעות
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* עמודה 2 - בלוג */}
                    <div className="text-center md:text-right">
                      <h4 className="text-xl font-bold mb-6">בלוג</h4>
                      <ul className="space-y-3 text-sm">
                        <li>
                          <a
                            href="/blog/upcoming-matches"
                            className="hover:text-blue-300 transition-colors"
                          >
                            משחקים קרובים
                          </a>
                        </li>
                        <li>
                          <a
                            href="/blog/team-news"
                            className="hover:text-blue-300 transition-colors"
                          >
                            חדשות קבוצות
                          </a>
                        </li>
                        <li>
                          <a
                            href="/blog/league-updates"
                            className="hover:text-blue-300 transition-colors"
                          >
                            עדכוני ליגות
                          </a>
                        </li>
                        <li>
                          <a
                            href="/blog/venue-guides"
                            className="hover:text-blue-300 transition-colors"
                          >
                            מדריכי אצטדיונים
                          </a>
                        </li>
                        <li>
                          <a
                            href="/blog/ticket-tips"
                            className="hover:text-blue-300 transition-colors"
                          >
                            טיפים לרכישת כרטיסים
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* עמודה 3 - מחירים */}
                    <div className="text-center md:text-right">
                      <h4 className="text-xl font-bold mb-6">מחירים</h4>
                      <ul className="space-y-3 text-sm">
                        <li>
                          <a
                            href="/pricing/premium"
                            className="hover:text-blue-300 transition-colors"
                          >
                            מנוי פרימיום
                          </a>
                        </li>
                        <li>
                          <a
                            href="/pricing/group"
                            className="hover:text-blue-300 transition-colors"
                          >
                            כרטיסי קבוצה
                          </a>
                        </li>
                        <li>
                          <a
                            href="/pricing/season"
                            className="hover:text-blue-300 transition-colors"
                          >
                            כרטיסי עונה
                          </a>
                        </li>
                        <li>
                          <a
                            href="/pricing/vip"
                            className="hover:text-blue-300 transition-colors"
                          >
                            חבילות VIP
                          </a>
                        </li>
                        <li>
                          <a
                            href="/pricing/corporate"
                            className="hover:text-blue-300 transition-colors"
                          >
                            חבילות עסקיות
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* עמודה 4 - יצירת קשר */}
                    <div className="text-center md:text-right">
                      <h4 className="text-xl font-bold mb-6">יצירת קשר</h4>
                      <ul className="space-y-3 text-sm">
                        <li>
                          <a
                            href="/contact/support"
                            className="hover:text-blue-300 transition-colors"
                          >
                            תמיכה טכנית
                          </a>
                        </li>
                        <li>
                          <a
                            href="/contact/sales"
                            className="hover:text-blue-300 transition-colors"
                          >
                            מכירות
                          </a>
                        </li>
                        <li>
                          <a
                            href="/contact/partnerships"
                            className="hover:text-blue-300 transition-colors"
                          >
                            שותפויות
                          </a>
                        </li>
                        <li>
                          <a
                            href="/contact/media"
                            className="hover:text-blue-300 transition-colors"
                          >
                            יחסי ציבור
                          </a>
                        </li>
                        <li>
                          <a
                            href="/contact/careers"
                            className="hover:text-blue-300 transition-colors"
                          >
                            קריירה
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* לוגו ומדיה חברתית */}
                  <div className="mt-16 pt-8 border-t border-blue-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      {/* לוגו */}
                      <div className="flex items-center mb-6 md:mb-0">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                          <span className="text-2xl font-bold text-purple-900">
                            T
                          </span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">TicketAgent</h3>
                          <p className="text-sm text-blue-200">
                            השוואת כרטיסים למשחקי כדורגל
                          </p>
                        </div>
                      </div>

                      {/* מדיה חברתית */}
                      <div className="flex space-x-6 space-x-reverse">
                        <a
                          href="#"
                          className="text-blue-200 hover:text-white transition-colors"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="text-blue-200 hover:text-white transition-colors"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="text-blue-200 hover:text-white transition-colors"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243s.122-.928.49-1.243c.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243s-.122.928-.49 1.243c-.369.315-.807.49-1.297.49z" />
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="text-blue-200 hover:text-white transition-colors"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="text-blue-200 hover:text-white transition-colors"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* שורה תחתונה */}
                  <div className="mt-8 pt-8 border-t border-blue-800">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-blue-200">
                      <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
                        <a
                          href="/privacy"
                          className="hover:text-white transition-colors"
                        >
                          מדיניות פרטיות
                        </a>
                        <a
                          href="/terms"
                          className="hover:text-white transition-colors"
                        >
                          תנאי שימוש
                        </a>
                        <a
                          href="/cookies"
                          className="hover:text-white transition-colors"
                        >
                          מדיניות עוגיות
                        </a>
                        <a
                          href="/sitemap"
                          className="hover:text-white transition-colors"
                        >
                          מפת אתר
                        </a>
                        <a
                          href="/investors"
                          className="hover:text-white transition-colors"
                        >
                          משקיעים
                        </a>
                      </div>
                      <p>&copy; 2024 TicketAgent. כל הזכויות שמורות.</p>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
