import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { funds } from "@/config/funds";
import { categoryKeys } from "@/config/insights";
import { exitTypes, sectorKeys, stages } from "@/config/portfolio";
import { teamGroups } from "@/config/team";

/** Entries live in a folder each, so the folder name is the id that references use. */
const folderId = ({ entry }: { entry: string }) => entry.replace(/\/index\.mdx?$/, "");

const credit = z.object({ name: z.string(), url: z.url() });

/** One folder per company: `index.md`, plus an optional `logo.svg` drawn in `currentColor`. */
const companies = defineCollection({
  loader: glob({
    base: "./src/content/companies",
    pattern: "*/index.{md,mdx}",
    generateId: folderId,
  }),
  schema: z.object({
    name: z.string(),
    tagline: z.string().max(80),
    sector: z.enum(sectorKeys),
    /** The round of the firm's first investment. */
    stage: z.enum(stages),
    /** The year of the firm's first investment. */
    invested: z.number().int(),
    fund: z.string().refine((name) => funds.some((fund) => fund.name === name), {
      message: "Use a fund name from src/config/funds.ts",
    }),
    /** The team member who leads the investment, by folder name. */
    partner: reference("team"),
    founded: z.number().int(),
    hq: z.string(),
    website: z.url().optional(),
    founders: z.array(z.object({ name: z.string(), role: z.string() })).default([]),
    /** Setting `exit` marks the company as exited; leave it off while the company is active. */
    exit: z
      .object({
        type: z.enum(exitTypes),
        /** The acquirer, or the exchange for an IPO. */
        by: z.string().optional(),
        year: z.number().int(),
      })
      .optional(),
    /** Shown in the selected portfolio on the homepage. */
    featured: z.boolean().default(false),
    /** Funding history, oldest first. The exit is added after the last round. */
    rounds: z
      .array(
        z.object({
          /** Year and month, such as "2016-05". */
          date: z.string().regex(/^\d{4}-\d{2}$/, "Use YYYY-MM"),
          round: z.string(),
          /** Millions of `siteConfig.currency`. */
          amount: z.number().optional(),
          lead: z.string().optional(),
          /** Northwood invested in this round. */
          northwood: z.boolean().default(false),
        }),
      )
      .default([]),
  }),
});

/** One folder per person: `index.md` holding the bio, beside the portrait it names. */
const team = defineCollection({
  loader: glob({ base: "./src/content/team", pattern: "*/index.{md,mdx}", generateId: folderId }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      group: z.enum(teamGroups),
      portrait: image(),
      location: z.string(),
      /** Sectors this person invests in or supports. */
      focus: z.array(z.enum(sectorKeys)).default([]),
      joined: z.number().int().optional(),
      /** One line on what they did before, printed on the profile. */
      previously: z.string().optional(),
      email: z.email().optional(),
      linkedin: z.url().optional(),
      x: z.url().optional(),
      /** Lower comes first within a group. */
      order: z.number().default(100),
    }),
});

/** One folder per entry: `index.md` or `index.mdx`, with any cover image beside it. */
const insights = defineCollection({
  loader: glob({
    base: "./src/content/insights",
    pattern: "*/index.{md,mdx}",
    generateId: folderId,
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().max(110),
        description: z.string().min(40).max(220),
        date: z.coerce.date(),
        updated: z.coerce.date().optional(),
        category: z.enum(categoryKeys),
        /** Team members, by folder name. The first is the lead author. */
        authors: z.array(reference("team")).min(1),
        cover: image().optional(),
        coverAlt: z.string().optional(),
        coverCredit: credit.optional(),
        /** Printed large on the face of a card without a cover, e.g. "Q3 2026" on a letter. */
        period: z.string().optional(),
        /** Portfolio companies the entry discusses, by folder name. */
        companies: z.array(reference("companies")).default([]),
        /** Pins the entry to the lead slot on the insights index. */
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
      })
      .refine((data) => !data.cover || data.coverAlt, {
        message: "Add `coverAlt` to describe the cover",
        path: ["coverAlt"],
      }),
});

export const collections = { companies, team, insights };
