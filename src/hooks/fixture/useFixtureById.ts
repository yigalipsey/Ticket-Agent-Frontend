import { useQuery } from "@tanstack/react-query";
import FixtureService from "@/services/fixtureService";
import { Fixture } from "@/types/fixture";

export function useFixtureById(fixtureId: string | null) {
    return useQuery({
        queryKey: ["fixture", fixtureId],
        queryFn: () => (fixtureId ? FixtureService.getFixtureById(fixtureId) : null),
        enabled: !!fixtureId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
