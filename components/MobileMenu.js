'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { phoneDisplay, phoneHref } from '@/lib/siteConfig';

// Off-canvas mobile menu (below the lg breakpoint).
//
// - Slides in from the right over a fading backdrop. Motion lives in
//   app/globals.css (.mm-*), and prefers-reduced-motion turns it off there.
// - The panel is 100dvh tall (100vh fallback): only the middle scrolls and
//   the estimate / call / client login area is pinned at the bottom, so
//   nothing is ever cut off behind Safari's toolbar.
// - Every link is always in the DOM, even while the menu or an accordion is
//   closed (crawlable). Closed parts are `inert` so keyboard and screen-reader
//   users never land on hidden links.
// - Closes on backdrop tap, Escape, any link tap and route change. Focus moves
//   into the panel on open, is trapped there, and returns to the hamburger.
// Colors: ink #1C1B19, paper #EDE7DA, tan/brass #9B773D. Never rust.

const PORTAL_URL = 'https://jobs.mcloudconstruction.com/customerportal';
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// React 18 does not know the `inert` attribute; an empty string turns it on.
const inertProps = on => (on ? { inert: '' } : {});

export function Hamburger({ open, onClick, buttonRef }) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className="mm-burger relative z-[70] -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      aria-controls="mobile-menu"
      data-open={open ? 'true' : 'false'}
      onClick={onClick}
    >
      <span className="relative block h-[14px] w-6" aria-hidden="true">
        <span className="mm-burger-line mm-burger-top" />
        <span className="mm-burger-line mm-burger-mid" />
        <span className="mm-burger-line mm-burger-bot" />
      </span>
    </button>
  );
}

function Section({ item, index, expanded, onToggle, onNavigate }) {
  const id = `mm-section-${index}`;
  return (
    <li className="mm-item border-b border-brass/25" style={{ '--mm-i': index }}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={onToggle}
      >
        <span className="font-display text-[2rem] font-extrabold uppercase leading-none tracking-tight text-paper">
          {item.label}
        </span>
        <span
          className="mm-chevron flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brass/50 text-brass"
          data-open={expanded ? 'true' : 'false'}
          aria-hidden="true"
        >
          <svg width="12" height="8" viewBox="0 0 12 8">
            <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </button>
      <div id={id} className="mm-accordion" data-open={expanded ? 'true' : 'false'} {...inertProps(!expanded)}>
        <div className="min-h-0 overflow-hidden">
          <ul className="mb-5 ml-1 border-l border-brass/60 pl-4">
            {item.menu.allLabel && (
              <li>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="block py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-brass"
                >
                  {item.menu.allLabel} →
                </Link>
              </li>
            )}
            {item.menu.links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="block py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.15em] text-paper/75 transition-colors active:text-brass"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

export default function MobileMenu({ nav, open, onClose, buttonRef }) {
  const pathname = usePathname();
  const panelRef = useRef(null);
  const [expanded, setExpanded] = useState(null);
  const phone = phoneDisplay();
  const tel = phoneHref();

  const close = useCallback(() => onClose(), [onClose]);

  // Close on route change (covers back/forward too).
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Collapse the accordions each time the menu closes, after it slides out.
  useEffect(() => {
    if (open) return undefined;
    const t = setTimeout(() => setExpanded(null), 450);
    return () => clearTimeout(t);
  }, [open]);

  // Body scroll lock, Escape, focus in / trap / return.
  useEffect(() => {
    if (!open) return undefined;
    const root = document.documentElement;
    const prevRoot = root.style.overflow;
    const prevBody = document.body.style.overflow;
    root.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const focusTimer = setTimeout(() => {
      panelRef.current?.querySelector(FOCUSABLE)?.focus({ preventScroll: true });
    }, 60);

    function onKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = [buttonRef.current, ...panelRef.current.querySelectorAll(FOCUSABLE)].filter(
        el => el && !el.closest('[inert]') && el.offsetParent !== null
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', onKey);

    const button = buttonRef.current;
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKey);
      root.style.overflow = prevRoot;
      document.body.style.overflow = prevBody;
      button?.focus({ preventScroll: true });
    };
  }, [open, close, buttonRef]);

  const groups = nav.filter(item => item.menu);
  const plain = nav.filter(item => !item.menu);

  return (
    <div className="lg:hidden">
      <div className="mm-backdrop" data-open={open ? 'true' : 'false'} onClick={close} aria-hidden="true" />
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="mm-panel"
        data-open={open ? 'true' : 'false'}
        {...inertProps(!open)}
      >
        {/* Top bar, same height as the header; the hamburger (now an X) sits over its right side. */}
        <div className="flex h-[72px] shrink-0 items-center border-b border-brass/30 px-6">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-brass">Menu</span>
        </div>

        <nav aria-label="Mobile" className="mm-scroll flex-1 overflow-y-auto overscroll-contain px-6 pb-6 pt-2">
          <ul>
            {groups.map((item, i) => (
              <Section
                key={item.href}
                item={item}
                index={i}
                expanded={expanded === i}
                onToggle={() => setExpanded(cur => (cur === i ? null : i))}
                onNavigate={close}
              />
            ))}
            {plain.map((item, j) => (
              <li key={item.href} className="mm-item border-b border-brass/25" style={{ '--mm-i': groups.length + j }}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="block py-4 font-display text-[2rem] font-extrabold uppercase leading-none tracking-tight text-paper transition-colors active:text-brass"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Pinned footer: always visible, above Safari's toolbar and the home indicator. */}
        <div className="mm-footer shrink-0 border-t border-brass/30 bg-ink px-6 pt-4">
          <Link
            href="/consultation"
            onClick={close}
            className="block bg-brass px-4 py-3.5 text-center font-mono text-xs uppercase tracking-[0.18em] text-ink"
          >
            Get an Estimate
          </Link>
          {phone && (
            <a
              href={tel}
              className="mt-2.5 block border border-paper/25 px-4 py-3 text-center font-mono text-xs uppercase tracking-[0.18em] text-paper"
            >
              Call {phone}
            </a>
          )}
          <a
            href={PORTAL_URL}
            className="mt-3 block text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper/55"
          >
            Client Login
          </a>
        </div>
      </div>
    </div>
  );
}
