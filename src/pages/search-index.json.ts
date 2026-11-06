import type { APIRoute } from "astro";
import { getInsights, searchItems } from "@/lib/insights";
import { getTeam, teamById } from "@/lib/team";

export const GET: APIRoute = async () =>
  new Response(JSON.stringify(searchItems(await getInsights(), teamById(await getTeam()))), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
