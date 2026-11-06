# Customization Guide

Use this guide when adapting Northwood for a real firm.

Most of the site is built from three content collections that reference each other: **companies**, **team**, and **insights**. A company names its lead partner, an insight names its authors and the companies it discusses, and the pages, filters, and statistics are derived from those links. Copy that is not content lives in small files in [src/config](./src/config).

## Site Settings

Edit [src/config/site.ts](./src/config/site.ts) first. It controls the firm's `name` and `legalName`, the tagline, default metadata, canonical domain, language and date locale, the `currency` fund sizes are written in, the `email` used as the author address in the RSS feed and in the mobile menu, the calls to action, the pitch, contact, and newsletter forms, the `legal` line at the foot of every page, and social links.

Update `siteConfig.siteUrl` before building for production. Canonical URLs, social image URLs, RSS, robots, sitemap, and JSON-LD all depend on it.

`siteConfig.actions.primary` is the "Pitch us" call to action in the header, the mobile menu, the hero, the closing panel, and the pitch band on sector pages.

`siteConfig.legal` is the small print under the footer. The demo text says the firm is fictional; replace it with your own disclaimer, or set it to an empty string to remove it.

`siteConfig.socials` are the icon links in the footer, each with a `label` and an `href`. The label picks the icon through [src/lib/socials.ts](./src/lib/socials.ts), which knows Bluesky, Facebook, GitHub, Instagram, LinkedIn, Mastodon, RSS, Threads, X, and YouTube; any other label shows a generic link icon until you add it there. Links that start with `http` are also listed as `sameAs` in the structured data.

The logo is [src/assets/brand/logo.svg](./src/assets/brand/logo.svg), three rising shards beside the wordmark, drawn in `currentColor` so it follows the text colour; [src/components/ui/Wordmark.astro](./src/components/ui/Wordmark.astro) inlines it in the header and footer. Replace the file with your own and keep `fill="currentColor"`. Right-clicking the logo opens a small menu, [src/components/chrome/LogoMenu.astro](./src/components/chrome/LogoMenu.astro), to copy the logo as SVG or download it; the downloaded copy is filled with `#121212` in that file, so change it there if you change `--ink`. The favicon is [public/favicon.svg](./public/favicon.svg), the same shards in white on a near-black tile.

## Navigation

The header and the mobile menu read `navigation` in [src/config/site.ts](./src/config/site.ts), a flat list of links with a `label` and an `href`. The link for the current section is underlined. The footer columns are `footerNavigation` in the same file, each with a `title` and its `links`; links to the portfolio can carry filters, such as `/portfolio/?status=exited`.

On wide screens the links sit centred between the logo and the call to action. The header is transparent at the top of the page and takes the solid page colour once you scroll; it slides away as you scroll down and returns as soon as you scroll up. On the homepage it sits over the hero photo in light text and turns solid once the hero has scrolled out from under it; pass `overlayHeader` to `BaseLayout` to do the same on another page that opens on a dark image. Below `64rem` the links move into a full-screen menu behind the "Menu" button, closed with the button or `Escape`.

## Portfolio

Each company is a folder in [src/content/companies](./src/content/companies) holding an `index.md` and, optionally, a `logo.svg`. The folder name is the company's id and its URL: `src/content/companies/tidewater/` becomes `/portfolio/tidewater/`.

```md
---
name: Tidewater
tagline: Long-duration storage for coastal grids
sector: climate
stage: Seed
invested: 2016
fund: Fund II
partner: clara-novak
founded: 2015
hq: Oslo, Norway
website: https://tidewater.example
founders:
  - name: Ingrid Solberg
    role: Co-founder and CEO
exit:
  type: IPO
  by: Oslo Børs
  year: 2024
featured: true
---

Two or three paragraphs on the company, shown on its page.
```

| Field      | Required | Notes                                                                                                     |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `name`     | Yes      |                                                                                                           |
| `tagline`  | Yes      | Up to 80 characters. The headline on the company page and the line on its card.                           |
| `sector`   | Yes      | A key from `sectors` in [src/config/portfolio.ts](./src/config/portfolio.ts).                             |
| `stage`    | Yes      | The round of your first investment, one of `stages` in the same file.                                     |
| `invested` | Yes      | The year of your first investment.                                                                        |
| `fund`     | Yes      | A fund `name` from [src/config/funds.ts](./src/config/funds.ts). The build fails on an unknown one.       |
| `partner`  | Yes      | The folder name of the team member who leads the investment.                                              |
| `founded`  | Yes      | The year the company was founded.                                                                         |
| `hq`       | Yes      | Headquarters, such as `Oslo, Norway`.                                                                     |
| `website`  | No       | Printed with an outbound link.                                                                            |
| `founders` | No       | Each with a `name` and a `role`.                                                                          |
| `exit`     | No       | Marks the company as exited. `type` is `Acquisition` or `IPO`, `by` the acquirer or exchange, and `year`. |
| `featured` | No       | Shows the company in the selected portfolio on the homepage.                                              |
| `rounds`   | No       | Funding history, oldest first. See below.                                                                 |

A company with no `exit` is active. Its status reads "Active", "Acquired by Palisade, 2023", or "IPO, Nasdaq, 2021", with a filled dot while active and a ring once exited.

### Logos

Put a `logo.svg` beside the company's `index.md` and it is inlined wherever the company appears. Draw it in `currentColor`, with a `viewBox` and no fixed `width` or `height`; it is sized to the text around it, so a horizontal lockup about four times as wide as it is tall sits best. A company without a logo shows its name, set in the theme's font. The demo logos are fictional marks.

### The directory

[src/pages/portfolio/index.astro](./src/pages/portfolio/index.astro) lists every company with filters for sector, the stage of first investment, and status, a text search over names and taglines, and a grid or list view. Each select only offers the sectors and stages that have companies, with their counts. The filters are written to the URL, so `/portfolio/?sector=climate&status=active&view=list` opens filtered and can be linked to; the "Open in the directory" link on each sector page and the Active and Exited links in the footer use this. Without JavaScript the page lists every company in the grid.

The page's title and intro are `portfolioPage` in [src/config/portfolio.ts](./src/config/portfolio.ts).

### Funding history

`rounds` lists a company's funding, oldest first, and draws as a timeline on its page with the total raised beside it. Each round has a `date` as `YYYY-MM`, a `round` name, and optionally an `amount` in millions of `siteConfig.currency`, the `lead` investor, and `northwood: true` when the firm took part, which fills its marker and adds a tag. An `exit` is added as the last step. Leave `rounds` out and the section is not shown.

```yaml
rounds:
  - date: "2016-05"
    round: Seed
    amount: 5
    lead: Fjordline Ventures
    northwood: true
```

The demo rounds, leads, and amounts are invented. In a CMS without list fields, such as Framer, keep rounds as a separate collection that references its company.

### Sectors

`sectorKeys` in [src/config/portfolio.ts](./src/config/portfolio.ts) lists the sectors, and `sectors` gives each its page copy: a `label`, a one-line `description` used on the homepage and the sectors index, the `thesis` paragraphs that open its page, and three `themes` under "What we look for". To add a sector, add its key to `sectorKeys` and an entry to `sectors`; the order there is the order everywhere. `stages` lists the rounds, in order.

[src/pages/sectors/index.astro](./src/pages/sectors/index.astro) shows every sector as a card with a few of its company logos, and [src/pages/sectors/[sector].astro](./src/pages/sectors/[sector].astro) builds a page per sector at `/sectors/<key>/`: a dark, grainy header with the thesis and figures counted from the portfolio, the themes, the sector's companies, the team members whose `focus` includes it, insights about its companies, and a pitch band. The homepage sector rows, the sector fact on company pages, the focus on team profiles, and the sector bars on the funds page all link here. `sectorsPage` in the same file holds the index title and intro.

### Company pages

[src/pages/portfolio/[slug].astro](./src/pages/portfolio/[slug].astro) builds a page per company: the logo, the tagline as the headline, its status, the facts (sector, first investment, fund, founded, headquarters, website), the lead partner with their portrait, the body, the founders, the funding history, any insights that list the company, and three more companies from the same sector.

## Team

Each person is a folder in [src/content/team](./src/content/team) holding an `index.md` with their bio and the portrait it names. The folder name is their id and URL, and the value that companies and insights use to refer to them.

```md
---
name: Clara Novak
role: Partner
group: Partners
portrait: ./portrait.jpg
location: Stockholm
focus: [climate, industrials]
joined: 2016
previously: Ran grid storage projects at a Nordic utility
email: clara@example.com
linkedin: https://www.linkedin.com/
x: https://x.com/
order: 3
---

A bio of two or three paragraphs.
```

- `group` is one of `teamGroups` in [src/config/team.ts](./src/config/team.ts). The team page lists the groups in that order, the first one large, and the homepage shows the first group as "The partners". Rename or add groups there.
- `order` sorts people within a group, lowest first.
- `focus` takes sector keys and links each to its sector page.
- `previously`, `joined`, `email`, `linkedin`, and `x` are optional; each prints only when set.

Use a portrait at least 900 pixels tall, with the face in the upper half; it is cropped to 4:5 from the top. Portraits are shown in black and white through the `--portrait-filter` token in [src/styles/global.css](./src/styles/global.css), so photos taken in different places sit together. Set it to `none` to show them in colour.

A profile at [src/pages/team/[slug].astro](./src/pages/team/[slug].astro) lists the companies the person leads, found from each company's `partner`, and the insights they wrote, found from each entry's `authors`. A person with neither gets a profile without those sections. The page's share image is their portrait.

The team page's title and intro are `teamPage` in [src/config/team.ts](./src/config/team.ts).

## Insights

Each entry is a folder in [src/content/insights](./src/content/insights) holding an `index.md` (or `index.mdx`) and any images it uses. The folder name is its URL: `src/content/insights/q3-2026-letter/` becomes `/insights/q3-2026-letter/`.

```md
---
title: "Third-quarter letter, 2026"
description: "Between 40 and 220 characters, used on cards, in search, and as the meta description."
date: 2026-10-08
category: letters
authors: [grant-holloway, sofia-ortega]
period: "Q3 2026"
companies: [albedo, juniper, payfield]
---
```

| Field         | Required | Notes                                                                                           |
| ------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `title`       | Yes      | Up to 110 characters.                                                                           |
| `description` | Yes      | 40 to 220 characters.                                                                           |
| `date`        | Yes      |                                                                                                 |
| `updated`     | No       | Printed under the entry and used as `dateModified` in the structured data.                      |
| `category`    | Yes      | A key from `categories` in [src/config/insights.ts](./src/config/insights.ts).                  |
| `authors`     | Yes      | Team folder names, lead author first. Each is linked to their profile in the byline.            |
| `cover`       | No       | An image beside the entry, such as `./cover.jpg`. Needs `coverAlt`; `coverCredit` is optional.  |
| `period`      | No       | Printed large on the card of an entry without a cover, such as `Q3 2026` on a letter.           |
| `companies`   | No       | Company folder names. Listed with their logos under the entry and linked from the company page. |
| `featured`    | No       | Pins the entry to the lead slot on the insights index.                                          |
| `draft`       | No       | Shown in development, left out of the production build.                                         |

An entry without a cover shows a dark card carrying its category and `period` (or its year) in place of the image. A cover is cropped to 3:2 on cards and 21:9 on the entry, and becomes the entry's share image, cropped to 1200x630 at build time.

The four categories are essays, investor letters, playbooks, and news, each with a `label` and a `description` in [src/config/insights.ts](./src/config/insights.ts). Add, rename, or remove them there; each has an archive at `/insights/category/<key>/`. `ENTRIES_PER_PAGE` in the same file sets the page size of the index and the archives.

Every entry is set in one centred column, with a Share button beside the byline and again at the end, above the companies it discusses. Entries in `letters` are set as letters: the opening line a size up, and a sign-off after the body built from the authors, so do not write one into the text. Markdown tables scroll sideways inside their own box on a phone.

## Funds

[src/config/funds.ts](./src/config/funds.ts) lists each fund with its `name`, `vintage`, `size` (in millions of `siteConfig.currency`), `companies`, `exits`, `status`, `focus`, and, optionally, `tvpi`, `dpi`, and `irr`; a missing figure prints as a dash. `companies` and `exits` count every company in the fund, including those not in the directory.

The firm-wide totals are summed from that list in [src/lib/funds.ts](./src/lib/funds.ts): committed capital, the number of funds, companies backed, exits, and the year of the first fund. They appear in the stats band and the funds section on the homepage and on the funds page, and each fund's close is added to the about page's timeline, so adding a fund updates them all.

The funds page, [src/pages/funds.astro](./src/pages/funds.astro), shows the totals, a table of every fund with its size drawn as a bar, the date the figures were measured (`asOf`), and the `disclosure` under it, both in `fundsPage`. Below that, "The portfolio, by the numbers" counts the companies in the directory by sector, by stage of first investment, and by status, and "Realised" lists every exited company, newest first. These come from the companies collection, so they change as you add or exit companies.

The figures in the demo are illustrative. Have performance figures and the disclosure reviewed before you publish them.

## Pitch Form

The pitch page is [src/pages/pitch.astro](./src/pages/pitch.astro), with its copy in [src/config/pitch.ts](./src/config/pitch.ts): the headline and intro, `criteria` (what you look for), `process` (the steps after a pitch, each with a `timing`), the form's `stages`, `raising` ranges, and `consent` line, and the `faq`, whose questions open one at a time. The sector select is built from the sectors in [src/config/portfolio.ts](./src/config/portfolio.ts), plus "Something else".

The form posts `company`, `website`, `name`, `email`, `sector`, `stage`, `location`, `raising`, `one_liner`, `why`, `deck`, and `consent` to `siteConfig.pitch`:

```ts
pitch: {
  enabled: true,
  action: "https://example.com/pitch",
  method: "post",
}
```

It only submits when `enabled` is `true` and `action` is set. Until then the fields can be filled in but the send button is disabled, and a note says so. Any form endpoint that accepts a normal POST works, such as Formspree, Basin, or your own handler.

## Legal Pages

Privacy, terms of use, and important information (regulatory disclosures) are Markdown pages in [src/pages/legal](./src/pages/legal), each with a `title`, a `description`, and an `updated` date, set by [src/layouts/LegalLayout.astro](./src/layouts/LegalLayout.astro). Their text is a starting point only; have your own reviewed by counsel and your compliance team. They are linked from `legalNavigation` in [src/config/site.ts](./src/config/site.ts), shown under the footer.

## Contact

The contact page is [src/pages/contact.astro](./src/pages/contact.astro), with its copy in [src/config/contact.ts](./src/config/contact.ts): the headline and intro, the `inboxes` (each with a `label`, a `detail`, an `email`, and an optional `href`, which adds a link beside it), and the `topics` in the "I'm writing about" select. Link to `/contact/?topic=<value>` to preselect one.

`offices` in the same file lists each office with its `city`, its `address` as an array of lines, and an optional `phone`. They appear on the contact page, the about page, and in the footer.

The form posts `topic`, `name`, `email`, `organisation`, and `message` to `siteConfig.contact`, and is enabled the same way as the pitch form.

## Homepage

The homepage is assembled in [src/pages/index.astro](./src/pages/index.astro) from sections in [src/components/home](./src/components/home). Reorder or remove them freely. Their copy lives in `home` in [src/config/home.ts](./src/config/home.ts):

| Section            | Component                 | Config key  | Data                                       |
| ------------------ | ------------------------- | ----------- | ------------------------------------------ |
| Hero               | `Hero.astro`              | `hero`      | A photograph                               |
| Stats band         | `Stats.astro`             | `stats`     | Totals from the funds                      |
| Selected companies | `SelectedPortfolio.astro` | `portfolio` | Featured companies, then the newest        |
| Where we invest    | `Sectors.astro`           | `sectors`   | Sectors, with a count of companies in each |
| The partners       | `Partners.astro`          | `team`      | The first team group                       |
| Funds              | `Funds.astro`             | `funds`     | Fund sizes and the total                   |
| From the journal   | `Journal.astro`           | `insights`  | The three newest entries                   |
| Closing panel      | `PitchBand.astro`         | `closing`   |                                            |

`home.portfolio.count` sets how many companies the selected portfolio shows; featured companies come first, topped up with the most recent investments.

### The hero

The hero is a full-width photograph under the header, with film grain over it and the `title`, `lead`, and two buttons centred on it: the primary call to action and `secondary`. Swap the `image` import at the top of [src/config/home.ts](./src/config/home.ts) to change the photo, and update `imageAlt` and `credit` with it. A dark, low-contrast picture with its subject in the lower half keeps the headline readable; the photo is anchored to its bottom edge, so tall screens show more sky.

### The stats band

The dark band under the hero prints the `stats` copy and the firm totals from [src/config/funds.ts](./src/config/funds.ts), centred, with a link to the about page.

### Grain and glow

Two utilities in [src/styles/global.css](./src/styles/global.css) give the dark panels their texture. Add `grain` to a positioned element for a film-grain overlay; its strength is the `--grain` property, from 0 to 1. Add `glow` for a soft warm-to-cool band of light along the bottom edge. The hero, the stats band, the closing panel, sector headers, the principles on the about page, and letter cards in the journal all use them.

### The closing panel

[src/components/ui/PitchBand.astro](./src/components/ui/PitchBand.astro) is the grainy panel with a spectral edge that closes the homepage, with the `closing` copy, and every sector page. Pass a `title` and an optional `text`.

## About

The about page is [src/pages/about.astro](./src/pages/about.astro), with its content in [src/config/about.ts](./src/config/about.ts): the headline and intro, the photo and its credit, the `story`, the four `principles`, and the timeline's hand-written `milestones`. The timeline adds every fund close from [src/config/funds.ts](./src/config/funds.ts) and every exit from the companies collection, grouped by year, so you only write the milestones that are not already data. The offices close the page.

## Images

Photographs use Astro's image pipeline and are served as responsive WebP at build time. The demo photographs come from Pexels and Unsplash. Covers and page photos carry a credit where they appear; portraits do not. Images sit in rounded frames (the `media` class, or `rounded-(--radius)`).

## Sharing

Every insight has a Share button beside the byline and another at the end of the text. Both open [src/components/chrome/ShareSheet.astro](./src/components/chrome/ShareSheet.astro), a native `<dialog>` with X, LinkedIn, Facebook, email, WhatsApp, Telegram, and Threads, plus Bluesky, Mastodon, Reddit, and Pinterest behind "More", and the page link with a copy button. Add or remove networks in the `targets` and `extraTargets` lists at the top of the file.

## Search

Search covers the insights, so it only loads there: the Search button beside the categories, `Ctrl + K` or `Command + K`, or `/` outside a form field opens the palette in [src/components/chrome/SearchDialog.astro](./src/components/chrome/SearchDialog.astro), and `/insights/search/` is a full results page that lists every entry without JavaScript and filters as you type. Both rank results with the same function in [src/lib/search.ts](./src/lib/search.ts): title matches first, then category and the companies an entry discusses, then everything else, matched on word starts.

The index is served from [src/pages/search-index.json.ts](./src/pages/search-index.json.ts) and fetched the first time search is opened. It carries each entry's title, description, category, authors, date, companies, and URL, but not its body. For full-text search across a large archive, consider [Pagefind](https://pagefind.app/).

## Feeds and Social Cards

`/rss.xml` carries the twenty newest insights. Insights with a cover share it, and team profiles share their portrait, cropped to 1200x630 at build time; every other page uses `public/og-image.png`, a 1200x630 card showing the homepage hero. Replace it with your own card at the same size after rebranding.

Structured data is built in [src/lib/schema.ts](./src/lib/schema.ts): `Organization` and `WebSite` on most pages, `Article` with its authors on insights, `ProfilePage` with a `Person` on team profiles, and an `Organization` for each portfolio company, each with a `BreadcrumbList`.

## Newsletter

The signup at the top of the footer is provider-neutral. Configure `siteConfig.newsletter`:

```ts
newsletter: {
  enabled: true,
  action: "https://example.com/subscribe",
  method: "post",
  emailFieldName: "email",
  title: "Letters from Northwood",
  description: "Our quarterly letter and the occasional essay, by email. Four or five times a year.",
}
```

The form only submits when `enabled` is `true` and `action` is set. Until then the field and button are disabled, and a note says so.

## Adding Pages

To add a page such as `/press/`, create `src/pages/press.astro`, wrap it in `BaseLayout`, and open it with `PageHeader`, which takes a `title` and a `lead`. Reuse the pieces already in the theme: `.shell` for the padded page width, `.section` for vertical spacing, `SectionHead` for a section heading with an optional link, `text-display-xl`, `text-display-lg`, `text-display-md`, `text-title`, and `text-lead` for type, `text-stat` for large figures, `on-night` for a dark section (with `grain` and `glow` for texture), `bg-surface` for a white band, `media` for a rounded image frame, `.label` for small muted text, and `btn btn-primary`, `btn btn-outline`, and `btn btn-light` for buttons (see [Buttons](#buttons)). [src/pages/contact.astro](./src/pages/contact.astro) is a good starting point. Then link to it from `navigation` or `footerNavigation`.

## Icons

Interface icons come from [Lucide](https://lucide.dev/) in [src/icons/lucide](./src/icons/lucide), trimmed to the ones the theme uses, and social and share marks from Bootstrap Icons in [src/icons/bootstrap](./src/icons/bootstrap), each folder with its license notice. [src/components/ui/Icon.astro](./src/components/ui/Icon.astro) loads both by file name: `<Icon name="arrow-right" />` for a Lucide outline, and `<Icon name="social-linkedin" />` for a Bootstrap mark. To add an icon, drop its SVG from Lucide into the folder and use its file name.

## Theme Tokens

Colours, type sizes, the corner radius, and the page width are custom properties at the top of [src/styles/global.css](./src/styles/global.css), exposed to Tailwind as utilities (`bg-page`, `bg-surface`, `text-muted`, `bg-night`, `text-night-muted`, `text-blue`, and so on).

- `--page` is the light grey ground, `--surface` the white of cards, forms, and bands, and `--wash` and `--sunken` deeper steps for hover and image placeholders.
- `--ink` is the near-black used for text and primary buttons, with `--ink-soft` for body copy. `--muted` is quieter text and `--faint` is for decoration only.
- `--line` and `--line-strong` are the hairlines.
- `--night` is the charcoal of the dark panels and the mobile menu, with `--night-line` for hairlines on it and `--night-ink` and `--night-muted` for text. Add `on-night` to a section to set its background and text together. `--black` is the footer.
- Colour is kept for accents: the warm-to-cool `glow` on dark panels, `--blue` for the fund charts, focus rings, and link hovers, and `--green` for an active company.
- `--radius` rounds cards, media, and panels.
- `--portrait-filter` sets how portraits are drawn; see [Team](#team).
- `--measure` is the content width and `--gutter` the side padding, used by `.shell`.

The type scale is the `--text-display-*`, `--text-title`, `--text-lead`, `--text-label`, and `--text-stat` tokens in the `@theme` block, each with its line height and letter spacing.

### Buttons

`btn` with `btn-primary` (ink), `btn-light` (pale), or `btn-outline` (a hairline ring) makes a button. End it with `<Icon name="arrow-right" class="arrow" />` and the arrow sits in its own small square box inside the button, in the opposite colour. The demo keeps the arrow for primary and pale buttons and leaves outline buttons as plain labels; the box colours are the `--chip-bg` and `--chip-ink` properties of each variant. Add `btn-sm` for the smaller size.

## Fonts

Northwood self-hosts **Outfit**, an OFL-licensed variable geometric sans, in [public/fonts/outfit](./public/fonts/outfit), split into Latin and Latin Extended files with its license. It sets everything, from headlines at weight 400 with tight tracking to body copy and figures. Code falls back to the system monospace.

To swap typefaces, replace the `@font-face` rules and the `--font-sans` token at the top of `global.css`, and update the font preload in [src/layouts/BaseLayout.astro](./src/layouts/BaseLayout.astro).

## Motion

- Page headers rise in once on load with a short stagger (the `rise` class, delayed by `--i`).
- Sections below the fold carry `reveal`, which animates on a CSS view timeline where supported and falls back to a small IntersectionObserver in `BaseLayout.astro` elsewhere.
- The hero photo settles from a slight zoom on load.
- Links underline from the left, arrows nudge forward on hover, and photos ease in slightly larger.
- Everything settles into a still frame under `prefers-reduced-motion: reduce`.
