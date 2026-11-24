import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import { SERVICE_AREAS } from '@/lib/siteConfig';
import {
  RESIDENTIAL_SERVICES,
  RESIDENTIAL_SERVICE_BY_SLUG,
  SITE_URL,
} from '@/lib/residentialServices';
import { pageMetadata } from '@/lib/seo';
import { estimateHref } from '@/lib/projectOptions';

export const dynamicParams = false;

// Extra related links that point at the audience pages rather than at
// another service. Keyed by service slug.
const AGING_IN_PLACE_HUB = {
  href: '/residential/aging-in-place',
  name: 'Aging-in-Place Planning',
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

const areaServed = [
  { '@type': 'AdministrativeArea', name: 'Kansas City Metro, MO & KS' },
  { '@type': 'State', name: 'Missouri' },
  { '@type': 'State', name: 'Kansas' },
  ...Object.entries(SERVICE_AREAS).flatMap(([state, cities]) =>
    cities.map(city => ({ '@type': 'City', name: city.includes(',') ? city : `${city}, ${state}` }))
  ),
];

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
  const path = `/residential/${service.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.name,
        serviceType: service.name,
        description: service.description,
        url: `${SITE_URL}${path}`,
        areaServed,
        provider: {
          '@type': 'GeneralContractor',
          name: 'McLoud Construction',
          url: SITE_URL,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: service.faqs.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }} />

      <PageHero eyebrow={service.eyebrow} title={service.title} body={service.heroBody} />

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

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <h2 className={`${sectionHeadingClass} text-rust`}>Frequently Asked Questions</h2>
        <div className="tick-rule mt-3 mb-8" />
        <div className="divide-y divide-ink/10 border-t border-ink/10">
          {service.faqs.map(item => (
            <details key={item.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-bold uppercase tracking-tight">
                {item.q}
                <span className="shrink-0 font-mono text-lg text-brass transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-2xl font-body leading-relaxed text-ink/70">{item.a}</p>
              {item.links?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  {item.links.map(link => (
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
            </details>
          ))}
        </div>
      </section>

      <CtaBanner heading={service.ctaHeading} body={service.ctaBody} href={consultationHref} />
    </>
  );
}
