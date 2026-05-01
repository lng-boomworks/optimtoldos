import type { ComponentType, SVGProps } from "react";
import { Columns3, PanelTop, RectangleVertical, Sun, Triangle } from "lucide-react";
import { localizedUrl } from "../utils/paths";
import { t, type Locale } from "../i18n/index";
import { slugMap, type PageId } from "../i18n/slugs";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

type ProductEntry = {
  id: PageId;
  labelKey: string;
  taglineKey: string;
  icon: IconType;
};

const ALL_PRODUCTS: ProductEntry[] = [
  { id: "awnings", labelKey: "nav.awnings", taglineKey: "related.awnings.tagline", icon: Sun },
  { id: "pergolas", labelKey: "nav.pergolas", taglineKey: "related.pergolas.tagline", icon: Columns3 },
  { id: "glass-curtains", labelKey: "nav.curtains", taglineKey: "related.curtains.tagline", icon: PanelTop },
  { id: "shade-sails", labelKey: "nav.sails", taglineKey: "related.sails.tagline", icon: Triangle },
  { id: "pvc-windows", labelKey: "nav.windows", taglineKey: "related.windows.tagline", icon: RectangleVertical },
];

interface RelatedProductsProps {
  current: PageId;
  locale?: Locale;
}

export function RelatedProducts({ current, locale = "es" }: RelatedProductsProps) {
  const others = ALL_PRODUCTS.filter((p) => p.id !== current);

  return (
    <section className="bg-white py-14 md:py-16 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl md:text-3xl text-navy text-center mb-3">
          {t(locale, "related.heading")}
        </h2>
        <p className="text-text-muted text-center max-w-xl mx-auto mb-10 leading-relaxed">
          {t(locale, "related.description")}
        </p>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {others.map(({ id, labelKey, taglineKey, icon: Icon }) => {
            const href = localizedUrl(`/${slugMap[id][locale]}`, locale);
            return (
              <li key={id}>
                <a
                  href={href}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-sand-light p-5 transition-all hover:border-terracotta hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-terracotta group-hover:text-white">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="font-serif text-lg text-navy leading-tight mb-1.5">
                    {t(locale, labelKey as any)}
                  </span>
                  <span className="text-xs text-text-muted leading-snug">
                    {t(locale, taglineKey as any)}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
