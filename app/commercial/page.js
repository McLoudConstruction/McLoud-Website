import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import ObfuscatedEmail from '@/components/ObfuscatedEmail';
import FaqList from '@/components/FaqList';
import { VERTICALS } from '@/lib/verticals';
import { pageMetadata } from '@/lib/seo';
import { faqPageNode, graph, JsonLd, serviceNode } from '@/lib/schema';

// The Property Managers hub. The industry pages (office, retail, hotels,
// churches, recreational facilities) were folded into this page and
// /commercial/interior-remodels; their old URLs redirect in next.config.js.

export const metadata = pageMetadata({
  title: 'Commercial & Property Management Renovations in Kansas City',
  description:
    'Renovation contractor for Kansas City property managers: unit renovations and turns, commercial interior remodels, accessible units, and exterior repairs.',
  path: '/commercial',
});

const SERVICES = [
  {
    title: 'Unit Renovations & Turns',
    href: '/commercial/unit-renovations',
    body: 'Kitchens, baths, flooring, and finishes between residents or as full interior renovations, built to your property standard.',
  },
  {
    title: 'Commercial Interior Remodels',
    href: '/commercial/interior-remodels',
    body: 'Office and retail buildouts, lobbies, clubhouses, leasing offices, and community spaces, planned around tenants and open hours.',
  },
  {
    title: 'Accessible Unit Upgrades',
    href: '/commercial/accessible-units',
    body: 'Roll-in showers, wider doorways, and accessible kitchens for residents with mobility needs, built to your specifications.',
  },
  {
    title: 'Multi-Family Renovations',
    href: '/commercial/multi-family',
    body: 'Units, amenities, and exteriors for apartment communities, sequenced around residents and your leasing calendar.',
  },
];

const EXTERIOR = [
  { title: 'Exterior Repaints', body: 'Complete exterior repaints for multi-building properties, sequenced building by building to keep disruption to tenants and residents low.' },
  { title: 'Wood Rot & Trim Replacement', body: 'Rot repair and trim replacement that addresses the underlying moisture issue, not just the visible damage.' },
  { title: 'Stucco Repairs', body: 'Patch and repair work matched to existing texture and color, so the fix disappears into the surface.' },
];

// Property types are listed (not linked) so the folded industries keep a
// mention on the hub. Labels come from lib/verticals.js.
const PROPERTY_TYPES = VERTICALS.map(v => v.label);

const EXPECT = [
  {
    title: 'One point of contact',
    body: 'You know who to call from the first estimate through the final walkthrough, with no getting bounced around.',
  },
  {
    title: 'Schedules built around you',
    body: 'We plan around your leasing calendar, lease dates, and occupied buildings, and tell you early if something threatens the schedule.',
  },
  {
    title: 'Clear scope and cost',
    body: 'A clear scope and a straight answer on cost before work starts. Change orders are written down.',
  },
  {
    title: 'Vetted trades',
    body: 'Every subcontractor is vetted before they ever set foot on your property.',
  },
];

const FAQS = [
  {
    q: "What kinds of properties do you work on?",
    a: "Apartment communities and rental properties first, plus offices, retail spaces, hotels and lodging, churches, and recreational and community facilities across the Kansas City metro.",
  },
  {
    q: "Can you work while the property stays open?",
    a: "Yes. For apartment communities, hotels, retail centers, and other properties that stay open, we plan access, noise, and sequencing around residents, guests, and customers, and build the schedule around your leasing calendar or lease dates.",
  },
  {
    q: "Do you provide a W-9 and certificate of insurance?",
    a: "Yes. McLoud Construction is insured, and we can send a W-9 and a certificate of insurance for vendor onboarding.",
  },
  {
    q: "Do you handle unit turns and full unit renovations?",
    a: "Yes. McLoud Construction renovates units between residents and takes units down to the studs when the job calls for it. Stachys McLoud founded the company after years in the restoration industry managing large projects for Kansas City property management companies, so leasing calendars and occupied buildings are familiar ground.",
    links: [{ label: 'Unit renovations & turns', href: '/commercial/unit-renovations' }],
  },
  {
    q: "Do you do exterior repairs and repaints?",
    a: "Yes. Exterior repaints, wood rot and trim replacement, and stucco repairs, sequenced building by building so tenants and residents know what to expect.",
  },
];

const schema = graph(
  serviceNode({
    name: 'Commercial & Property Management Renovations',
    serviceType: 'Commercial and property management renovation',
    description:
      'Renovations for property managers and owners across the Kansas City metro, including unit renovations and turns, commercial interior remodels, accessible units, and exterior repaints and repairs.',
    path: '/commercial',
  }),
  faqPageNode(FAQS)
);

export default function CommercialPage() {
  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow="For Property Managers & Owners"
        title="Kansas City Renovation Contractor for Property Managers"
        subtitle="Commercial Buildouts & Renovations"
        body="McLoud Construction works with property managers and owners across the Kansas City metro who need a contractor that shows up, communicates clearly, and plans around the people using the property: unit renovations, interior remodels, accessible units, and exterior repairs."
        crumbs={[{ name: 'Property Managers', href: '/commercial' }]}
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-rust">What We Do for Property Managers</div>
        <div className="tick-rule mt-3 mb-8" />
        <div className="grid gap-10 md:grid-cols-2">
          {SERVICES.map(service => (
            <div key={service.href} className="border-l-2 border-brass pl-5">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                <Link href={service.href} className="hover:text-rust">
                  {service.title}
                </Link>
              </h2>
              <p className="mt-3 font-body leading-relaxed text-ink/70">{service.body}</p>
              <Link
                href={service.href}
                className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.15em] text-rust hover:underline"
              >
                {service.title} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="exterior-work" className="scroll-mt-24 bg-blueprint text-paper">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Exterior Work</div>
          <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
            Exterior Repairs &amp; Repaints
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {EXTERIOR.map(item => (
              <div key={item.title}>
                <div className="tick-rule mb-3" />
                <h3 className="font-display text-xl font-bold uppercase tracking-tight">{item.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-paper/80">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-rust">Properties We Work On</div>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {PROPERTY_TYPES.map(label => (
              <li key={label} className="border-l-2 border-brass pl-3 font-display text-lg font-bold uppercase tracking-tight">
                {label}
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-2xl font-body text-sm leading-relaxed text-ink/70">
            Offices, retail spaces, hotels, churches, and recreational facilities are covered under{' '}
            <Link href="/commercial/interior-remodels" className="text-rust underline hover:text-ink">
              commercial interior remodels
            </Link>{' '}
            and the exterior work above.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-rust">Working With Property Managers</div>
        <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          What You Can Expect
        </h2>
        <div className="tick-rule mt-4 mb-8" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {EXPECT.map((item, i) => (
            <div key={item.title}>
              <div className="font-mono text-2xl font-bold text-brass">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight tracking-tight">{item.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-2xl font-body text-sm text-ink/70">
          Need a W-9 or a certificate of insurance for vendor onboarding? Ask and we&rsquo;ll send them over:{' '}
          <ObfuscatedEmail
            user="info"
            domain="mcloudconstruction.com"
            label="Email us"
            className="text-rust underline hover:text-brass"
          />
          .
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20" id="faq">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-rust">Property Manager Questions</h2>
        <div className="tick-rule mt-3 mb-8" />
        <FaqList items={FAQS} />
        <p className="mt-8 font-body text-sm text-ink/70">
          General questions about estimates and working with McLoud Construction are on our{' '}
          <Link href="/faq" className="text-rust underline hover:text-ink">
            FAQ page
          </Link>
          .
        </p>
      </section>

      <CtaBanner
        heading="Have a Property That Needs Work?"
        body="Tell us about the scope and timeline, and we'll follow up with next steps."
      />
    </>
  );
}
