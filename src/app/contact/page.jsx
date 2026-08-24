import ContactPageClient from "./ContactPageClient";
import { fetchLeadershipTeamForContact } from "@/lib/publicTeam";

export default async function ContactPage() {
  const coreMembers = await fetchLeadershipTeamForContact();

  return <ContactPageClient coreMembers={coreMembers} />;
}
