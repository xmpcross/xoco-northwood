export const sectorKeys = [
  "fintech",
  "climate",
  "health",
  "infrastructure",
  "software",
  "industrials",
] as const;

export type Sector = (typeof sectorKeys)[number];

export interface SectorInfo {
  label: string;
  /** One line, used on the homepage and the sectors index. */
  description: string;
  /** The opening paragraphs of the sector page. */
  thesis: string[];
  /** Three things the partners look for in the sector. */
  themes: { title: string; text: string }[];
}

/** The `sector` value in company frontmatter, with the copy for its page at `/sectors/<key>/`. */
export const sectors: Record<Sector, SectorInfo> = {
  fintech: {
    label: "Fintech",
    description: "Payments, lending, insurance and the back office of money.",
    thesis: [
      "The most durable financial companies we have backed sell to the people who keep the books: controllers, treasurers, payroll teams. Their problems are unglamorous, their budgets are real, and once a product runs the month-end close, it rarely gets replaced.",
      "We look for founders who have done the job they are automating, and who understand the licences, audits and bank partnerships that sit between a good demo and a product a finance team can trust.",
    ],
    themes: [
      {
        title: "The finance back office",
        text: "Payables, treasury, payroll and close: work that is still manual at most companies with fewer than a thousand people.",
      },
      {
        title: "Embedded products",
        text: "Insurance, lending and payments sold inside the software a business already uses, rather than beside it.",
      },
      {
        title: "Risk in real time",
        text: "Fraud and compliance tools built for instant payments, where a decision has to be made in milliseconds.",
      },
    ],
  },
  climate: {
    label: "Climate",
    description: "Storage, materials and the software that runs a cleaner grid.",
    thesis: [
      "Clean power is now cheap to generate and slow to connect. Our climate investing has followed the bottleneck: storage, the software that balances a crowded grid, and the materials that let heavy industry use less of it.",
      "These companies need more capital and more patience than most software. We size our reserves for that, and we back teams who can explain their unit economics without a subsidy in the sentence.",
    ],
    themes: [
      {
        title: "Storage and flexibility",
        text: "Long-duration storage and virtual power plants that let a grid absorb more wind and solar.",
      },
      {
        title: "Lower-carbon materials",
        text: "Cement, timber and steel inputs that compete on price as well as on emissions.",
      },
      {
        title: "Measurement",
        text: "Verification that buyers of carbon removal and clean materials can check for themselves.",
      },
    ],
  },
  health: {
    label: "Health",
    description: "Diagnostics, clinical operations and care outside the hospital.",
    thesis: [
      "Healthcare spends a remarkable share of its money on coordination: scheduling, approvals, recruitment, follow-up. We back companies that take that work off clinicians and give patients an answer sooner.",
      "We prefer founders who have worked inside the system they are changing, and products that a hospital or clinic can adopt without rebuilding its workflow around them.",
    ],
    themes: [
      {
        title: "Care after discharge",
        text: "Monitoring and diagnostics that move safely from the ward to the patient's home.",
      },
      {
        title: "Clinical operations",
        text: "Trial recruitment, prior authorisation and the administrative work that delays treatment.",
      },
      {
        title: "Diagnostics at the edge",
        text: "Lab-grade testing that happens closer to the patient and reports back faster.",
      },
    ],
  },
  infrastructure: {
    label: "Infrastructure",
    description: "Data, security and the platforms developers build on.",
    thesis: [
      "Developers adopt tools on their merits and leave them the moment they break. The infrastructure companies that survive that test become very hard to replace, which is why some of our best results have been products few people outside engineering teams will ever see.",
      "We look for founders who built the first version for themselves, at a company where the problem was large enough to hurt.",
    ],
    themes: [
      {
        title: "Data at scale",
        text: "Databases and pipelines built for event volumes that general-purpose tools were never designed for.",
      },
      {
        title: "Security for the cloud",
        text: "Detection and identity products that fit how modern teams actually ship.",
      },
      {
        title: "Operating machine learning",
        text: "Monitoring and tooling for models that make decisions in production.",
      },
    ],
  },
  software: {
    label: "Software",
    description: "Tools that change how teams plan, decide and get work done.",
    thesis: [
      "The best business software replaces a spreadsheet that a team has quietly outgrown. We back products for specific jobs, used every day by the people doing them, rather than broad platforms looking for a use.",
      "Distribution matters as much as product here, so we look for teams with an honest view of how their first hundred customers will find them.",
    ],
    themes: [
      {
        title: "Frontline work",
        text: "Scheduling, operations and tools for the people who are never at a desk.",
      },
      {
        title: "Specialist workflows",
        text: "Software for legal, operations and finance teams that knows their work in detail.",
      },
      {
        title: "Bottom-up adoption",
        text: "Products that individuals choose first and companies buy once they are already in use.",
      },
    ],
  },
  industrials: {
    label: "Industrials",
    description: "Robotics, manufacturing and the physical supply chain.",
    thesis: [
      "Factories, warehouses and farms are short of people and full of equipment that does not talk to each other. We back robotics and software that raise output on the floor and pay for themselves inside a year.",
      "Our partners in this sector have run plants themselves. We visit sites, we ask about uptime, and we would rather see a robot working in a customer's building than a video of one.",
    ],
    themes: [
      {
        title: "Robotics as a service",
        text: "Machines leased by the hour or the pick, so customers buy outcomes rather than capital equipment.",
      },
      {
        title: "Factory software",
        text: "Scheduling and monitoring that lift utilisation in shops still run on whiteboards.",
      },
      {
        title: "Food and agriculture",
        text: "Automation for growers facing rising labour costs and tighter seasons.",
      },
    ],
  },
};

export const sectorsPage = {
  title: "Sectors",
  lead: "Six sectors where a technical team with a head start can build something that lasts, and where our partners have spent their careers.",
};

/** The round in which the firm first invested. Filters only list stages that have companies. */
export const stages = ["Pre-seed", "Seed", "Series A", "Series B", "Growth"] as const;

export type Stage = (typeof stages)[number];

export const exitTypes = ["Acquisition", "IPO"] as const;

export const portfolioPage = {
  title: "Portfolio",
  lead: "The companies we have backed and can talk about, from the first cheque to the ones that have since gone public or been acquired.",
};
