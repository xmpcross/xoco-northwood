/** The `group` value in team frontmatter. The team page lists them in this order. */
export const teamGroups = ["Partners", "Investment team", "Platform", "Operations"] as const;

export type TeamGroup = (typeof teamGroups)[number];

export const teamPage = {
  title: "Team",
  lead: "A small partnership by design. Every company works with a partner who leads the investment and stays on the board for as long as it is useful.",
};
