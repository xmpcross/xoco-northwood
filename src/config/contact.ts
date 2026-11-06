export interface Office {
  city: string;
  address: string[];
  phone?: string;
}

/** Listed on the contact page, the about page and in the footer. */
export const offices: Office[] = [
  { city: "London", address: ["14 Fitzroy Square", "London W1T 5HP"], phone: "+44 20 7946 0321" },
  {
    city: "New York",
    address: ["211 Elizabeth Street, Floor 4", "New York, NY 10012"],
    phone: "+1 212 555 0148",
  },
  {
    city: "Stockholm",
    address: ["Birger Jarlsgatan 18", "114 34 Stockholm"],
    phone: "+46 8 555 019 20",
  },
];

export const contact = {
  title: "Contact",
  lead: "Founders should use the pitch form, which reaches the whole partnership. For everything else, write to the right inbox below and a person will reply within two working days.",
  /** The inboxes on the contact page. */
  inboxes: [
    {
      label: "Founders",
      detail: "Pitches and introductions",
      email: "pitch@example.com",
      href: "/pitch/",
    },
    { label: "Investors", detail: "For the partners in our funds", email: "ir@example.com" },
    { label: "Press", detail: "Interviews and statements", email: "press@example.com" },
    {
      label: "Everything else",
      detail: "Careers, events and general enquiries",
      email: "hello@example.com",
    },
  ] as { label: string; detail: string; email: string; href?: string }[],
  /** Read as "I'm writing about <label>". `value` is what the form sends; link to `/contact/?topic=<value>` to preselect one. */
  topics: [
    { value: "general", label: "something else" },
    { value: "investors", label: "investing in a fund" },
    { value: "press", label: "a press enquiry" },
    { value: "careers", label: "working at Northwood" },
  ],
};
