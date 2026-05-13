import { useEffect, useRef } from 'react';

// Cloudflare Turnstile widget. Renders explicitly (rather than auto-scanning
// for `.cf-turnstile` elements) so we keep deterministic lifecycle in React
// even across hydration and SPA-style navigation.
//
// The widget injects a hidden <input name="cf-turnstile-response" value="..."
// inside the rendered <div>. submitForm() reads that token and includes it
// in the POST body for server-side verification.

declare global {
  interface Window {
    turnstile?: TurnstileNamespace;
  }
}

interface TurnstileNamespace {
  render: (el: HTMLElement | string, options: TurnstileRenderOptions) => string | undefined;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
  getResponse: (widgetId?: string) => string | undefined;
}

interface TurnstileRenderOptions {
  sitekey: string;
  callback?: (token: string) => void;
  'error-callback'?: () => void;
  'expired-callback'?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'flexible' | 'compact';
  appearance?: 'always' | 'execute' | 'interaction-only';
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
// Fallback to Cloudflare's always-pass test site key so local dev works
// without configuration. Replace via PUBLIC_TURNSTILE_SITE_KEY in production.
const SITE_KEY =
  (import.meta.env.PUBLIC_TURNSTILE_SITE_KEY as string | undefined) ||
  '1x00000000000000000000AA';

let scriptPromise: Promise<void> | null = null;
function loadTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src^="${SCRIPT_SRC.split('?')[0]}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('turnstile script failed')), { once: true });
      return;
    }
    const s = document.createElement('script');
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('turnstile script failed'));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

interface TurnstileProps {
  /** Called when the challenge succeeds and a token is available. */
  onToken?: (token: string) => void;
  /** Called when the challenge expires or fails — token becomes invalid. */
  onExpire?: () => void;
  theme?: 'light' | 'dark' | 'auto';
}

export function Turnstile({ onToken, onExpire, theme = 'light' }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          theme,
          callback: (token) => onToken?.(token),
          'expired-callback': () => onExpire?.(),
          'error-callback': () => onExpire?.(),
        });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('[Turnstile]', err);
      });
    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* widget already torn down */
        }
      }
    };
    // Disable exhaustive-deps — Turnstile must render once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className="cf-turnstile-host" />;
}
