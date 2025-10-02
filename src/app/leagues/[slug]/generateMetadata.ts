import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LeagueService } from "@/services";
import { generateLeagueMetadata } from "@/lib/seo/leagueMetadata";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  
  try {
    // נסה לקבל את הליגה מהקונסטנטים
    const league = await LeagueService.getLeagueFromConstants(slug);
    
    if (!league) {
      return {
        title: "League Not Found | TicketAgent",
        description: "The requested league could not be found.",
      };
    }

    // נקבל את השפה הנוכחית מהפרמטרים
    const locale = "en"; // TODO: לקבל מהפרמטרים או מהקונטקסט
    
    return generateLeagueMetadata(league, locale);
  } catch (error) {
    console.error("Error generating league metadata:", error);
    return {
      title: "League | TicketAgent",
      description: "Football league information and fixtures.",
    };
  }
}
