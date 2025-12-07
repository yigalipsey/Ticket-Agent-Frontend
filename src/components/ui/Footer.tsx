import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#092274] to-[#061850] text-white relative overflow-hidden">
      {/* Soccer Net Background Pattern (Hexagons only, Mesh-like) */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23ffffff' stroke-width='1' stroke-opacity='1' /%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px", // Smaller size for tighter mesh
          backgroundRepeat: "repeat",
          // Radial gradient mask that fades out faster towards the edges
          // Started fading earlier (40%) and faster to 80%
          maskImage:
            "radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 80%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1 - Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4">קישורים מהירים</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link href="/leagues" className="hover:opacity-70 transition">
                  ליגות
                </Link>
              </li>
              <li>
                <Link href="/teams" className="hover:opacity-70 transition">
                  קבוצות
                </Link>
              </li>
              <li>
                <Link href="/fixtures" className="hover:opacity-70 transition">
                  משחקים
                </Link>
              </li>
              <li>
                <Link href="/venues" className="hover:opacity-70 transition">
                  אצטדיונים
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Legal & Support */}
          <div>
            <h4 className="text-base font-semibold mb-4">מידע משפטי</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link href="/privacy" className="hover:opacity-70 transition">
                  מדיניות פרטיות
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:opacity-70 transition">
                  תנאי שימוש
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="hover:opacity-70 transition"
                >
                  הצהרת נגישות
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact & Social */}
          <div>
            <h4 className="text-base font-semibold mb-4">צור קשר</h4>
            <ul className="space-y-2 text-sm opacity-90 mb-6">
              <li>
                <a
                  href="mailto:info@ticketagent.com"
                  className="hover:opacity-70 transition"
                >
                  info@ticketagent.com
                </a>
              </li>
              <li>
                <a
                  href="tel:0533350910"
                  className="hover:opacity-70 transition"
                >
                  053-335-0910
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                aria-label="פייסבוק"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                aria-label="טוויטר"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                aria-label="אינסטגרם"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                aria-label="יוטיוב"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mb-8 p-4 bg-white/5 rounded-lg text-xs text-gray-300 text-center leading-relaxed max-w-4xl mx-auto border border-white/5 backdrop-blur-sm">
          <p>
            האתר מציג מידע ומחירים מאתרים אחרים בלבד. אין לנו כל צד בעסקאות
            המתבצעות מול הספקים. המחירים המוצגים עשויים להיות שונים מהמחיר בפועל
            עקב אי עדכון בזמן. אנו עושים את מירב המאמצים שהעדכונים יתבצעו בזמן
            ובצורה מדויקת, אך ייתכנו פערים. השימוש באתר הוא באחריות המשתמש בלבד.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center hover:opacity-70 transition"
            >
              <div
                className="h-8 w-auto"
                style={{
                  filter: "brightness(0) invert(1)",
                }}
              >
                <Image
                  src="/logo.svg"
                  alt="TicketAgent"
                  width={200}
                  height={100}
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>

            {/* Copyright */}
            <p className="text-xs">
              &copy; {new Date().getFullYear()} TicketAgent. כל הזכויות שמורות.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
