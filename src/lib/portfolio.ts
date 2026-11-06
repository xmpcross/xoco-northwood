import { getCollection, type CollectionEntry } from "astro:content";
import { sectorKeys, sectors, stages, type Sector } from "@/config/portfolio";

export type Company = CollectionEntry<"companies">;
export type Status = "active" | "exited";

export const companyHref = (company: Company) => `/portfolio/${company.id}/`;

/** Links to the directory with filters applied. */
export const portfolioHref = (
  filters: { sector?: Sector; stage?: string; status?: Status } = {},
) => {
  const params = new URLSearchParams();
  if (filters.sector) params.set("sector", filters.sector);
  if (filters.stage) params.set("stage", filters.stage);
  if (filters.status) params.set("status", filters.status);
  const query = params.toString();
  return query ? `/portfolio/?${query}` : "/portfolio/";
};

export const sectorLabel = (sector: Sector) => sectors[sector].label;

export const sectorHref = (sector: Sector) => `/sectors/${sector}/`;

/** The sum of every round with a published amount, in millions. */
export const totalRaised = (company: Company) =>
  company.data.rounds.reduce((sum, round) => sum + (round.amount ?? 0), 0);

export const statusOf = (company: Company): Status => (company.data.exit ? "exited" : "active");

/** "Active", "Acquired by Palisade, 2023" or "IPO, Nasdaq, 2021". */
export const statusLabel = (company: Company, withYear = true) => {
  const exit = company.data.exit;
  if (!exit) return "Active";
  const year = withYear ? `, ${exit.year}` : "";
  if (exit.type === "IPO") return `IPO${exit.by ? `, ${exit.by}` : ""}${year}`;
  return `Acquired${exit.by ? ` by ${exit.by}` : ""}${year}`;
};

/** Every company, alphabetically. */
export async function getCompanies() {
  const companies = await getCollection("companies");
  return companies.sort((a, b) => a.data.name.localeCompare(b.data.name));
}

/** Featured companies first, in alphabetical order, topped up with the most recent investments. */
export const featuredCompanies = (companies: Company[], count = 8) => {
  const featured = companies.filter((company) => company.data.featured);
  const rest = companies
    .filter((company) => !company.data.featured)
    .sort((a, b) => b.data.invested - a.data.invested);
  return [...featured, ...rest].slice(0, count);
};

/** Same sector first, then the most recent investments. */
export const relatedCompanies = (company: Company, companies: Company[], count = 3) => {
  const others = companies.filter((other) => other.id !== company.id);
  const same = others.filter((other) => other.data.sector === company.data.sector);
  const rest = others
    .filter((other) => other.data.sector !== company.data.sector)
    .sort((a, b) => b.data.invested - a.data.invested);
  return [...same, ...rest].slice(0, count);
};

/** Counts computed from the collection, so the numbers always match the directory. */
export const portfolioStats = (companies: Company[]) => {
  const count = <T extends string>(keys: readonly T[], pick: (company: Company) => T) =>
    keys
      .map((key) => ({ key, count: companies.filter((company) => pick(company) === key).length }))
      .filter((row) => row.count > 0);

  const exits = companies
    .filter((company) => company.data.exit)
    .sort((a, b) => (b.data.exit?.year ?? 0) - (a.data.exit?.year ?? 0));

  return {
    total: companies.length,
    active: companies.length - exits.length,
    exited: exits.length,
    ipos: exits.filter((company) => company.data.exit?.type === "IPO").length,
    exits,
    bySector: count(sectorKeys, (company) => company.data.sector),
    byStage: count(stages, (company) => company.data.stage),
  };
};
