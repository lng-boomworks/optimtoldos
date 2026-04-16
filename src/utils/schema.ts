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
    areaServed: { "@type": "State", name: "Provincia de Alicante" },
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
