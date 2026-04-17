import { SERVICE_CITIES_SCHEMA } from "../data/cities";

export interface FAQ {
  question: string;
  answer: string;
}

export interface Breadcrumb {
  name: string;
  url: string;
}

export interface ServiceOffer {
  name: string;
}

export function buildFAQSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items: Breadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildServiceSchema(opts: {
  name: string;
  description: string;
  serviceType: string;
  url: string;
  offers?: ServiceOffer[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    provider: { "@id": "https://optimtoldos.com/#business" },
    areaServed: [
      ...SERVICE_CITIES_SCHEMA,
      { "@type": "State", name: "Provincia de Alicante" },
    ],
    description: opts.description,
    serviceType: opts.serviceType,
    url: opts.url,
    ...(opts.offers && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: opts.name,
        itemListElement: opts.offers.map((o) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: o.name },
        })),
      },
    }),
  };
}

export function buildCollectionPageSchema(opts: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: opts.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

export function buildOrganizationSchema(opts: {
  name: string;
  description: string;
  url: string;
  foundingDate: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://optimtoldos.com/#business",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    foundingDate: opts.foundingDate,
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Elche",
        addressRegion: "Alicante",
        addressCountry: "ES",
      },
    },
    areaServed: SERVICE_CITIES_SCHEMA,
    knowsLanguage: ["es", "en"],
  };
}

export function buildContactPageSchema(opts: {
  url: string;
  telephone: string;
  email: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: opts.url,
    mainEntity: {
      "@type": "ContactPoint",
      telephone: opts.telephone,
      email: opts.email,
      contactType: "customer service",
      areaServed: { "@type": "State", name: "Provincia de Alicante" },
      availableLanguage: ["es", "en"],
    },
  };
}
