import { ReactQueryProvider } from "@/providers";
import HotFixturesSection from "@/components/home/HotFixturesSection";
import { Fixture } from "@/types/fixture";

interface HotFixturesPrefetchProps {
  initialFixtures?: Fixture[];
}

export default function HotFixturesPrefetch({
  initialFixtures,
}: HotFixturesPrefetchProps) {
  return (
    <ReactQueryProvider initialFixtures={initialFixtures}>
      <HotFixturesSection />
    </ReactQueryProvider>
  );
}
