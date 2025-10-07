import { ReactQueryProvider } from "@/providers";
import PopularLeaguesSection from "@/components/home/PopularLeaguesSection";
import { League } from "@/types/league";

interface AllLeaguesPrefetchProps {
  initialLeagues?: League[];
}

export default function AllLeaguesPrefetch({
  initialLeagues,
}: AllLeaguesPrefetchProps) {
  return (
    <ReactQueryProvider initialLeagues={initialLeagues}>
      <PopularLeaguesSection />
    </ReactQueryProvider>
  );
}
