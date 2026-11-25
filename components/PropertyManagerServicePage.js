import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import FaqList from '@/components/FaqList';
import PropertyManagerLinks from '@/components/PropertyManagerLinks';
import { pageMetadata } from '@/lib/seo';
import { estimateHref } from '@/lib/projectOptions';
import { faqPageNode, graph, JsonLd, serviceNode } from '@/lib/schema';

export function propertyManagerMetadata(service) {
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/commercial/${service.slug}`,
  });
}

// Layout shared by the property manager service pages in
// lib/propertyManagerServices.js.
export default function PropertyManagerServicePage({ service }) {
  const path = `/commercial/${service.slug}`;
  return (
    <>
      <JsonLd
        data={graph(
          serviceNode({
            name: service.name,
            serviceType: service.serviceType,
            description: service.metaDescription,
            path,
          }),
          faqPageNode(service.faqs)
        )}
      />
      <PageHero
        eyebrow={service.eyebrow}
        title={service.h1}
        subtitle={service.subtitle}
        body={service.heroBody}
        crumbs={[
          { name: 'Property Managers', href: '/commercial' },
          { name: service.name, href: path },
        ]}
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">What We Handle</div>
        <div className="tick-rule mt-3 mb-8" />
        <div className="grid gap-8 md:grid-cols-3">
          {service.scope.map(item => (
            <div key={item.title}>
              <h2 className="font-display text-xl font-bold uppercase tracking-tight">
                {item.href ? (
                  <Link href={item.href} className="hover:text-brass">
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </h2>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blueprint text-paper">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">How We Work</div>
          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {service.how.map((c, i) => (
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

      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Questions</div>
        <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          {service.name} FAQ
        </h2>
        <div className="mt-8">
          <FaqList items={service.faqs} />
        </div>
      </section>

      <PropertyManagerLinks current={path} />

      <CtaBanner heading={service.ctaHeading} body={service.ctaBody} href={estimateHref(service.slug)} />
    </>
  );
}
