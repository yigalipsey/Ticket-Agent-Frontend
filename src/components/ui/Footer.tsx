import Link from "next/link";
import {
  Trophy,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              ניווט מהיר
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  href="/leagues"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="text-gray-500">›</span>
                  ליגות
                </Link>
              </li>
              <li>
                <Link
                  href="/teams"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="text-gray-500">›</span>
                  קבוצות
                </Link>
              </li>
              <li>
                <Link
                  href="/fixtures"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="text-gray-500">›</span>
                  משחקים
                </Link>
              </li>
              <li>
                <Link
                  href="/venues"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="text-gray-500">›</span>
                  אצטדיונים
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - About */}
          <div>
            <h4 className="text-lg font-bold mb-4">אודות</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="text-gray-500">›</span>
                  מי אנחנו
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="text-gray-500">›</span>
                  צור קשר
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="text-gray-500">›</span>
                  קריירה
                </Link>
              </li>
              <li>
                <Link
                  href="/partnerships"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="text-gray-500">›</span>
                  שותפויות
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h4 className="text-lg font-bold mb-4">תמיכה</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  href="/help"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="text-gray-500">›</span>
                  מרכז עזרה
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="text-gray-500">›</span>
                  שאלות נפוצות
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="text-gray-500">›</span>
                  מדיניות פרטיות
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="text-gray-500">›</span>
                  תנאי שימוש
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">צור קשר</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a
                  href="mailto:info@ticketagent.com"
                  className="hover:text-primary transition-colors"
                >
                  info@ticketagent.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a
                  href="tel:+972123456789"
                  className="hover:text-primary transition-colors"
                >
                  072-123-4567
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3">עקבו אחרינו</h5>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label="פייסבוק"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label="טוויטר"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label="אינסטגרם"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label="יוטיוב"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">TicketAgent</h3>
                <p className="text-xs text-gray-400">
                  השוואת כרטיסים למשחקי כדורגל
                </p>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} TicketAgent. כל הזכויות שמורות.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
