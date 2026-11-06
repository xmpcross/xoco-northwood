import { siteConfig } from "@/config/site";

const dateFormat = new Intl.DateTimeFormat(siteConfig.dateLocale, {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const formatDate = (date: Date) => dateFormat.format(date);

const monthFormat = new Intl.DateTimeFormat(siteConfig.dateLocale, {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2016-05" in, "May 2016" out. */
export const formatMonth = (yearMonth: string) =>
  monthFormat.format(new Date(`${yearMonth}-01T00:00:00Z`));

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: siteConfig.currency,
  notation: "compact",
  maximumFractionDigits: 1,
});

/** Millions in, "$650M" or "$1.7B" out. */
export const formatMoney = (millions: number) => money.format(millions * 1_000_000);

/** "4.8x", or a dash when the figure is not reported. */
export const formatMultiple = (value?: number) =>
  value === undefined ? "–" : `${value.toFixed(1)}x`;

export const formatPercent = (value?: number) => (value === undefined ? "–" : `${value}%`);

/** "A", "A and B", "A, B and C". */
export const joinNames = (names: string[]) =>
  names.length < 2 ? (names[0] ?? "") : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
