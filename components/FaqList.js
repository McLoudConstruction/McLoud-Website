import Link from 'next/link';

// Renders a list of { q, a, links? } questions. Pages build their FAQPage
// structured data from the same array (faqPageNode in lib/schema.js), so the
// visible answers and the structured data cannot drift apart. Keep `a` plain
// text: links go in `links`, not inside the answer.
export default function FaqList({ items, linkHref = href => href }) {
  return (
    <div className="divide-y divide-ink/10 border-t border-ink/10">
      {items.map(item => (
        <details key={item.q} className="group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-bold uppercase tracking-tight">
            <h3 className="inline">{item.q}</h3>
            <span aria-hidden="true" className="shrink-0 font-mono text-lg text-brass transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-4 max-w-2xl font-body leading-relaxed text-ink/70">{item.a}</p>
          {item.links?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {item.links.map(link => (
                <Link
                  key={link.href}
                  href={linkHref(link.href)}
                  className="font-mono text-xs uppercase tracking-[0.15em] text-brass hover:underline"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          )}
        </details>
      ))}
    </div>
  );
}
