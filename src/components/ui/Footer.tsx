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
    <footer className="bg-[#092274] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-white" />
              ניווט מהיר
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/leagues"
                  className="flex items-center gap-2 hover:opacity-80"
                >
                  <span className="text-white">›</span>
                  ליגות
                </Link>
              </li>
              <li>
                <Link
                  href="/teams"
                  className="flex items-center gap-2 hover:opacity-80"
                >
                  <span className="text-white">›</span>
                  קבוצות
                </Link>
              </li>
              <li>
                <Link
                  href="/fixtures"
                  className="flex items-center gap-2 hover:opacity-80"
                >
                  <span className="text-white">›</span>
                  משחקים
                </Link>
              </li>
              <li>
                <Link
                  href="/venues"
                  className="flex items-center gap-2 hover:opacity-80"
                >
                  <span className="text-white">›</span>
                  אצטדיונים
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - About */}
          <div>
            <h4 className="text-lg font-bold mb-4">אודות</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="flex items-center gap-2 hover:opacity-80"
                >
                  <span className="text-white">›</span>
                  מי אנחנו
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 hover:opacity-80"
                >
                  <span className="text-white">›</span>
                  צור קשר
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="flex items-center gap-2 hover:opacity-80"
                >
                  <span className="text-white">›</span>
                  קריירה
                </Link>
              </li>
              <li>
                <Link
                  href="/partnerships"
                  className="flex items-center gap-2 hover:opacity-80"
                >
                  <span className="text-white">›</span>
                  שותפויות
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h4 className="text-lg font-bold mb-4">תמיכה</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/help"
                  className="flex items-center gap-2 hover:opacity-80"
                >
                  <span className="text-white">›</span>
                  מרכז עזרה
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="flex items-center gap-2 hover:opacity-80"
                >
                  <span className="text-white">›</span>
                  שאלות נפוצות
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="flex items-center gap-2 hover:opacity-80"
                >
                  <span className="text-white">›</span>
                  מדיניות פרטיות
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="flex items-center gap-2 hover:opacity-80"
                >
                  <span className="text-white">›</span>
                  תנאי שימוש
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">צור קשר</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white" />
                <a
                  href="mailto:info@ticketagent.com"
                  className="hover:opacity-80"
                >
                  info@ticketagent.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white" />
                <a href="tel:+972123456789" className="hover:opacity-80">
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
                  className="w-9 h-9 rounded-full bg-white/20 hover:opacity-80 flex items-center justify-center transition"
                  aria-label="פייסבוק"
                >
                  <Facebook className="w-4 h-4 text-white" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/20 hover:opacity-80 flex items-center justify-center transition"
                  aria-label="טוויטר"
                >
                  <Twitter className="w-4 h-4 text-white" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/20 hover:opacity-80 flex items-center justify-center transition"
                  aria-label="אינסטגרם"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/20 hover:opacity-80 flex items-center justify-center transition"
                  aria-label="יוטיוב"
                >
                  <Youtube className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/30 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">TicketAgent</h3>
                <p className="text-xs text-white">
                  השוואת כרטיסים למשחקי כדורגל
                </p>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-sm text-white">
              &copy; {new Date().getFullYear()} TicketAgent. כל הזכויות שמורות.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
