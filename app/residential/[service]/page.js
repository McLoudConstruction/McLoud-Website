import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import FaqList from '@/components/FaqList';
import { SERVICE_AREAS } from '@/lib/siteConfig';
import { RESIDENTIAL_SERVICES, RESIDENTIAL_SERVICE_BY_SLUG } from '@/lib/residentialServices';
import { faqPageNode, graph, JsonLd, serviceNode } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { estimateHref, HUBS } from '@/lib/projectOptions';

export const dynamicParams = false;

// Extra related links that point at the audience pages rather than at
// another service. Keyed by service slug.
const AGING_IN_PLACE_HUB = {
  href: '/residential/aging-in-place',
  name: 'Aging-in-Place & Accessibility Planning',
  blurb: 'Planning for yourself or a parent? Start with the room-by-room guide to staying safely in your own home.',
};
const EXTRA_RELATED = {
  'aging-in-place-bathroom-remodels': [AGING_IN_PLACE_HUB],
  'tub-to-shower-conversions': [AGING_IN_PLACE_HUB],
  'accessibility-modifications': [
    AGING_IN_PLACE_HUB,
    {
      href: '/commercial/accessible-units',
      name: 'Accessible Units for Property Managers',
      blurb: 'Managing apartments or rentals? McLoud Construction upgrades units for residents with mobility needs.',
    },
  ],
};

const sectionHeadingClass = 'font-mono text-xs uppercase tracking-[0.2em]';

export function generateStaticParams() {
  return RESIDENTIAL_SERVICES.map(service => ({ service: service.slug }));
}

export function generateMetadata({ params }) {
  const service = RESIDENTIAL_SERVICE_BY_SLUG[params.service];
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/residential/${service.slug}`,
  });
}

function EstimateLink({ href, className }) {
  return (
    <Link
      href={href}
      className={
        className ||
        'inline-block bg-brass px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-opacity hover:opacity-90'
      }
    >
      Request a Free Estimate
    </Link>
  );
}

function RichText({ parts }) {
  if (!parts?.length) return null;
  return (
    <p className="mt-6 max-w-2xl font-body leading-relaxed text-ink/75">
      {parts.map((part, i) =>
        part.type === 'link' ? (
          <Link key={`${part.href}-${i}`} href={part.href} className="text-rust underline hover:text-ink">
            {part.label}
          </Link>
        ) : (
          <span key={i}>{part.value}</span>
        )
      )}
    </p>
  );
}

function serviceSchema(service) {
  return graph(
    serviceNode({
      name: service.name,
      description: service.description,
      path: `/residential/${service.slug}`,
    }),
    faqPageNode(service.faqs)
  );
}

// Named communities for the "Where We Work" paragraph, written out as
// natural text rather than a keyword list.
const MO_CITIES = SERVICE_AREAS.Missouri.join(', ');
const KS_CITIES = SERVICE_AREAS.Kansas.join(', ');

export default function ResidentialServicePage({ params }) {
  const service = RESIDENTIAL_SERVICE_BY_SLUG[params.service];
  if (!service) notFound();
  const consultationHref = estimateHref(service.slug);
  const related = [...service.related, ...(EXTRA_RELATED[service.slug] || [])];
  // Only real project photos are shown. Entries without a `src` are
  // descriptions waiting for a photo, so the section stays hidden until then.
  const photos = (service.photos || []).filter(photo => photo.src);
  const linkHref = href => (href.startsWith('/consultation') ? consultationHref : href);

  return (
    <>
      <JsonLd data={serviceSchema(service)} />

      <PageHero
        eyebrow={service.eyebrow}
        title={service.h1}
        subtitle={service.title}
        body={service.heroBody}
        crumbs={[
          service.group === 'accessibility' ? HUBS.accessibility : HUBS.homeowners,
          { name: service.name, href: `/residential/${service.slug}` },
        ].map(c => ({ name: c.name || c.label, href: c.href }))}
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-body text-lg leading-relaxed text-ink/80">{service.intro}</p>
        <div className="mt-8">
          <EstimateLink href={consultationHref} />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <h2 className={`${sectionHeadingClass} text-rust`}>Who It&rsquo;s For</h2>
        <div className="tick-rule mt-3 mb-8" />
        <p className="font-body leading-relaxed text-ink/75">{service.audienceIntro}</p>
        <ul className="mt-5 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/75">
          {service.audience.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <RichText parts={service.audienceNoteParts} />
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className={`${sectionHeadingClass} text-rust`}>What&rsquo;s Included</h2>
          <div className="tick-rule mt-3 mb-8" />
          <p className="font-body leading-relaxed text-ink/75">{service.includedIntro}</p>
          <ul className="mt-5 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/75">
            {service.included.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {service.includedNote && (
            <p className="mt-6 font-body leading-relaxed text-ink/75">{service.includedNote}</p>
          )}
          {service.includedLinks?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {service.includedLinks.map(link => (
                <Link
                  key={link.href}
                  href={linkHref(link.href)}
                  className="font-mono text-xs uppercase tracking-[0.15em] text-rust hover:underline"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-blueprint text-paper">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className={`${sectionHeadingClass} text-brass`}>Why McLoud Construction</h2>
          <div className="tick-rule mt-3 mb-8" />
          {service.why.map(paragraph => (
            <p key={paragraph} className="mt-4 font-body leading-relaxed text-paper/80 first:mt-0">
              {paragraph}
            </p>
          ))}
          <div className="mt-8">
            <EstimateLink href={consultationHref} />
          </div>
        </div>
      </section>

      {photos.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className={`${sectionHeadingClass} text-rust`}>Before and After</h2>
          <div className="tick-rule mt-3 mb-8" />
          <div className="grid gap-8 md:grid-cols-2">
            {photos.map(photo => (
              <figure key={photo.src}>
                <Image src={photo.src} alt={photo.alt} width={1200} height={900} className="h-auto w-full object-cover" />
                <figcaption className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-concrete">
                  {photo.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={`${sectionHeadingClass} text-concrete`}>Related Services</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {related.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="border-l-2 border-brass pl-4 hover:text-brass"
            >
              <div className="font-display text-xl font-bold uppercase tracking-tight">{item.name}</div>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">{item.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16" id="faq">
        <h2 className={`${sectionHeadingClass} text-rust`}>Frequently Asked Questions</h2>
        <div className="tick-rule mt-3 mb-8" />
        <FaqList items={service.faqs} linkHref={linkHref} />
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className={`${sectionHeadingClass} text-rust`}>Where We Work</h2>
          <div className="tick-rule mt-3 mb-8" />
          <p className="font-body leading-relaxed text-ink/75">
            McLoud Construction serves homeowners across the Kansas City metro for {service.name.toLowerCase()}. On the
            Missouri side, that includes {MO_CITIES}. On the Kansas side, it includes {KS_CITIES}. If your community
            is not listed, <Link href="/faq" className="text-rust underline hover:text-ink">check our service area</Link>{' '}
            or ask when you request an estimate.
          </p>
        </div>
      </section>

      <CtaBanner heading={service.ctaHeading} body={service.ctaBody} href={consultationHref} />
    </>
  );
}
