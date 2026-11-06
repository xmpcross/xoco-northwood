import { siteConfig } from "@/config/site";
import { entryHref, type Entry } from "@/lib/insights";
import { companyHref, type Company } from "@/lib/portfolio";
import { personHref, type Person } from "@/lib/team";

const absolute = (path: string) => new URL(path, siteConfig.siteUrl).toString();

const organization = {
  "@type": "Organization",
  "@id": absolute("/#organization"),
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.siteUrl,
  logo: absolute("/favicon.svg"),
  sameAs: siteConfig.socials
    .filter((social) => social.href.startsWith("http"))
    .map((social) => social.href),
};

const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absolute(item.path),
  })),
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    organization,
    {
      "@type": "WebSite",
      "@id": absolute("/#website"),
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      publisher: { "@id": absolute("/#organization") },
    },
  ],
});

export const articleSchema = (entry: Entry, authors: Person[], image?: string) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: entry.data.title,
      description: entry.data.description,
      image: image ? absolute(image) : undefined,
      datePublished: entry.data.date.toISOString(),
      dateModified: (entry.data.updated ?? entry.data.date).toISOString(),
      author: authors.map((person) => ({
        "@type": "Person",
        name: person.data.name,
        url: absolute(personHref(person)),
      })),
      publisher: organization,
      mainEntityOfPage: absolute(entryHref(entry)),
      inLanguage: siteConfig.language,
    },
    breadcrumbs([
      { name: "Insights", path: "/insights/" },
      { name: entry.data.title, path: entryHref(entry) },
    ]),
  ],
});

export const personSchema = (person: Person, image: string) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      url: absolute(personHref(person)),
      mainEntity: {
        "@type": "Person",
        name: person.data.name,
        jobTitle: person.data.role,
        image: absolute(image),
        worksFor: { "@id": absolute("/#organization") },
        sameAs: [person.data.linkedin, person.data.x].filter(Boolean),
      },
    },
    organization,
    breadcrumbs([
      { name: "Team", path: "/team/" },
      { name: person.data.name, path: personHref(person) },
    ]),
  ],
});

export const companySchema = (company: Company) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: company.data.name,
      description: company.data.tagline,
      url: company.data.website,
      foundingDate: String(company.data.founded),
      founder: company.data.founders.map((founder) => ({ "@type": "Person", name: founder.name })),
    },
    breadcrumbs([
      { name: "Portfolio", path: "/portfolio/" },
      { name: company.data.name, path: companyHref(company) },
    ]),
  ],
});
