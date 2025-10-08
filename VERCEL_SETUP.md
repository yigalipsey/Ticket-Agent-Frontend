# הגדרת Vercel - משתני סביבה

## 🔧 הגדרת משתני סביבה ב-Vercel

כדי שהאפליקציה תעבוד נכון ב-production, יש להגדיר את משתני הסביבה הבאים ב-Vercel Dashboard:

### שלבים:

1. **כנס ל-Vercel Dashboard**

   - לך ל: https://vercel.com/dashboard
   - בחר את הפרויקט שלך

2. **הגדרות (Settings)**

   - לחץ על "Settings" בתפריט העליון
   - בחר "Environment Variables" מהתפריט הצדדי

3. **הוסף משתנה חדש**
   - לחץ על "Add New"
   - הזן את הפרטים הבאים:

### משתני סביבה נדרשים:

#### `NEXT_PUBLIC_API_URL`

- **Name:** `NEXT_PUBLIC_API_URL`
- **Value:** `https://ticket-agent-backend.onrender.com/api`
- **Environment:** בחר את כל הסביבות (Production, Preview, Development)

4. **שמור ופרוס מחדש**
   - לחץ על "Save"
   - לך ל-"Deployments"
   - לחץ על "Redeploy" על הפריסה האחרונה
   - בחר "Use existing Build Cache" = NO (כדי לבנות מחדש עם המשתנים החדשים)

## 🔍 בדיקה

אחרי הפריסה מחדש:

1. פתח את הקונסול בדפדפן (F12)
2. חפש את ההודעה: `🔧 [ApiClient] Initializing with baseURL:`
3. וודא שה-URL הוא: `https://ticket-agent-backend.onrender.com/api`

## 📝 הערות

- משתנים שמתחילים ב-`NEXT_PUBLIC_` זמינים גם ב-client-side
- אם תשנה משתנה סביבה, **חובה** לפרוס מחדש
- אפשר לבדוק את המשתנים בלוגים של ה-build ב-Vercel

## 🚨 בעיות נפוצות

### הבעיה: הקריאות עדיין ל-localhost

**פתרון:**

1. וודא שהמשתנה נשמר ב-Vercel
2. פרוס מחדש **ללא** Build Cache
3. נקה את ה-cache של הדפדפן (Ctrl+Shift+Del)

### הבעיה: 404 על `/venues`

**פתרון:**

- זה תקין! הבעיה היא שאין route `/venues` בשרת
- הקריאות הנכונות הן ל-`/leagues`, `/fixtures`, וכו'

## 📚 מידע נוסף

- [Vercel Environment Variables Docs](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
