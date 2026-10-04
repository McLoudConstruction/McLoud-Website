import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import { VERTICALS, VERTICAL_BY_SLUG } from '@/lib/verticals';

// Only the industries defined in lib/verticals.js exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return VERTICALS.map(v => ({ industry: v.slug }));
}

export function generateMetadata({ params }) {
  const v = VERTICAL_BY_SLUG[params.industry];
  if (!v) return {};
  const path = `/commercial/${v.slug}`;
  return {
    title: v.metaTitle,
    description: v.metaDescription,
    alternates: { canonical: path },
    openGraph: { title: v.metaTitle, description: v.metaDescription, url: path },
  };
}

export default function IndustryPage({ params }) {
  const v = VERTICAL_BY_SLUG[params.industry];
  if (!v) notFound();

  const others = VERTICALS.filter(o => o.key !== v.key);

  return (
    <>
      <PageHero eyebrow={v.eyebrow} title={v.title} body={v.body} />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-rust">What We Handle</div>
        <div className="tick-rule mt-3 mb-8" />
        <div className="grid gap-8 md:grid-cols-3">
          {v.projects.map(project => (
            <div key={project.title}>
              <h2 className="font-display text-xl font-bold uppercase tracking-tight">{project.title}</h2>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">{project.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blueprint text-paper">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">How We Work</div>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {v.concerns.map((c, i) => (
              <div key={c.title}>
                <div className="font-mono text-2xl font-bold text-brass">{String(i + 1).padStart(2, '0')}</div>
                <div className="tick-rule my-3" />
                <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-tight">{c.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-paper/80">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-concrete">Other Industries We Serve</div>
        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
          {others.map(o => (
            <Link
              key={o.key}
              href={`/commercial/${o.slug}`}
              className="border-l-2 border-brass pl-3 font-display text-lg font-bold uppercase tracking-tight hover:text-brass"
            >
              {o.label}
            </Link>
          ))}
        </div>
      </section>

      <CtaBanner heading={v.ctaHeading} body={v.ctaBody} href={`/consultation?vertical=${v.key}`} />
    </>
  );
}
