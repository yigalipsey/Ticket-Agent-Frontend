import Image from "next/image";

interface Team {
  id?: string;
  name: string;
  logo?: string;
  logoUrl?: string;
}

interface TeamHeroProps {
  team: Team | null;
}

export function TeamHero({ team }: TeamHeroProps) {
  if (!team) {
    return null;
  }

  return (
    <div className="relative h-32 sm:h-48 lg:h-64 bg-gray-900 overflow-hidden">
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
          {/* Team Name with Logo */}
          <div className="flex items-center justify-center mb-6">
            {(team.logo || team.logoUrl) && (
              <Image
                src={team.logo || team.logoUrl || ""}
                alt={team.name || "Team logo"}
                width={64}
                height={64}
                className="mr-6"
              />
            )}
            <h1 className="text-5xl font-bold text-white">{team.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
