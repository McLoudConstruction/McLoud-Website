import Link from 'next/link';
import { phoneDisplay, phoneHref } from '@/lib/siteConfig';

export default function CtaBanner({ heading = "Let's Talk About Your Project", body, href = '/consultation' }) {
  const phone = phoneDisplay();
  return (
    <section className="grid-paper border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
          {heading}
        </h2>
        {body && <p className="mx-auto mt-4 max-w-xl font-body text-ink/70">{body}</p>}
        <Link
          href={href}
          className="mt-9 inline-block bg-brass px-8 py-4 font-mono text-xs uppercase tracking-[0.1em] text-ink transition-opacity hover:opacity-90"
        >
          Get a Free Estimate
        </Link>
        {phone && (
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.1em] text-ink/75">
            Or call{' '}
            <a href={phoneHref()} className="text-brass hover:underline">
              {phone}
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
