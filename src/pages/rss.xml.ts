import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { siteConfig } from "@/config/site";
import { joinNames } from "@/lib/format";
import { authorsOf, categoryLabel, entryHref, getInsights } from "@/lib/insights";
import { getTeam, teamById } from "@/lib/team";

export const GET: APIRoute = async () => {
  const entries = await getInsights();
  const team = teamById(await getTeam());
  return rss({
    title: `${siteConfig.name} insights`,
    description: siteConfig.description,
    site: siteConfig.siteUrl,
    items: entries.slice(0, 20).map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: entryHref(entry),
      categories: [categoryLabel(entry.data.category)],
      author: `${siteConfig.email} (${joinNames(authorsOf(entry, team).map((person) => person.data.name))})`,
    })),
    customData: `<language>${siteConfig.language}</language>`,
  });
};
