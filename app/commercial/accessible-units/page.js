import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import ObfuscatedEmail from '@/components/ObfuscatedEmail';
import { SERVICE_AREAS } from '@/lib/siteConfig';
import { VERTICALS } from '@/lib/verticals';
import { pageMetadata, SITE_URL } from '@/lib/seo';
import { estimateHref } from '@/lib/projectOptions';

// Audience page for property managers who need units made accessible. It is a
// sibling of the industry pages rather than an entry in lib/verticals.js,
// because each vertical key must also exist in the jobs platform. Leads from
// here are sent as multi-family with "Accessible Unit Upgrades" as the project.

const PATH = '/commercial/accessible-units';
const ESTIMATE_HREF = estimateHref('accessible-units');

export const metadata = pageMetadata({
  title: 'Accessible Unit Upgrades in Kansas City',
  description:
    'Accessible unit upgrades for Kansas City property managers: roll-in showers, wider doorways, lowered counters, and accessible entries, built in occupied buildings by McLoud Construction.',
  path: PATH,
});

const PROJECTS = [
  { title: 'Roll-In & Low-Threshold Showers', body: 'Tubs and standard showers replaced with roll-in or low-threshold showers, benches, and handheld showerheads.' },
  { title: 'Grab Bars & Blocking', body: 'Solid in-wall blocking and grab bars at the toilet, tub, and shower, set where residents need them.' },
  { title: 'Wider Doorways & Clear Paths', body: 'Doorways widened and hallways cleared so a wheelchair or walker moves through the unit easily.' },
  { title: 'Accessible Kitchens', body: 'Lowered counters, roll-under sinks, reachable storage, and lever-style faucets and hardware.' },
  { title: 'Entries, Ramps & Thresholds', body: 'Accessible unit entries, ramps, and smooth flooring transitions from the parking lot to the living room.' },
  { title: 'Controls & Lighting', body: 'Switches, outlets, and controls at reachable heights, with brighter lighting in the spaces residents use most.' },
];

const CONCERNS = [
  {
    title: 'Occupied buildings',
    body: 'We plan access, noise, dust control, and sequencing so neighboring residents can stay put while a unit is upgraded.',
  },
  {
    title: 'Built to your specifications',
    body: 'Accessibility requirements vary by property and program. We build to the specifications and drawings you or your design professional provide, and flag anything that does not fit the space before work starts.',
  },
  {
    title: 'A demo-and-rebuild crew',
    body: 'Our background is restoration and demo-and-rebuild work for property management companies. Taking a unit down to the studs and putting it back together correctly is familiar work.',
  },
];

const FAQS = [
  {
    q: 'Can you work while neighboring units are occupied?',
    a: 'Yes. We plan access, noise, and dust control around residents, and coordinate the schedule with your on-site team before work starts.',
  },
  {
    q: 'Can you work from our accessibility specifications?',
    a: 'Yes. Send the specifications or drawings for the unit, and we will build to them and raise any conflicts with the existing conditions before work begins.',
  },
  {
    q: 'Do you provide a W-9 and certificate of insurance?',
    a: 'Yes. McLoud Construction is insured, and we can send a W-9 and certificate of insurance for vendor onboarding.',
  },
  {
    q: 'Do you serve properties across the Kansas City metro?',
    a: 'Yes. McLoud Construction works with properties on both the Missouri and Kansas sides of the state line.',
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
      name: 'Accessible Unit Upgrades',
      serviceType: 'Accessible unit renovation for property managers',
      description:
        'Accessible unit upgrades for apartment communities and rental properties across the Kansas City metro, including roll-in showers, wider doorways, accessible kitchens, and accessible entries.',
      url: `${SITE_URL}${PATH}`,
      areaServed,
      audience: { '@type': 'BusinessAudience', audienceType: 'Property managers and owners' },
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
        { '@type': 'ListItem', position: 2, name: 'Commercial', item: `${SITE_URL}/commercial` },
        { '@type': 'ListItem', position: 3, name: 'Accessible Units', item: `${SITE_URL}${PATH}` },
      ],
    },
  ],
};

const labelClass = 'font-mono text-xs uppercase tracking-[0.2em]';

export default function AccessibleUnitsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <PageHero
        eyebrow="For Property Managers · Kansas City"
        title="Accessible Units, Built by a Demo-and-Rebuild Crew"
        body="McLoud Construction upgrades apartment and rental units for residents who use wheelchairs, walkers, or other mobility aids, working around the residents who stay in the building."
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className={`${labelClass} text-rust`}>What We Handle</h2>
        <div className="tick-rule mt-3 mb-8" />
        <div className="grid gap-8 md:grid-cols-3">
          {PROJECTS.map(project => (
            <div key={project.title}>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight">{project.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">{project.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href={ESTIMATE_HREF}
            className="inline-block bg-brass px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-opacity hover:opacity-90"
          >
            Request a Free Estimate
          </Link>
        </div>
      </section>

      <section className="bg-blueprint text-paper">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className={`${labelClass} text-brass`}>How We Work</h2>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {CONCERNS.map((c, i) => (
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
        <p className="mt-8 font-body text-sm text-ink/70">
          Need vendor paperwork first?{' '}
          <ObfuscatedEmail
            user="info"
            domain="mcloudconstruction.com"
            label="Email us"
            className="text-rust underline hover:text-brass"
          />{' '}
          for a W-9 or certificate of insurance.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className={`${labelClass} text-concrete`}>Related</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <Link href="/residential/accessibility-modifications" className="border-l-2 border-brass pl-4 hover:text-brass">
            <div className="font-display text-xl font-bold uppercase tracking-tight">Accessibility Modifications for Homes</div>
            <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
              Ramps, wider doorways, accessible kitchens, and bathrooms for homeowners and families.
            </p>
          </Link>
          {VERTICALS.filter(v => v.key === 'multi_family').map(v => (
            <Link key={v.key} href={`/commercial/${v.slug}`} className="border-l-2 border-brass pl-4 hover:text-brass">
              <div className="font-display text-xl font-bold uppercase tracking-tight">{v.title}</div>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">{v.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <CtaBanner
        heading="Have Units That Need to Be Accessible?"
        body="Tell us about the property, the number of units, and the specifications you are working from. We will follow up with next steps."
        href={ESTIMATE_HREF}
      />
    </>
  );
}
