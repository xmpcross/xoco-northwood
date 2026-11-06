export const siteConfig = {
  name: "Northwood",
  /** The firm's full name, used in the footer and the legal line. */
  legalName: "Northwood Partners LLP",
  tagline: "Early-stage venture capital",
  title: "Northwood - An Astro theme for venture capital and investment firms",
  description:
    "Northwood leads seed and Series A rounds in fintech, climate, health, infrastructure, software and industrials across Europe and North America.",
  siteUrl: "https://northwood.xocoweb.workers.dev",
  language: "en",
  locale: "en_GB",
  dateLocale: "en-GB",
  /** Fund sizes are written in millions of this currency. */
  currency: "USD",
  socialImage: "/og-image.png",
  email: "hello@example.com",
  /** The call to action in the header, the mobile menu, the stats band and the closing panel. */
  actions: {
    primary: { label: "Pitch us", href: "/pitch/" },
  },
  /** The pitch form. It stays disabled until `enabled` is true and `action` is set. */
  pitch: {
    enabled: false,
    action: "",
    method: "post",
  },
  /** The contact page form. It stays disabled until `enabled` is true and `action` is set. */
  contact: {
    enabled: false,
    action: "",
    method: "post",
  },
  newsletter: {
    enabled: false,
    action: "",
    method: "post",
    emailFieldName: "email",
    title: "Letters from Northwood",
    description:
      "Our quarterly letter and the occasional essay, by email. Four or five times a year.",
  },
  /** The small print at the foot of every page. Leave empty to remove it. */
  legal:
    "Northwood Partners LLP is a fictional firm used to demonstrate this theme. Nothing on this website is an offer to sell, or a solicitation of an offer to buy, an interest in any fund.",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "X", href: "https://x.com" },
    { label: "RSS", href: "/rss.xml" },
  ],
};

export interface NavLink {
  label: string;
  href: string;
}

export interface NavColumn {
  title: string;
  links: NavLink[];
}

export const navigation: NavLink[] = [
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Sectors", href: "/sectors/" },
  { label: "Team", href: "/team/" },
  { label: "Insights", href: "/insights/" },
  { label: "Funds", href: "/funds/" },
  { label: "About", href: "/about/" },
];

export const footerNavigation: NavColumn[] = [
  {
    title: "Firm",
    links: [
      { label: "About", href: "/about/" },
      { label: "Team", href: "/team/" },
      { label: "Funds", href: "/funds/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  {
    title: "Portfolio",
    links: [
      { label: "All companies", href: "/portfolio/" },
      { label: "Sectors", href: "/sectors/" },
      { label: "Active", href: "/portfolio/?status=active" },
      { label: "Exited", href: "/portfolio/?status=exited" },
    ],
  },
  {
    title: "Insights",
    links: [
      { label: "Essays", href: "/insights/category/essays/" },
      { label: "Investor letters", href: "/insights/category/letters/" },
      { label: "Playbooks", href: "/insights/category/playbooks/" },
      { label: "News", href: "/insights/category/news/" },
    ],
  },
  {
    title: "Founders",
    links: [
      { label: "Pitch us", href: "/pitch/" },
      { label: "What we look for", href: "/pitch/#criteria" },
      { label: "Search insights", href: "/insights/search/" },
    ],
  },
];

/** The small links under the footer. */
export const legalNavigation: NavLink[] = [
  { label: "Privacy", href: "/legal/privacy/" },
  { label: "Terms of use", href: "/legal/terms/" },
  { label: "Important information", href: "/legal/disclosures/" },
];
