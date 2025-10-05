// Utility לשמירת ושליפת מפת slug->id של משחקים
class FixtureSlugMapper {
  private static STORAGE_KEY = "fixture-slug-to-id-mapping";

  // שמירת מפה של slug->id
  static saveSlugMapping(fixtures: any[]) {
    if (typeof window === "undefined") return;

    try {
      const existingMapping = this.getSlugMapping();
      const newMapping: Record<string, string> = {};

      // הוסף את כל המשחקים החדשים למפה
      fixtures.forEach((fixture) => {
        if (fixture.slug && (fixture._id || fixture.id)) {
          newMapping[fixture.slug] = fixture._id || fixture.id;
        }
      });

      // מיזוג עם המפה הקיימת
      const mergedMapping = { ...existingMapping, ...newMapping };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mergedMapping));

      console.log(
        "💾 Saved fixture slug mapping:",
        Object.keys(mergedMapping).length,
        "fixtures"
      );
      console.log("🔍 New fixtures added:", Object.keys(newMapping));
      console.log("🔍 Sample fixture:", fixtures[0]);
    } catch (error) {
      console.error("Error saving fixture slug mapping:", error);
    }
  }

  // שליפת מפה של slug->id
  static getSlugMapping(): Record<string, string> {
    if (typeof window === "undefined") return {};

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error("Error loading fixture slug mapping:", error);
      return {};
    }
  }

  // שליפת ID לפי slug
  static getIdBySlug(slug: string): string | null {
    const mapping = this.getSlugMapping();
    return mapping[slug] || null;
  }

  // ניקוי המפה
  static clearMapping() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // הדפסת המפה לדיבוג
  static debugMapping() {
    const mapping = this.getSlugMapping();
    console.log("🔍 Current fixture slug mapping:", mapping);
    return mapping;
  }
}

export default FixtureSlugMapper;
