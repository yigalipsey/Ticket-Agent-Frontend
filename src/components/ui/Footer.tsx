"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 w-full max-w-[95%] mx-auto">
          {/* עמודה 1 - אודות TicketAgent */}
          <div className="text-center md:text-right">
            <h4 className="text-xl font-bold mb-6">אודות TicketAgent</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/leagues"
                  className="hover:text-blue-300 transition-colors"
                >
                  ליגות
                </Link>
              </li>
              <li>
                <Link
                  href="/teams"
                  className="hover:text-blue-300 transition-colors"
                >
                  קבוצות
                </Link>
              </li>
              <li>
                <Link
                  href="/fixtures"
                  className="hover:text-blue-300 transition-colors"
                >
                  משחקים
                </Link>
              </li>
              <li>
                <Link
                  href="/venues"
                  className="hover:text-blue-300 transition-colors"
                >
                  אצטדיונים
                </Link>
              </li>
              <li>
                <Link
                  href="/offers"
                  className="hover:text-blue-300 transition-colors"
                >
                  הצעות
                </Link>
              </li>
            </ul>
          </div>

          {/* עמודה 2 - בלוג */}
          <div className="text-center md:text-right">
            <h4 className="text-xl font-bold mb-6">בלוג</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/blog/upcoming-matches"
                  className="hover:text-blue-300 transition-colors"
                >
                  משחקים קרובים
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/team-news"
                  className="hover:text-blue-300 transition-colors"
                >
                  חדשות קבוצות
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/league-updates"
                  className="hover:text-blue-300 transition-colors"
                >
                  עדכוני ליגות
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/venue-guides"
                  className="hover:text-blue-300 transition-colors"
                >
                  מדריכי אצטדיונים
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/ticket-tips"
                  className="hover:text-blue-300 transition-colors"
                >
                  טיפים לרכישת כרטיסים
                </Link>
              </li>
            </ul>
          </div>

          {/* עמודה 3 - מחירים */}
          <div className="text-center md:text-right">
            <h4 className="text-xl font-bold mb-6">מחירים</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/pricing/premium"
                  className="hover:text-blue-300 transition-colors"
                >
                  מנוי פרימיום
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing/group"
                  className="hover:text-blue-300 transition-colors"
                >
                  כרטיסי קבוצה
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing/season"
                  className="hover:text-blue-300 transition-colors"
                >
                  כרטיסי עונה
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing/vip"
                  className="hover:text-blue-300 transition-colors"
                >
                  חבילות VIP
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing/corporate"
                  className="hover:text-blue-300 transition-colors"
                >
                  חבילות עסקיות
                </Link>
              </li>
            </ul>
          </div>

          {/* עמודה 4 - יצירת קשר */}
          <div className="text-center md:text-right">
            <h4 className="text-xl font-bold mb-6">יצירת קשר</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/contact/support"
                  className="hover:text-blue-300 transition-colors"
                >
                  תמיכה טכנית
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/sales"
                  className="hover:text-blue-300 transition-colors"
                >
                  מכירות
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/partnerships"
                  className="hover:text-blue-300 transition-colors"
                >
                  שותפויות
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/media"
                  className="hover:text-blue-300 transition-colors"
                >
                  יחסי ציבור
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/careers"
                  className="hover:text-blue-300 transition-colors"
                >
                  קריירה
                </Link>
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
                <span className="text-2xl font-bold text-purple-900">T</span>
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
                aria-label="טוויטר"
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
                aria-label="פייסבוק"
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
                aria-label="אינטרגרם"
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
                aria-label="יוטיוב"
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
                aria-label="לינקדין"
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
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                מדיניות פרטיות
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                תנאי שימוש
              </Link>
              <Link
                href="/cookies"
                className="hover:text-white transition-colors"
              >
                מדיניות עוגיות
              </Link>
              <Link
                href="/sitemap"
                className="hover:text-white transition-colors"
              >
                מפת אתר
              </Link>
              <Link
                href="/investors"
                className="hover:text-white transition-colors"
              >
                משקיעים
              </Link>
            </div>
            <p>&copy; 2024 TicketAgent. כל הזכויות שמורות.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
