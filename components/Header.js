'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { VERTICALS } from '@/lib/verticals';

// `industries: true` gives that item a dropdown of the industry pages
// (lib/verticals.js). The parent link still goes to its own page.
const NAV = [
  { href: '/residential', label: 'Residential' },
  { href: '/commercial', label: 'Commercial', industries: true },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/financing', label: 'Financing' },
];

const linkClass = 'font-mono text-xs uppercase tracking-[0.15em] text-paper/80 transition-colors hover:text-brass';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink text-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="block">
          <Image src="/logo.png" alt="McLoud Construction" width={185} height={80} priority className="h-12 w-auto md:h-14" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map(item =>
            item.industries ? (
              // Opens on hover and on keyboard focus. The panel is attached to
              // the link with padding (no gap), so moving the pointer down into
              // it never closes it. Touch devices tap through to /commercial,
              // which lists the same industries.
              <div key={item.href} className="group relative">
                <Link href={item.href} className={`${linkClass} inline-flex items-center gap-1.5`}>
                  {item.label}
                  <svg width="8" height="5" viewBox="0 0 8 5" aria-hidden="true" className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180">
                    <path d="M0.5 0.5 4 4 7.5 0.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-5 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[16rem] border border-paper/10 border-t-2 border-t-brass bg-ink py-2 shadow-xl">
                    <Link
                      href={item.href}
                      className="block px-5 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brass transition-colors hover:bg-paper/5"
                    >
                      All Commercial
                    </Link>
                    <div className="mx-5 my-1 h-px bg-paper/10" />
                    {VERTICALS.map(v => (
                      <Link
                        key={v.key}
                        href={`/commercial/${v.slug}`}
                        className="block px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-paper/80 transition-colors hover:bg-paper/5 hover:text-brass"
                      >
                        {v.label}
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
          <a
            href="https://jobs.mcloudconstruction.com/customerportal"
            className="font-mono text-xs uppercase tracking-[0.15em] text-paper/60 transition-colors hover:text-brass"
          >
            Client Login
          </a>
          <Link
            href="/consultation"
            className="border border-brass px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-brass transition-colors hover:bg-brass hover:text-ink"
          >
            Get an Estimate
          </Link>
        </nav>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span className="block h-[1.5px] w-6 bg-paper" />
          <span className="block h-[1.5px] w-6 bg-paper" />
          <span className="block h-[1.5px] w-4 bg-paper" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-paper/10 px-6 pb-6 md:hidden">
          {NAV.map(item => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper/80"
              >
                {item.label}
              </Link>
              {item.industries && (
                <div className="mb-2 ml-1 border-l border-brass/60 pl-4">
                  {VERTICALS.map(v => (
                    <Link
                      key={v.key}
                      href={`/commercial/${v.slug}`}
                      onClick={() => setOpen(false)}
                      className="block py-2 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-paper/60"
                    >
                      {v.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href="https://jobs.mcloudconstruction.com/customerportal"
            className="py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper/60"
          >
            Client Login
          </a>
          <Link
            href="/consultation"
            onClick={() => setOpen(false)}
            className="mt-2 border border-brass px-4 py-3 text-center font-mono text-xs uppercase tracking-[0.15em] text-brass"
          >
            Get an Estimate
          </Link>
        </nav>
      )}
    </header>
  );
}
