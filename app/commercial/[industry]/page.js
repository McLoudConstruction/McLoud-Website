import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import FaqList from '@/components/FaqList';
import PropertyManagerLinks from '@/components/PropertyManagerLinks';
import { PAGE_VERTICALS, VERTICAL_BY_SLUG } from '@/lib/verticals';
import { pageMetadata } from '@/lib/seo';
import { faqPageNode, graph, JsonLd, serviceNode } from '@/lib/schema';

// Only industries in lib/verticals.js with `hasPage: true` get a page; the
// rest were folded into the property manager pages and redirect in
// next.config.js. Anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PAGE_VERTICALS.map(v => ({ industry: v.slug }));
}

function pageVertical(slug) {
  const v = VERTICAL_BY_SLUG[slug];
  return v && v.hasPage ? v : null;
}

export function generateMetadata({ params }) {
  const v = pageVertical(params.industry);
  if (!v) return {};
  return pageMetadata({ title: v.metaTitle, description: v.metaDescription, path: `/commercial/${v.slug}` });
}

export default function IndustryPage({ params }) {
  const v = pageVertical(params.industry);
  if (!v) notFound();
  const path = `/commercial/${v.slug}`;

  return (
    <>
      <JsonLd
        data={graph(
          serviceNode({
            name: v.metaTitle.replace(/( in Kansas City|, KC)$/, ''),
            description: v.metaDescription,
            path,
          }),
          v.faqs?.length ? faqPageNode(v.faqs) : null
        )}
      />
      <PageHero
        eyebrow={v.eyebrow}
        title={v.title}
        subtitle={v.subtitle}
        body={v.body}
        crumbs={[
          { name: 'Property Managers', href: '/commercial' },
          { name: v.label, href: path },
        ]}
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="font-mono text-xs uppercase tracking-[0.12em] text-brass">What We Handle</div>
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
          <div className="font-mono text-xs uppercase tracking-[0.12em] text-brass">How We Work</div>
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

      {v.faqs?.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-20">
          <div className="font-mono text-xs uppercase tracking-[0.12em] text-brass">Questions</div>
          <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
            {v.label} FAQ
          </h2>
          <div className="mt-8">
            <FaqList items={v.faqs} />
          </div>
        </section>
      )}

      <PropertyManagerLinks current={path} />

      <CtaBanner heading={v.ctaHeading} body={v.ctaBody} href={`/consultation?vertical=${v.key}`} />
    </>
  );
}
