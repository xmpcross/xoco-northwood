export const pitch = {
  title: "Pitch us",
  lead: "Tell us what you are building. Every pitch is read by a partner, and you will hear back from a person within ten working days, whatever the answer.",
  criteria: {
    title: "What we look for",
    items: [
      {
        title: "A founder with an unfair head start",
        body: "Years inside the problem, a technical insight others have missed, or customers who already trust you.",
      },
      {
        title: "Seed or Series A",
        body: "We lead rounds from $1M to $15M and keep most of each fund in reserve for the rounds that follow.",
      },
      {
        title: "Europe or North America",
        body: "Teams based in, or selling first to, the markets our three offices know well.",
      },
      {
        title: "One of our six sectors",
        body: "Fintech, climate, health, infrastructure, software or industrials. If you are not sure, pitch anyway.",
      },
    ],
  },
  process: {
    title: "What happens next",
    steps: [
      {
        title: "A partner reads it",
        timing: "Within 10 working days",
        body: "You get a reply from a person, with a reason if the answer is no.",
      },
      {
        title: "A first conversation",
        timing: "45 minutes",
        body: "With the partner who would lead. No deck walkthrough needed.",
      },
      {
        title: "A partnership meeting",
        timing: "Within 3 weeks",
        body: "You meet all six partners, and we decide that week.",
      },
    ],
  },
  form: {
    title: "Your company",
    /** Shown in the stage select. */
    stages: ["Pre-seed", "Seed", "Series A", "Series B or later"],
    raising: [
      "Under $1M",
      "$1M to $3M",
      "$3M to $8M",
      "$8M to $15M",
      "More than $15M",
      "Not raising yet",
    ],
    consent: "I understand that Northwood does not sign NDAs at this stage.",
  },
  faq: {
    title: "Questions founders ask",
    items: [
      {
        question: "Do I need a warm introduction?",
        answer:
          "No. A third of the companies in our last fund came through this form. An introduction helps us understand you faster, but it does not move you up a queue.",
      },
      {
        question: "Should I attach a deck?",
        answer:
          "A link to a deck is helpful but optional. A clear paragraph on what you are building and why you are the team to build it matters more.",
      },
      {
        question: "Do you invest before there is a product?",
        answer:
          "Yes, regularly. Around a quarter of our first cheques go to companies with no revenue, usually led by founders who know the problem from the inside.",
      },
      {
        question: "Will you invest if another firm is leading?",
        answer:
          "Sometimes, at seed. From Series A we prefer to lead, so that the partner on your board has the ownership to stay engaged for years.",
      },
      {
        question: "What if you say no?",
        answer:
          "We will tell you why, briefly and honestly. Many companies we passed on early have come back a year later, and some are now in the portfolio.",
      },
    ],
  },
};
