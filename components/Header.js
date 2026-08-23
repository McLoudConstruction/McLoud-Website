'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NAV = [
  { href: '/residential', label: 'Residential' },
  { href: '/commercial', label: 'Commercial' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink text-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="block">
          <Image src="/logo.png" alt="McLoud Construction" width={185} height={80} priority className="h-12 w-auto md:h-14" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-xs uppercase tracking-[0.15em] text-paper/80 transition-colors hover:text-brass"
            >
              {item.label}
            </Link>
          ))}
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
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper/80"
            >
              {item.label}
            </Link>
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
