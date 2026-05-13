import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Bridge to Google Consent Mode v2. The default-deny snippet in Base.astro
// creates window.gtag before vcc runs; we flip the four EU UCP signals here
// based on accepted categories. Compliance pivot: the `advertisement` category
// is required because the optimtoldos.com Google account is registered for
// Google Ads (customer 689-629-0635), so Google's EU UCP scanner expects the
// banner to expose an ad-personalization opt-in even if the site doesn't
// currently load Google Ads tags.
function syncGoogleConsentMode() {
  if (typeof window.gtag !== 'function') return;
  const ads = CookieConsent.acceptedCategory('advertisement') ? 'granted' : 'denied';
  window.gtag('consent', 'update', {
    analytics_storage: CookieConsent.acceptedCategory('analytics') ? 'granted' : 'denied',
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  });
}

CookieConsent.run({
  guiOptions: {
    consentModal: { layout: 'box inline', position: 'bottom right' },
    preferencesModal: { layout: 'box', position: 'right' },
  },
  categories: {
    necessary: {
      enabled: true,
      readOnly: true,
    },
    functional: {},
    analytics: {
      services: {
        ga4: {
          label: 'Google Analytics 4',
          cookies: [{ name: /^_ga/ }],
        },
      },
    },
    advertisement: {
      services: {
        googleAds: {
          label: 'Google Ads',
          cookies: [{ name: /^(_gcl_|IDE$|NID$|test_cookie$)/ }],
        },
      },
    },
  },
  onConsent: syncGoogleConsentMode,
  onChange: syncGoogleConsentMode,
  language: {
    default: 'es',
    autoDetect: 'document',
    translations: {
      es: {
        consentModal: {
          title: 'Tu privacidad',
          description:
            'Utilizamos cookies y, en aplicaciones móviles, identificadores de anuncio para el funcionamiento del sitio, fines analíticos y personalización de anuncios. Con tu consentimiento, Google y nosotros podemos usar estas tecnologías para mostrarte anuncios personalizados y no personalizados (Google Analytics, Google Ads). Consulta cómo <a href="https://business.safety.google/privacy/" target="_blank" rel="noopener">Google trata tus datos</a> y nuestra <a href="/politica-cookies/">política de cookies</a>.',
          acceptAllBtn: 'Aceptar todas',
          acceptNecessaryBtn: 'Solo esenciales',
          showPreferencesBtn: 'Gestionar preferencias',
        },
        preferencesModal: {
          title: 'Preferencias de cookies',
          acceptAllBtn: 'Aceptar todas',
          acceptNecessaryBtn: 'Solo esenciales',
          savePreferencesBtn: 'Guardar preferencias',
          closeIconLabel: 'Cerrar',
          sections: [
            {
              title: 'Uso de cookies e identificadores de anuncio',
              description:
                'Usamos cookies e identificadores de anuncio (en aplicaciones móviles) para el correcto funcionamiento del sitio, fines analíticos y personalización de anuncios, tanto personalizados como no personalizados. Puedes elegir qué categorías aceptas. Consulta cómo <a href="https://business.safety.google/privacy/" target="_blank" rel="noopener">Google trata tus datos</a> y nuestra <a href="/politica-cookies/">política de cookies</a>.',
            },
            {
              title: 'Estrictamente necesarias',
              description:
                'Imprescindibles para el funcionamiento del sitio y no se pueden desactivar.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Funcionales',
              description:
                'Permiten cargar contenido externo como Google Maps en la página de zonas de servicio. Sin tu consentimiento, ese contenido permanece desactivado.',
              linkedCategory: 'functional',
            },
            {
              title: 'Analíticas',
              description:
                'Usamos Google Analytics 4 para entender cómo se utiliza el sitio. Las cookies (_ga, _ga_*) solo se cargan si las aceptas.',
              linkedCategory: 'analytics',
            },
            {
              title: 'Publicidad y personalización de anuncios',
              description:
                'Permiten a Google Ads medir conversiones, crear audiencias de remarketing y mostrarte anuncios personalizados y no personalizados en otros sitios. Las cookies (_gcl_*, IDE, NID, test_cookie) solo se cargan si las aceptas.',
              linkedCategory: 'advertisement',
            },
          ],
        },
      },
      en: {
        consentModal: {
          title: 'Your privacy',
          description:
            'We use cookies and, in mobile apps, advertising identifiers for site operation, analytics and ad personalisation. With your consent, Google and we may use these technologies to show you personalised and non-personalised ads (Google Analytics, Google Ads). See how <a href="https://business.safety.google/privacy/" target="_blank" rel="noopener">Google uses your data</a> and our <a href="/en/cookie-policy/">cookie policy</a>.',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Essential only',
          showPreferencesBtn: 'Manage preferences',
        },
        preferencesModal: {
          title: 'Cookie preferences',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Essential only',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close',
          sections: [
            {
              title: 'Use of cookies and advertising identifiers',
              description:
                'We use cookies and (in mobile apps) advertising identifiers to keep the site working, for analytics, and for ad personalisation - both personalised and non-personalised. You can choose which categories to accept. See how <a href="https://business.safety.google/privacy/" target="_blank" rel="noopener">Google uses your data</a> and our <a href="/en/cookie-policy/">cookie policy</a>.',
            },
            {
              title: 'Strictly necessary',
              description:
                'Required for the site to function and cannot be disabled.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Functional',
              description:
                'Enable embedded content like Google Maps on the service areas page. Without consent, this content stays off.',
              linkedCategory: 'functional',
            },
            {
              title: 'Analytics',
              description:
                'We use Google Analytics 4 to understand how the site is used. The (_ga, _ga_*) cookies only load if you accept this category.',
              linkedCategory: 'analytics',
            },
            {
              title: 'Advertising and ad personalisation',
              description:
                'Allow Google Ads to measure conversions, build remarketing audiences, and show you personalised and non-personalised ads on other sites. The (_gcl_*, IDE, NID, test_cookie) cookies only load if you accept this category.',
              linkedCategory: 'advertisement',
            },
          ],
        },
      },
    },
  },
});
