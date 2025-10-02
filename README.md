# TicketAgent Frontend

פרונט מודרני לאתר השוואת כרטיסים למשחקי כדורגל, בנוי עם Next.js 15, TypeScript, TailwindCSS ותמיכה מלאה בעברית ואנגלית.

## 🚀 תכונות עיקריות

- **Next.js 15** עם App Router
- **TypeScript** לקוד בטוח ומובנה
- **TailwindCSS** לעיצוב מודרני ורספונסיבי
- **תמיכה דו-לשונית** (עברית/אנגלית) עם next-intl
- **נגישות מלאה** (WCAG 2.1 AA)
- **SEO חכם** עם structured data
- **React Query** לניהול state ו-caching
- **רכיבים נגישים** עם Headless UI
- **עיצוב רספונסיבי** לכל המכשירים

## 🛠️ טכנולוגיות

### Core

- **Next.js 15** - React framework עם App Router
- **TypeScript** - Type safety ו-better DX
- **TailwindCSS** - Utility-first CSS framework
- **React 18** - Latest React features

### Internationalization

- **next-intl** - Internationalization עבור Next.js
- **RTL Support** - תמיכה מלאה בעברית

### State Management & Data Fetching

- **@tanstack/react-query** - Server state management
- **Axios** - HTTP client
- **Zod** - Schema validation

### UI & Accessibility

- **@headlessui/react** - Accessible UI components
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form management
- **date-fns** - Date manipulation

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📁 מבנה הפרויקט

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── leagues/           # Leagues pages
│   ├── teams/             # Teams pages
│   ├── fixtures/          # Fixtures pages
│   └── venues/            # Venues pages
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── fixture/          # Fixture-related components
│   ├── league/           # League-related components
│   ├── team/             # Team-related components
│   ├── venue/            # Venue-related components
│   ├── seo/              # SEO components
│   └── accessibility/    # Accessibility components
├── hooks/                # Custom React hooks
├── services/             # API services
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
└── i18n.ts              # Internationalization config

messages/                 # Translation files
├── he.json              # Hebrew translations
└── en.json              # English translations

public/                   # Static assets
├── logos/               # League and team logos
└── images/              # General images
```

## 🎨 עיצוב וצבעים

האתר משתמש בפלטת צבעים מותאמת אישית בהשראת SeatPick:

- **כחול כהה** (`#0A1F44`) - Primary
- **כחול בינוני** (`#1B3A6F`) - Secondary
- **סגול-כחול** (`#2F4B7C`) - Accent
- **לבן** (`#FFFFFF`) - Background
- **אפור בהיר** (`#F5F7FA`) - Light background
- **טקסט כהה** (`#1C1C1C`) - Text
- **הדגשה** (`#00BFFF`) - Highlight

## 🌐 תמיכה בשפות

- **עברית** (ברירת מחדל) - RTL
- **אנגלית** - LTR
- **מעבר אוטומטי** בין שפות
- **תרגומים מלאים** לכל הטקסטים

## ♿ נגישות

האתר עומד בתקני WCAG 2.1 AA:

- **ניווט מקלדת** מלא
- **תמיכה בקוראי מסך**
- **ניגודיות צבעים** מותאמת
- **טקסט חלופי** לכל התמונות
- **מבנה HTML** סמנטי
- **ARIA labels** ו-roles
- **Skip links** לניווט מהיר

## 🔍 SEO

- **Meta tags** מותאמים לכל עמוד
- **Open Graph** ו-Twitter Cards
- **Structured Data** (JSON-LD)
- **Sitemap** אוטומטי
- **Breadcrumbs** ניווט
- **Canonical URLs**

## 🚀 התקנה והרצה

### דרישות מוקדמות

- Node.js 18+
- npm או yarn

### התקנה

```bash
# Clone the repository
git clone <repository-url>
cd TicketAgent/frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### סקריפטים זמינים

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

## 🔧 הגדרות סביבה

צור קובץ `.env.local` עם ההגדרות הבאות:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# App Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=TicketAgent

# SEO Configuration
GOOGLE_VERIFICATION_CODE=your-google-verification-code
```

## 📱 רספונסיביות

האתר מותאם לכל המכשירים:

- **Mobile** (320px+)
- **Tablet** (768px+)
- **Desktop** (1024px+)
- **Large Desktop** (1280px+)

## 🧪 בדיקות

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📦 בנייה לפרודקשן

```bash
# Build for production
npm run build

# Start production server
npm run start

# Analyze bundle size
npm run analyze
```

## 🤝 תרומה לפרויקט

1. Fork את הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing-feature`)
3. Commit את השינויים (`git commit -m 'Add amazing feature'`)
4. Push ל-branch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

## 📄 רישיון

פרויקט זה מוגן תחת רישיון MIT. ראה קובץ `LICENSE` לפרטים נוספים.

## 📞 תמיכה

לשאלות ותמיכה:

- 📧 Email: support@ticketagent.com
- 💬 Discord: [TicketAgent Community](https://discord.gg/ticketagent)
- 📖 Documentation: [docs.ticketagent.com](https://docs.ticketagent.com)

---

**TicketAgent** - השוואת כרטיסים למשחקי כדורגל מכל העולם ⚽
