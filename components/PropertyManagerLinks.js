import Link from 'next/link';
import { PROPERTY_MANAGER_NAV } from '@/lib/projectOptions';

// "More for property managers": links every property manager page to the
// others, skipping the page it sits on.
export default function PropertyManagerLinks({ current }) {
  const links = PROPERTY_MANAGER_NAV.filter(link => link.href !== current);
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="font-mono text-xs uppercase tracking-[0.12em] text-concrete">More for Property Managers</div>
      <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
        <Link
          href="/commercial"
          className="border-l-2 border-brass pl-3 font-display text-lg font-bold uppercase tracking-tight hover:text-brass"
        >
          All Property Manager Services
        </Link>
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="border-l-2 border-brass pl-3 font-display text-lg font-bold uppercase tracking-tight hover:text-brass"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
