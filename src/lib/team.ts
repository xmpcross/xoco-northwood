import { getCollection, type CollectionEntry } from "astro:content";
import { teamGroups } from "@/config/team";
import type { Company } from "@/lib/portfolio";

export type Person = CollectionEntry<"team">;

export const personHref = (person: Person | string) =>
  `/team/${typeof person === "string" ? person : person.id}/`;

/** Everyone, in group order, then by `order` and name. */
export async function getTeam() {
  const team = await getCollection("team");
  return team.sort(
    (a, b) =>
      teamGroups.indexOf(a.data.group) - teamGroups.indexOf(b.data.group) ||
      a.data.order - b.data.order ||
      a.data.name.localeCompare(b.data.name),
  );
}

export const teamById = (team: Person[]) => new Map(team.map((person) => [person.id, person]));

/** The companies a person leads, newest investment first. */
export const companiesLedBy = (person: Person, companies: Company[]) =>
  companies
    .filter((company) => company.data.partner.id === person.id)
    .sort((a, b) => b.data.invested - a.data.invested);

export const firstName = (person: Person) => person.data.name.split(" ")[0];
