import { useEffect, useState } from "react";
import { t, type Locale } from "../i18n/index";
import { slugMap } from "../i18n/slugs";
import { localizedUrl } from "../utils/paths";
import { getConsent, setConsent } from "../utils/consent";

interface CookieBannerProps {
  locale?: Locale;
}

export function CookieBanner({ locale = "es" }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setConsent("accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    setConsent("rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const cookiePolicyPath = localizedUrl(`/${slugMap["cookie-policy"][locale]}`, locale);

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t(locale, "cookie_banner.message")}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up"
    >
      <div className="max-w-5xl mx-auto bg-white border border-border rounded-2xl shadow-xl p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
          <p className="text-sm text-text-body leading-relaxed flex-1">
            {t(locale, "cookie_banner.message")}{" "}
            <a
              href={cookiePolicyPath}
              className="text-terracotta underline hover:text-terracotta-dark"
            >
              {t(locale, "cookie_banner.learn_more")}
            </a>
          </p>
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <button
              onClick={handleReject}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-border text-text-body hover:bg-sand-light transition-colors"
            >
              {t(locale, "cookie_banner.reject")}
            </button>
            <button
              onClick={handleAccept}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-terracotta text-white hover:bg-terracotta-dark transition-colors"
            >
              {t(locale, "cookie_banner.accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
