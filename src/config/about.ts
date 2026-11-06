import firm from "@/assets/images/firm.jpg";

export const about = {
  title: "About",
  lead: "Northwood is an early-stage venture firm with offices in London, New York and Stockholm, founded in 2012 by two people who had built companies before they invested in them.",
  image: firm,
  imageAlt: "A small team working together around a table in a bright office",
  imageCredit: {
    name: "Mikael Blomkvist / Pexels",
    url: "https://www.pexels.com/photo/6476255/",
  },
  story: {
    title: "A partnership, not a platform.",
    paragraphs: [
      "Nadia Mensah and Theo Marchetti started Northwood after a decade of building companies of their own. They had raised from firms that wrote many small cheques and stayed distant, and from a few that wrote fewer and stayed close. The second kind made the difference, so they set out to be that kind of firm.",
      "Fourteen years and five funds later, the model has not changed. We lead seed and Series A rounds, take a board seat, and keep most of each fund in reserve for the companies already in it. Each partner works with a small number of founders at a time, and the partner who makes the case for an investment is the one who stays with it.",
      "The firm is owned by its partners and funded by a small group of foundations, endowments and family offices, most of whom have been with us since the first fund.",
    ],
  },
  principles: {
    title: "How we work",
    items: [
      {
        title: "Fewer, larger first cheques",
        body: "We make around ten new investments a year, so we can lead, own enough to matter, and give each company real time.",
      },
      {
        title: "Reserves for the long climb",
        body: "More than half of every fund is kept for follow-on rounds. Founders do not have to win us over twice.",
      },
      {
        title: "One partner, start to finish",
        body: "The partner who leads the investment joins the board and stays there until the company no longer needs us.",
      },
      {
        title: "Plain answers, quickly",
        body: "A decision within three weeks of a first meeting, and a reason when the answer is no.",
      },
    ],
  },
  timeline: {
    title: "Fourteen years",
    /** Hand-written milestones. Fund launches and exits are added from the data. */
    milestones: [
      { year: 2012, text: "Northwood is founded in London by Nadia Mensah and Theo Marchetti." },
      { year: 2014, text: "The New York office opens with Grant Holloway." },
      { year: 2016, text: "Clara Novak opens the Stockholm office." },
      { year: 2018, text: "The platform team forms to help founders hire and sell." },
      { year: 2022, text: "Grant Holloway becomes managing partner." },
    ],
  },
};
