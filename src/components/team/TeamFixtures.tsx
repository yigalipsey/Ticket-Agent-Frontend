import { FixtureCard } from "@/components";
import { Spinner } from "@/components/ui";

interface Fixture {
  id: string;
  slug: string;
  homeTeam: {
    id: string;
    name: string;
    slug: string;
    logo: string;
    city: string;
  };
  awayTeam: {
    id: string;
    name: string;
    slug: string;
    logo: string;
    city: string;
  };
  venue: {
    id: string;
    name: string;
    city: string;
    capacity: number;
  };
  league: {
    id: string;
    name: string;
    country: string;
    logo: string;
  };
  date: string;
  time: string;
  status: string;
  round: number;
  offers: any[];
  lowestPrice: number;
  totalOffers: number;
}

interface TeamFixturesProps {
  fixtures: Fixture[] | null;
  isLoading: boolean;
  error: string | null;
  teamName?: string;
}

export function TeamFixtures({
  fixtures,
  isLoading,
  error,
  teamName = "הקבוצה",
}: TeamFixturesProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">משחקים קרובים</h2>
        <p className="text-gray-600">המשחקים הבאים של {teamName}</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600">
          <p>שגיאה בטעינת משחקים: {error}</p>
        </div>
      ) : fixtures && fixtures.length > 0 ? (
        <div className="flex flex-col gap-4">
          {fixtures.map((fixture) => (
            <FixtureCard
              key={fixture.id}
              fixture={fixture}
              showOffers={true}
              showVenue={true}
              showLeague={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 py-12">
          <p>אין משחקים קרובים זמינים עבור {teamName}.</p>
        </div>
      )}
    </div>
  );
}
