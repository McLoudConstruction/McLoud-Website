'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { VERTICAL_BY_SLUG, ALL_VERTICAL_KEYS, RESIDENTIAL_KEY } from '@/lib/verticals';

// Remembers, for the length of one browser session, where a visitor came from
// and which industry page they were last looking at, so the consultation form
// can tell the jobs platform which page earned the lead. Nothing is stored
// beyond the session and nothing is sent anywhere until the form is submitted.
const STORAGE_KEY = 'mcloud_attribution';

function safeRead() {
  try {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}') || {};
  } catch {
    return {};
  }
}

function safeWrite(value) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage can be unavailable (private mode, blocked). Attribution is optional.
  }
}

// Used by the consultation form at submit time.
export function readAttribution() {
  if (typeof window === 'undefined') return {};
  return safeRead();
}

function verticalFromPath(pathname) {
  if (pathname === '/residential') return RESIDENTIAL_KEY;
  const match = pathname.match(/^\/commercial\/([^/]+)\/?$/);
  if (match && VERTICAL_BY_SLUG[match[1]]) return VERTICAL_BY_SLUG[match[1]].key;
  return null;
}

export default function AttributionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const data = safeRead();
    const params = new URLSearchParams(window.location.search);

    // First touch: how the visitor arrived. Written once per session.
    if (!data.landing_path) {
      data.landing_path = pathname;
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) {
        const value = params.get(key);
        if (value) data[key] = value.slice(0, 100);
      }
      try {
        if (document.referrer) {
          const ref = new URL(document.referrer);
          if (ref.hostname !== window.location.hostname) data.referrer = ref.hostname.slice(0, 200);
        }
      } catch {
        // Unparseable referrer: skip it.
      }
    }

    // Latest intent: the industry page they last looked at, or an explicit
    // ?vertical= on the link they clicked (the page CTAs and outreach emails use it).
    const fromParam = params.get('vertical');
    const explicit = fromParam && ALL_VERTICAL_KEYS.includes(fromParam) ? fromParam : null;
    const inferred = verticalFromPath(pathname);
    if (explicit || inferred) data.vertical = explicit || inferred;

    safeWrite(data);
  }, [pathname]);

  return null;
}
