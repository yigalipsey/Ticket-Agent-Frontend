# ארכיטקטורת תרגומים - TicketAgent

## 🏗️ מבנה התיקיות המומלץ

```
src/
├── messages/                    # UI Strings בלבד
│   ├── ui.en.json              # כפתורים, טקסטים, הודעות
│   ├── ui.he.json
│   ├── errors.en.json          # הודעות שגיאה
│   ├── errors.he.json
│   ├── forms.en.json           # טקסטים של טפסים
│   └── forms.he.json
│
├── lib/
│   ├── data/                   # Data Entities (קבוצות, ליגות)
│   │   ├── teams/
│   │   │   ├── translations.en.json
│   │   │   ├── translations.he.json
│   │   │   └── index.ts
│   │   ├── leagues/
│   │   │   ├── translations.en.json
│   │   │   ├── translations.he.json
│   │   │   └── index.ts
│   │   └── countries/
│   │       ├── translations.en.json
│   │       ├── translations.he.json
│   │       └── index.ts
│   │
│   ├── i18n/
│   │   ├── config.ts           # הגדרות i18n
│   │   ├── loaders.ts          # טעינת תרגומים דינמית
│   │   └── types.ts            # טיפוסים
│   │
│   └── hooks/
│       ├── useUITranslation.ts  # UI strings
│       └── useDataTranslation.ts # Data entities
```

## 📋 הפרדת אחריות

### UI Strings (messages/)

- כפתורים, טקסטים, הודעות שגיאה
- טקסטים של טפסים
- הודעות מערכת
- **גודל**: קטן וקבוע

### Data Entities (lib/data/)

- קבוצות, ליגות, מדינות
- אצטדיונים, שחקנים
- **גודל**: גדול וגדל
- **ניהול**: קובץ נפרד או DB

## 🔄 אסטרטגיות טעינה

1. **Static Loading**: UI strings נטענים עם הדף
2. **Dynamic Loading**: Data entities נטענים לפי צורך
3. **Caching**: תרגומים נשמרים ב-cache
4. **Fallback**: תמיד fallback לאנגלית
