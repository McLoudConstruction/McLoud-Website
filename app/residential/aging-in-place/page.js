import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import { SERVICE_AREAS } from '@/lib/siteConfig';
import { pageMetadata, SITE_URL } from '@/lib/seo';

// Audience page for older homeowners and for adult children planning with a
// parent. It routes visitors to the specific service pages rather than
// repeating them.

const PATH = '/residential/aging-in-place';
const ESTIMATE_HREF = '/consultation?vertical=residential';
const FAMILY_ESTIMATE_HREF = '/consultation?vertical=residential&for=family';

export const metadata = pageMetadata({
  title: 'Aging in Place Remodeling in Kansas City',
  description:
    'Planning for yourself or a parent? McLoud Construction plans aging-in-place remodeling across Kansas City: safer bathrooms, easier entries, and rooms that work for years.',
  path: PATH,
});

const AUDIENCES = [
  {
    eyebrow: 'Planning for yourself',
    title: 'Stay in the home you love',
    points: [
      'Plan ahead, before a fall or a hospital stay forces quick decisions',
      'Start with the room that is hardest to use today, usually the bathroom',
      'Keep the look of a well-finished home, not a medical facility',
    ],
  },
  {
    eyebrow: 'Planning for a parent',
    title: 'Help a parent stay safely at home',
    points: [
      'You can request the estimate on your parent\u2019s behalf',
      'Family members are welcome at the walkthrough, so everyone hears the same plan',
      'We explain options plainly, so you can decide together what matters most',
    ],
  },
];

const ROOMS = [
  {
    title: 'Bathroom',
    body: 'The room where most people start. Curbless or low-threshold showers, grab bars, shower benches, handheld showerheads, comfort-height toilets, and slip-resistant floors.',
    links: [
      { href: '/residential/aging-in-place-bathroom-remodels', label: 'Aging-in-place bathroom remodels' },
      { href: '/residential/tub-to-shower-conversions', label: 'Tub-to-shower conversions' },
    ],
  },
  {
    title: 'Entries & Steps',
    body: 'Getting in and out of the house safely: ramps, lower or removed thresholds, sturdy railings, and better lighting at the door.',
    links: [{ href: '/residential/accessibility-modifications', label: 'Accessibility modifications' }],
  },
  {
    title: 'Doorways & Hallways',
    body: 'Wider doorways and clear paths make room for a walker or wheelchair, and make everyday moves easier for everyone.',
    links: [{ href: '/residential/accessibility-modifications', label: 'Accessibility modifications' }],
  },
  {
    title: 'Kitchen',
    body: 'Lever-style faucets, pull-out storage, counters at a comfortable working height, and roll-under space where a seated cook needs it.',
    links: [{ href: '/residential/accessibility-modifications', label: 'Accessible kitchens' }],
  },
  {
    title: 'Floors & Lighting',
    body: 'Smooth flooring transitions, slip-resistant surfaces, and brighter, easier-to-reach lighting throughout the main living areas.',
    links: [{ href: '/residential/accessibility-modifications', label: 'Accessibility modifications' }],
  },
];

const SIGNS = [
  'Stepping over the side of the tub takes effort, or someone avoids bathing because of it',
  'Towel bars, sinks, or furniture are being used as handholds',
  'The steps at the front door have become the hardest part of coming home',
  'Rugs, raised thresholds, or dim hallways are causing near-misses',
  'A walker or wheelchair does not fit easily through a doorway',
];

const WHY = [
  'McLoud Construction is a demo-and-rebuild team with a restoration background. Aging-in-place work often means opening up a wall or floor, so we plan for what might be behind it and put the room back together properly.',
  'Most of our clients stay home during the work. We protect the rest of the house, keep the work area tidy, and make sure you always know what is happening next.',
  'McLoud Construction is insured, every subcontractor is vetted, and you have one point of contact from the first visit to the final walkthrough.',
];

const FAQS = [
  {
    q: 'Can I request an estimate for my parent?',
    a: 'Yes. Request the estimate yourself and choose "A parent or family member" on the form. We will coordinate the visit with you and your parent, and family members are welcome at the walkthrough.',
  },
  {
    q: 'Do we have to do everything at once?',
    a: 'No. Many families start with the bathroom or the main entry and plan other changes later. We can lay out the work in an order that makes sense for the home and the budget.',
  },
  {
    q: 'Will the changes make the house look like a hospital?',
    a: 'They should not. The goal is a home that looks well finished and happens to be safer and easier to use, with fixtures and finishes chosen to match the rest of the house.',
  },
  {
    q: 'Which parts of Kansas City do you serve?',
    a: 'McLoud Construction works across the Kansas City metro, on both the Missouri and Kansas sides of the state line. If you are not sure whether a home is in our service area, request a free estimate and we will let you know.',
  },
];

const areaServed = [
  { '@type': 'AdministrativeArea', name: 'Kansas City Metro, MO & KS' },
  ...Object.entries(SERVICE_AREAS).flatMap(([state, cities]) =>
    cities.map(city => ({ '@type': 'City', name: city.includes(',') ? city : `${city}, ${state}` }))
  ),
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Aging-in-Place Remodeling',
      serviceType: 'Aging-in-place home remodeling',
      description:
        'Aging-in-place remodeling across the Kansas City metro, including safer bathrooms, accessible entries, wider doorways, and accessible kitchens.',
      url: `${SITE_URL}${PATH}`,
      areaServed,
      provider: { '@type': 'GeneralContractor', name: 'McLoud Construction', url: SITE_URL },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Residential', item: `${SITE_URL}/residential` },
        { '@type': 'ListItem', position: 3, name: 'Aging-in-Place Planning', item: `${SITE_URL}${PATH}` },
      ],
    },
  ],
};

const labelClass = 'font-mono text-xs uppercase tracking-[0.2em]';

export default function AgingInPlacePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <PageHero
        eyebrow="Aging-in-Place Remodeling · Kansas City"
        title="Stay in the Home You Love, Safely"
        body="Whether you are planning ahead for yourself or helping a parent, McLoud Construction makes the changes that let people keep living safely and comfortably in their own Kansas City homes."
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className={`${labelClass} text-rust`}>Who This Is For</h2>
        <div className="tick-rule mt-3 mb-10" />
        <div className="grid gap-8 md:grid-cols-2">
          {AUDIENCES.map(item => (
            <div key={item.title} className="border border-ink/15 p-8">
              <div className={`${labelClass} text-rust`}>{item.eyebrow}</div>
              <h3 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight">{item.title}</h3>
              <ul className="mt-5 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/75">
                {item.points.map(point => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={ESTIMATE_HREF}
            className="bg-brass px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-opacity hover:opacity-90"
          >
            Request a Free Estimate
          </Link>
          <Link
            href={FAMILY_ESTIMATE_HREF}
            className="border border-rust px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-rust transition-colors hover:bg-rust hover:text-paper"
          >
            Request One for a Parent
          </Link>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className={`${labelClass} text-rust`}>Where to Start: Room by Room</h2>
          <div className="tick-rule mt-3 mb-10" />
          <div className="grid gap-10 md:grid-cols-2">
            {ROOMS.map(room => (
              <div key={room.title} className="border-l-2 border-brass pl-5">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight">{room.title}</h3>
                <p className="mt-3 font-body leading-relaxed text-ink/75">{room.body}</p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {room.links.map(link => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="font-mono text-xs uppercase tracking-[0.15em] text-rust hover:underline"
                    >
                      {link.label} →
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className={`${labelClass} text-rust`}>Signs It Is Time to Plan</h2>
        <div className="tick-rule mt-3 mb-8" />
        <ul className="list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/75">
          {SIGNS.map(sign => (
            <li key={sign}>{sign}</li>
          ))}
        </ul>
        <p className="mt-6 font-body leading-relaxed text-ink/75">
          If any of these sound familiar, a walkthrough is a good next step. We will look at how the home is
          used day to day and suggest where changes would help the most.
        </p>
      </section>

      <section className="bg-blueprint text-paper">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className={`${labelClass} text-brass`}>Why McLoud Construction</h2>
          <div className="tick-rule mt-3 mb-8" />
          {WHY.map(paragraph => (
            <p key={paragraph} className="mt-4 font-body leading-relaxed text-paper/80 first:mt-0">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className={`${labelClass} text-rust`}>Frequently Asked Questions</h2>
        <div className="tick-rule mt-3 mb-8" />
        <div className="divide-y divide-ink/10 border-t border-ink/10">
          {FAQS.map(item => (
            <details key={item.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-bold uppercase tracking-tight">
                {item.q}
                <span className="shrink-0 font-mono text-lg text-brass transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-2xl font-body leading-relaxed text-ink/70">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaBanner
        heading="Let's Talk About Staying Home"
        body="Tell us about the home and who lives there. We will follow up to schedule a free estimate."
        href={ESTIMATE_HREF}
      />
    </>
  );
}
