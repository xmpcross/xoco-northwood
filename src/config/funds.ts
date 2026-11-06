export interface Fund {
  name: string;
  vintage: number;
  /** Committed capital, in millions of `siteConfig.currency`. */
  size: number;
  /** Every company in the fund, including those not listed in the portfolio. */
  companies: number;
  exits: number;
  status: string;
  focus: string;
  /** Multiples and net IRR. Leave one out to print a dash. */
  tvpi?: number;
  dpi?: number;
  irr?: number;
}

export const funds: Fund[] = [
  {
    name: "Fund I",
    vintage: 2012,
    size: 85,
    companies: 24,
    exits: 14,
    status: "Fully realised",
    focus: "Seed, Europe",
    tvpi: 4.8,
    dpi: 4.6,
    irr: 27,
  },
  {
    name: "Fund II",
    vintage: 2015,
    size: 180,
    companies: 29,
    exits: 11,
    status: "Harvesting",
    focus: "Seed and Series A, Europe",
    tvpi: 3.9,
    dpi: 2.1,
    irr: 24,
  },
  {
    name: "Fund III",
    vintage: 2018,
    size: 320,
    companies: 31,
    exits: 6,
    status: "Harvesting",
    focus: "Seed and Series A, Europe and North America",
    tvpi: 2.6,
    dpi: 0.7,
    irr: 22,
  },
  {
    name: "Fund IV",
    vintage: 2021,
    size: 480,
    companies: 34,
    exits: 2,
    status: "Fully invested",
    focus: "Seed and Series A, Europe and North America",
    tvpi: 1.4,
    dpi: 0.1,
  },
  {
    name: "Fund V",
    vintage: 2025,
    size: 650,
    companies: 9,
    exits: 0,
    status: "Investing",
    focus: "Seed and Series A, Europe and North America",
  },
];

export const fundsPage = {
  title: "Funds",
  lead: "Five funds since 2012, each raised from the same small group of foundations, endowments and families, and each run by the partners who raised it.",
  /** The date the fund figures were measured. */
  asOf: "2026-06-30",
  disclosure:
    "Figures are illustrative and unaudited, shown net of fees, expenses and carried interest, as of the date above. TVPI is total value to paid-in capital and DPI is distributions to paid-in capital. Past performance is not a guide to future results, and nothing on this page is an offer to sell or a solicitation of an offer to buy an interest in any fund.",
};
