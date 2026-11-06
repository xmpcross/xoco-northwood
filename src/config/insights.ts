export const categoryKeys = ["essays", "letters", "playbooks", "news"] as const;

export type Category = (typeof categoryKeys)[number];

/** The `category` value in insight frontmatter. Archives are listed in this order. */
export const categories: Record<Category, { label: string; description: string }> = {
  essays: {
    label: "Essays",
    description: "Longer arguments about markets, companies and how we invest.",
  },
  letters: {
    label: "Investor letters",
    description:
      "Our quarterly and annual letters to the partners in our funds, published in full.",
  },
  playbooks: {
    label: "Playbooks",
    description: "Practical notes for founders on boards, hiring, fundraising and the first years.",
  },
  news: {
    label: "News",
    description: "Funds, partners, and the companies that have joined or left the portfolio.",
  },
};

export const insightsPage = {
  title: "Insights",
  lead: "Essays, playbooks for founders, and every letter we send to the investors in our funds.",
};

/** Entries per page on the insights index and category archives. */
export const ENTRIES_PER_PAGE = 9;
