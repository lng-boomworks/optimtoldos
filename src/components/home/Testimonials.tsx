import { useEffect } from "react";
import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { t, type Locale } from "../../i18n/index";

interface TestimonialsProps {
  locale?: Locale;
}

// Reviews section scaffold — awaiting real Google Business Profile integration.
// To activate the Elfsight Google Reviews widget:
//   1. Subscribe to Elfsight and create a widget connected to the Optim Toldos
//      Google Business Profile.
//   2. Paste the widget's class name into ELFSIGHT_WIDGET_CLASS.
//   3. Set ELFSIGHT_ENABLED to true.
const ELFSIGHT_WIDGET_CLASS = "";
const ELFSIGHT_ENABLED = false;
const GOOGLE_BUSINESS_URL = "https://www.google.com/maps/search/?api=1&query=Optim+Toldos+Elche";

export function Testimonials({ locale = 'es' }: TestimonialsProps) {
  useEffect(() => {
    if (!ELFSIGHT_ENABLED || typeof document === 'undefined') return;
    if (document.querySelector('script[src*="elfsightcdn.com"]')) return;
    const s = document.createElement('script');
    s.src = 'https://elfsightcdn.com/platform.js';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <AnimatedHeading
            text={t(locale, 'home.testimonials.heading')}
            tag="h2"
          />
        </div>

        {ELFSIGHT_ENABLED && ELFSIGHT_WIDGET_CLASS ? (
          <FadeIn direction="up">
            <div className={ELFSIGHT_WIDGET_CLASS} />
          </FadeIn>
        ) : (
          <FadeIn direction="up">
            <div className="rounded-2xl bg-sand p-10 md:p-14 text-center">
              <p className="text-lg text-body leading-relaxed mb-8 max-w-2xl mx-auto">
                {t(locale, 'home.testimonials.placeholder')}
              </p>
              <a
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-terracotta text-white font-medium hover:opacity-90 transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12c0-.813-.082-1.605-.236-2.371H12v4.488h6.666c-.289 1.479-1.162 2.727-2.473 3.563v2.957h4.002c2.342-2.158 3.691-5.33 3.691-9.036z"/>
                  <path d="M12 24c3.24 0 5.961-1.074 7.947-2.906l-4.002-2.957c-1.107.746-2.528 1.178-3.945 1.178-3.035 0-5.605-2.049-6.526-4.803H1.356v3.045C3.334 21.436 7.387 24 12 24z"/>
                  <path d="M5.474 14.512c-.234-.703-.369-1.453-.369-2.223s.135-1.52.369-2.223V7.021H1.356C.49 8.75 0 10.717 0 12.808s.49 4.058 1.356 5.787l4.118-3.084z"/>
                  <path d="M12 4.75c1.764 0 3.348.607 4.598 1.799l3.448-3.448C17.957 1.189 15.237 0 12 0 7.387 0 3.334 2.564 1.356 6.311l4.118 3.085C6.395 6.8 8.965 4.75 12 4.75z"/>
                </svg>
                {t(locale, 'home.testimonials.google_cta')}
              </a>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
