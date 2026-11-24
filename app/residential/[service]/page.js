import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import { SERVICE_AREAS } from '@/lib/siteConfig';
import {
  RESIDENTIAL_SERVICES,
  RESIDENTIAL_SERVICE_BY_SLUG,
  SITE_URL,
} from '@/lib/residentialServices';

export const dynamicParams = false;

const CONSULTATION_HREF = '/consultation?vertical=residential';

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
  const path = `/residential/${service.slug}`;
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: path,
    },
  };
}

function EstimateLink({ className }) {
  return (
    <Link
      href={CONSULTATION_HREF}
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

function PhotoPlaceholder({ label, alt }) {
  return (
    <figure>
      <div
        className="flex aspect-[4/3] items-center justify-center border border-ink/10 bg-ink/[0.04] px-6 text-center"
        role="img"
        aria-label={alt}
      >
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">{label} photo</div>
          <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-ink/50">
            Project photo coming soon. This placeholder stands in until a McLoud Construction {label.toLowerCase()} image is added.
          </p>
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-concrete">{alt}</figcaption>
    </figure>
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }} />

      <PageHero eyebrow={service.eyebrow} title={service.title} body={service.heroBody} />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-body text-lg leading-relaxed text-ink/80">{service.intro}</p>
        <div className="mt-8">
          <EstimateLink />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-rust">Who It&rsquo;s For</div>
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
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-rust">What&rsquo;s Included</div>
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
                  href={link.href}
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
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Why McLoud Construction</div>
          <div className="tick-rule mt-3 mb-8" />
          {service.why.map(paragraph => (
            <p key={paragraph} className="mt-4 font-body leading-relaxed text-paper/80 first:mt-0">
              {paragraph}
            </p>
          ))}
          <div className="mt-8">
            <EstimateLink />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-rust">Before and After</div>
        <div className="tick-rule mt-3 mb-8" />
        <p className="mb-8 max-w-2xl font-body leading-relaxed text-ink/75">
          Project photos will be added here as McLoud Construction completes {service.name.toLowerCase()} in the Kansas
          City metro.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {service.photos.map(photo => (
            <PhotoPlaceholder key={photo.label} label={photo.label} alt={photo.alt} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-concrete">Related Services</div>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {service.related.map(item => (
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
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-rust">Frequently Asked Questions</div>
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
                      href={link.href}
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

      <CtaBanner heading={service.ctaHeading} body={service.ctaBody} href={CONSULTATION_HREF} />
    </>
  );
}
