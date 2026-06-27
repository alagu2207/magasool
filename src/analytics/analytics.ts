import { Platform } from 'react-native';

/**
 * Lightweight Google Analytics 4 (gtag) + Meta/Facebook Pixel (fbq) wrapper.
 *
 * IDs are read from Expo public env vars at build time. Create a `.env` file in
 * the project root (see `.env.example`) with:
 *   EXPO_PUBLIC_GA_ID=G-XXXXXXXXXX
 *   EXPO_PUBLIC_META_PIXEL_ID=000000000000000
 *
 * If an ID is missing, that provider silently no-ops — nothing breaks. The
 * tracking scripts are injected only on web; on native the calls are no-ops.
 */
const GA_ID = process.env.EXPO_PUBLIC_GA_ID ?? '';
const META_PIXEL_ID = process.env.EXPO_PUBLIC_META_PIXEL_ID ?? '';

const isWeb = Platform.OS === 'web' && typeof document !== 'undefined';

let initialized = false;

/** Inject the gtag.js + fbevents.js snippets into <head> exactly once (web only). */
export function initAnalytics() {
  if (initialized || !isWeb) return;
  initialized = true;

  const w = window as any;

  // ---- Google Analytics 4 (gtag.js) ----
  if (GA_ID) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);

    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments);
    };
    w.gtag('js', new Date());
    // We send page_view manually on route change (single-page app).
    w.gtag('config', GA_ID, { send_page_view: false });
  }

  // ---- Meta / Facebook Pixel (fbevents.js) ----
  if (META_PIXEL_ID) {
    /* eslint-disable */
    (function (f: any, b: any, e: string, v: string) {
      if (f.fbq) return;
      const n: any = (f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      const t = b.createElement(e);
      t.async = true;
      t.src = v;
      const s0 = b.getElementsByTagName(e)[0];
      s0.parentNode.insertBefore(t, s0);
    })(w, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    w.fbq('init', META_PIXEL_ID);
    w.fbq('track', 'PageView');
  }
}

/** Track a single-page-app page/route view in both GA4 and Meta Pixel. */
export function trackPageView(path: string, title?: string) {
  if (!isWeb) return;
  const w = window as any;
  if (GA_ID && w.gtag) {
    w.gtag('event', 'page_view', {
      page_path: path,
      page_title: title ?? path,
      page_location: typeof location !== 'undefined' ? location.href : undefined,
    });
  }
  if (META_PIXEL_ID && w.fbq) {
    w.fbq('track', 'PageView');
  }
}

/**
 * Track a custom event in both providers.
 * `fbStandard` lets a call also fire a Meta standard event (e.g. 'Lead',
 * 'ViewContent') so it shows up in Ads Manager conversion reporting.
 */
export function trackEvent(
  name: string,
  params: Record<string, any> = {},
  fbStandard?: string,
) {
  if (!isWeb) return;
  const w = window as any;
  if (GA_ID && w.gtag) {
    w.gtag('event', name, params);
  }
  if (META_PIXEL_ID && w.fbq) {
    if (fbStandard) w.fbq('track', fbStandard, params);
    else w.fbq('trackCustom', name, params);
  }
}

/** Convenience helper for generic UI clicks. */
export function trackClick(label: string, extra: Record<string, any> = {}) {
  trackEvent('click', { label, ...extra });
}
