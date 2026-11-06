import { getCollection, type CollectionEntry } from "astro:content";
import { categories, type Category } from "@/config/insights";
import { formatDate, joinNames } from "@/lib/format";
import type { Person } from "@/lib/team";
import type { SearchItem } from "@/lib/search";

export type Entry = CollectionEntry<"insights">;

export const entryHref = (entry: Entry) => `/insights/${entry.id}/`;
export const categoryHref = (category: Category) => `/insights/category/${category}/`;
export const categoryLabel = (category: Category) => categories[category].label;

const byNewest = (a: Entry, b: Entry) => b.data.date.getTime() - a.data.date.getTime();

/** Published entries, newest first. Drafts never leave the dev server. */
export async function getInsights() {
  const entries = await getCollection("insights", ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.sort(byNewest);
}

/** The featured entry if one is flagged, the newest otherwise. */
export const leadEntry = (entries: Entry[]) =>
  entries.find((entry) => entry.data.featured) ?? entries[0];

/** The team members on an entry's byline, in frontmatter order. */
export const authorsOf = (entry: Entry, team: Map<string, Person>) =>
  entry.data.authors
    .map((ref) => team.get(ref.id))
    .filter((person): person is Person => person !== undefined);

/** Same category first, then the newest of the rest. */
export const relatedEntries = (entry: Entry, entries: Entry[], count = 3) => {
  const others = entries.filter((other) => other.id !== entry.id);
  const same = others.filter((other) => other.data.category === entry.data.category);
  const rest = others.filter((other) => other.data.category !== entry.data.category);
  return [...same, ...rest].slice(0, count);
};

export const searchItems = (entries: Entry[], team: Map<string, Person>): SearchItem[] =>
  entries.map((entry) => ({
    title: entry.data.title,
    description: entry.data.description,
    href: entryHref(entry),
    category: categoryLabel(entry.data.category),
    author: joinNames(authorsOf(entry, team).map((person) => person.data.name)),
    date: formatDate(entry.data.date),
    companies: entry.data.companies.map((ref) => ref.id),
  }));
