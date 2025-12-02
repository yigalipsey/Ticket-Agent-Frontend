import { Fixture } from "@/types/fixture";
import { League } from "@/types/league";

export interface AvailableVenue {
  _id: string;
  name: string;
  nameHe?: string;
}

export interface AvailableFilters {
  availableMonths: string[];
  availableVenues: AvailableVenue[];
}

/**
 * מחשב חודשים ואצטדיונים זמינים ממשחקים וליגה
 * @param league - הליגה (עם months אם יש)
 * @param initialFixtures - משחקים ראשוניים
 * @param fixtures - משחקים נוכחיים (מפילטרים)
 * @returns אובייקט עם חודשים ואצטדיונים זמינים
 */
export function calculateAvailableFilters(
  league: League | null | undefined,
  initialFixtures: Fixture[],
  fixtures: Fixture[]
): AvailableFilters {
  const venues = new Map<string, AvailableVenue>();
  const monthsSet = new Set<string>();
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;

  // חודשים מגיעים מהליגה עצמה (אם יש) - רק מעכשיו והלאה
  const leagueMonths = league?.months || [];
  leagueMonths.forEach((month) => {
    if (month >= currentMonth) {
      monthsSet.add(month);
    }
  });

  // חודשים ואצטדיונים מחושבים מהמשחקים הראשוניים - רק מעכשיו והלאה
  initialFixtures.forEach((fixture) => {
    // איסוף אצטדיונים
    if (fixture.venue?._id && fixture.venue?.name) {
      venues.set(fixture.venue._id, {
        _id: fixture.venue._id,
        name: fixture.venue.name,
        nameHe: fixture.venue.nameHe || fixture.venue.name_he,
      });
    }

    // חישוב חודש מהמשחק - רק אם המשחק בעתיד
    if (fixture.date) {
      const fixtureDate = new Date(fixture.date);
      if (fixtureDate >= now) {
        const monthKey = `${fixtureDate.getFullYear()}-${String(
          fixtureDate.getMonth() + 1
        ).padStart(2, "0")}`;
        if (monthKey >= currentMonth) {
          monthsSet.add(monthKey);
        }
      }
    }
  });

  // גם מהמשחקים הנוכחיים (אם יש) - רק מעכשיו והלאה
  fixtures.forEach((fixture) => {
    // איסוף אצטדיונים
    if (fixture.venue?._id && fixture.venue?.name) {
      venues.set(fixture.venue._id, {
        _id: fixture.venue._id,
        name: fixture.venue.name,
        nameHe: fixture.venue.nameHe || fixture.venue.name_he,
      });
    }

    // חישוב חודש מהמשחק - רק אם המשחק בעתיד
    if (fixture.date) {
      const fixtureDate = new Date(fixture.date);
      if (fixtureDate >= now) {
        const monthKey = `${fixtureDate.getFullYear()}-${String(
          fixtureDate.getMonth() + 1
        ).padStart(2, "0")}`;
        if (monthKey >= currentMonth) {
          monthsSet.add(monthKey);
        }
      }
    }
  });

  return {
    availableMonths: Array.from(monthsSet).sort(),
    availableVenues: Array.from(venues.values()),
  };
}


