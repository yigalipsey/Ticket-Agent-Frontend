import Image from "next/image";

interface Team {
  _id: string;
  name: string;
  code: string;
  slug: string;
  country: string;
  logoUrl?: string;
  teamId: number;
  venueId: string;
  externalIds: {
    apiFootball: number;
  };
  updatedAt: string;
}

interface TeamHeroProps {
  team: Team | null;
}

export function TeamHero({ team }: TeamHeroProps) {
  if (!team) {
    return null;
  }

  return (
    <div className="relative h-96 bg-gray-900 overflow-hidden">
      {/* Stadium Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("/images/people-soccer-stadium.jpg")`,
          filter: "blur(2px) brightness(0.4)",
        }}
      />

      {/* Team Info Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Team Logo */}
          {team.logoUrl && (
            <div className="mb-6">
              <div className="w-32 h-32 rounded-full bg-white p-2 shadow-lg mx-auto">
                <Image
                  src={team.logoUrl}
                  alt={team.name}
                  width={120}
                  height={120}
                  className="rounded-full w-full h-full object-contain"
                />
              </div>
            </div>
          )}

          {/* Team Name */}
          <h1 className="text-5xl font-bold text-white mb-4">{team.name}</h1>

          {/* Country */}
          <p className="text-xl text-gray-200">{team.country}</p>
        </div>
      </div>
    </div>
  );
}
