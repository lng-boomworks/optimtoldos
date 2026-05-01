import { SERVICE_CITIES_SCHEMA } from "../data/cities";
import type { Locale } from "../i18n/index";

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

type LocaleOpt = { locale?: Locale };

export function buildFAQSchema(faqs: FAQ[], opts: LocaleOpt = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(opts.locale && { inLanguage: opts.locale }),
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

export function buildBreadcrumbSchema(items: Breadcrumb[], opts: LocaleOpt = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    ...(opts.locale && { inLanguage: opts.locale }),
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
  locale?: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    ...(opts.locale && { inLanguage: opts.locale }),
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
  locale?: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    ...(opts.locale && { inLanguage: opts.locale }),
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
  locale?: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://optimtoldos.com/#business",
    ...(opts.locale && { inLanguage: opts.locale }),
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

export function buildProductSchema(opts: {
  name: string;
  description: string;
  image: string;
  url: string;
  priceRange?: string;
  lowPrice?: string;
  highPrice?: string;
  priceCurrency?: string;
  category: string;
  locale?: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    ...(opts.locale && { inLanguage: opts.locale }),
    name: opts.name,
    description: opts.description,
    image: opts.image,
    url: opts.url,
    category: opts.category,
    brand: {
      "@type": "Brand",
      name: "Optim Toldos",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: opts.priceCurrency ?? "EUR",
      ...(opts.lowPrice && { lowPrice: opts.lowPrice }),
      ...(opts.highPrice && { highPrice: opts.highPrice }),
      ...(opts.priceRange && { priceSpecification: { "@type": "PriceSpecification", price: opts.priceRange, priceCurrency: opts.priceCurrency ?? "EUR" } }),
      availability: "https://schema.org/InStock",
      seller: { "@id": "https://optimtoldos.com/#business" },
      areaServed: { "@type": "State", name: "Provincia de Alicante" },
    },
  };
}

export function buildContactPageSchema(opts: {
  url: string;
  telephone: string;
  email: string;
  locale?: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    ...(opts.locale && { inLanguage: opts.locale }),
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
