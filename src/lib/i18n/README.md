# מערכת התרגומים - TicketAgent

## 🏗️ ארכיטקטורה

המערכת מפרידה בין שני סוגי תרגומים:

### 1. UI Strings (סטטיים)

- **מיקום**: `messages/ui.{locale}.json`
- **תוכן**: כפתורים, טקסטים, הודעות שגיאה
- **טעינה**: עם הדף (static)
- **גודל**: קטן וקבוע

### 2. Data Entities (דינמיים)

- **מיקום**: `lib/data/{entity}/translations.{locale}.json`
- **תוכן**: קבוצות, ליגות, מדינות
- **טעינה**: לפי צורך (dynamic)
- **גודל**: גדול וגדל

## 📁 מבנה התיקיות

```
src/
├── messages/                    # UI Strings
│   ├── ui.en.json
│   └── ui.he.json
│
├── lib/
│   ├── data/                   # Data Entities
│   │   ├── teams/
│   │   │   ├── translations.en.json
│   │   │   └── translations.he.json
│   │   ├── leagues/
│   │   │   ├── translations.en.json
│   │   │   └── translations.he.json
│   │   └── countries/
│   │       ├── translations.en.json
│   │       └── translations.he.json
│   │
│   ├── i18n/
│   │   ├── loaders.ts          # טעינה דינמית
│   │   └── types.ts
│   │
│   └── hooks/
│       ├── useUITranslation.ts  # UI strings
│       └── useDataTranslation.ts # Data entities
```

## 🚀 שימוש

### UI Strings

```tsx
import { useUITranslation } from "@/lib/hooks/useUITranslation";

function MyComponent() {
  const { getCommonText, getLeaguesText } = useUITranslation();

  return (
    <div>
      <button>{getCommonText("save")}</button>
      <h1>{getLeaguesText("title")}</h1>
    </div>
  );
}
```

### Data Entities

```tsx
import { useTeamTranslation } from "@/lib/hooks/useDataTranslation";
import { TeamName } from "@/components";

function MatchCard({ fixture }) {
  const { getTeamName } = useTeamTranslation();

  return (
    <div>
      <TeamName slug={fixture.homeTeam.slug} fallback={fixture.homeTeam.name} />
      <span>VS</span>
      <TeamName slug={fixture.awayTeam.slug} fallback={fixture.awayTeam.name} />
    </div>
  );
}
```

## ⚡ יתרונות

1. **הפרדת אחריות**: UI נפרד מ-Data
2. **טעינה דינמית**: רק מה שצריך נטען
3. **Cache חכם**: תרגומים נשמרים בזיכרון
4. **Fallback**: תמיד יש fallback לאנגלית
5. **סקיילביליות**: קל להוסיף ישויות חדשות
6. **ביצועים**: טעינה מהירה ואופטימיזציה

## 🔧 הוספת תרגומים חדשים

### UI Strings

```json
// messages/ui.he.json
{
  "newSection": {
    "title": "כותרת חדשה",
    "description": "תיאור חדש"
  }
}
```

### Data Entities

```json
// lib/data/teams/translations.he.json
{
  "new-team": "קבוצה חדשה"
}
```

## 📊 ניהול ביצועים

- **Cache**: תרגומים נשמרים ב-Map
- **Lazy Loading**: טעינה רק כשצריך
- **Fallback**: מניעת שגיאות
- **Error Handling**: טיפול בשגיאות טעינה
