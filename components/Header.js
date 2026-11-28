'use client';
import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HUBS, HOMEOWNER_NAV, ACCESSIBILITY_NAV, PROPERTY_MANAGER_NAV } from '@/lib/projectOptions';
import MobileMenu, { Hamburger } from '@/components/MobileMenu';

// One menu per kind of customer. An item with `menu` gets a dropdown on
// desktop and an accordion in the mobile menu (components/MobileMenu.js). The parent link still goes
// to its own hub page.
const NAV = [
  { ...HUBS.homeowners, menu: { allLabel: 'All Homeowner Services', links: HOMEOWNER_NAV } },
  // The hub is the menu's first link, so the "all" link is not repeated.
  { ...HUBS.accessibility, menu: { links: ACCESSIBILITY_NAV } },
  { ...HUBS.propertyManagers, menu: { allLabel: 'All Property Manager Services', links: PROPERTY_MANAGER_NAV } },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
];

const linkClass = 'whitespace-nowrap font-mono text-xs uppercase tracking-[0.1em] text-paper/80 transition-colors hover:text-brass';

export default function Header() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <header className="sticky top-0 z-50 bg-ink text-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="block">
          <Image src="/mcloud-logo.png" alt="McLoud Construction" width={154} height={56} priority className="h-12 w-auto md:h-14" />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
          {NAV.map(item =>
            item.menu ? (
              // Opens on hover and on keyboard focus. The panel is attached to
              // the link with padding (no gap), so moving the pointer down into
              // it never closes it. Touch devices tap through to the parent
              // page, which lists the same links.
              <div key={item.href} className="group relative">
                <Link href={item.href} className={`${linkClass} inline-flex items-center gap-1.5`}>
                  {item.label}
                  <svg width="8" height="5" viewBox="0 0 8 5" aria-hidden="true" className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180">
                    <path d="M0.5 0.5 4 4 7.5 0.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-5 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[19rem] border border-paper/10 border-t-2 border-t-brass bg-ink py-2 shadow-xl">
                    {item.menu.allLabel && (
                      <>
                        <Link
                          href={item.href}
                          className="block px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-brass transition-colors hover:bg-paper/5"
                        >
                          {item.menu.allLabel}
                        </Link>
                        <div className="mx-5 my-1 h-px bg-paper/10" />
                      </>
                    )}
                    {item.menu.links.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-5 py-2.5 font-mono text-xs uppercase tracking-[0.1em] text-paper/80 transition-colors hover:bg-paper/5 hover:text-brass"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            )
          )}
          {/* No phone number in the desktop header (Stachys, Nov 2026): it made the
              header too wide. Tap-to-call stays in the mobile menu
              (components/MobileMenu.js), the footer, the estimate banners and
              the form's error message. */}
          <a
            href="https://jobs.mcloudconstruction.com/customerportal"
            className="hidden whitespace-nowrap font-mono text-xs uppercase tracking-[0.1em] text-paper/75 transition-colors hover:text-brass xl:inline"
          >
            Client Login
          </a>
          <Link
            href="/consultation"
            className="whitespace-nowrap border border-brass px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-brass transition-colors hover:bg-brass hover:text-ink"
          >
            Get an Estimate
          </Link>
        </nav>

        <Hamburger open={open} onClick={() => setOpen(o => !o)} buttonRef={buttonRef} />
      </div>

      <MobileMenu nav={NAV} open={open} onClose={closeMenu} buttonRef={buttonRef} />
    </header>
  );
}
