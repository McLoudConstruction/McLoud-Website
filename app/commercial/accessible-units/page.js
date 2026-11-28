import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import ObfuscatedEmail from '@/components/ObfuscatedEmail';
import FaqList from '@/components/FaqList';
import PropertyManagerLinks from '@/components/PropertyManagerLinks';
import { pageMetadata } from '@/lib/seo';
import { faqPageNode, graph, JsonLd, serviceNode } from '@/lib/schema';
import { estimateHref } from '@/lib/projectOptions';

// Property manager page for units that need to be accessible. It is listed in
// both the Property Managers and Accessibility menus. It is not an entry in lib/verticals.js,
// because each vertical key must also exist in the jobs platform. Leads from
// here are sent as multi-family with "Accessible Unit Upgrades" as the project.

const PATH = '/commercial/accessible-units';
const ESTIMATE_HREF = estimateHref('accessible-units');

export const metadata = pageMetadata({
  title: 'Accessible Unit Upgrades in Kansas City',
  description:
    'Accessible unit upgrades for Kansas City property managers: roll-in showers, wider doorways, lowered counters, and entries, built in occupied buildings.',
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
    title: 'Property management experience',
    body: 'Stachys McLoud founded McLoud Construction after years in the restoration industry managing large projects for Kansas City property management companies. Occupied buildings, on-site teams, and unit schedules are familiar ground.',
  },
];

const FAQS = [
  {
    q: "Can you work while neighboring units are occupied?",
    a: "Yes. We plan access, noise, and dust control around residents and coordinate the schedule with your on-site team before work starts.",
  },
  {
    q: "Which accessibility standard applies to our units?",
    a: "That depends on the property, when it was built, and any program it participates in. The ADA, Fair Housing Act design requirements, and funding-program standards can each apply in different situations. McLoud Construction builds to the specifications and drawings provided by you or your design professional, who determines which standard applies.",
  },
  {
    q: "Can you work from our accessibility specifications?",
    a: "Yes. Send the specifications or drawings for the unit, and we will build to them and raise any conflicts with existing conditions before work begins.",
  },
];

const schema = graph(
  {
    ...serviceNode({
      name: 'Accessible Unit Upgrades',
      serviceType: 'Accessible unit renovation for property managers',
      description:
        'Accessible unit upgrades for apartment communities and rental properties across the Kansas City metro, including roll-in showers, wider doorways, accessible kitchens, and accessible entries.',
      path: PATH,
    }),
    audience: { '@type': 'BusinessAudience', audienceType: 'Property managers and owners' },
  },
  faqPageNode(FAQS)
);

const labelClass = 'font-mono text-xs uppercase tracking-[0.12em]';

export default function AccessibleUnitsPage() {
  return (
    <>
      <JsonLd data={schema} />

      <PageHero
        eyebrow="For Property Managers · Kansas City"
        title="Accessible Unit Upgrades in Kansas City"
        subtitle="Accessible Units, Built Around the Residents Who Stay"
        body="McLoud Construction upgrades apartment and rental units for residents who use wheelchairs, walkers, or other mobility aids, working around the residents who stay in the building."
        crumbs={[
          { name: 'Property Managers', href: '/commercial' },
          { name: 'Accessible Units', href: PATH },
        ]}
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className={`${labelClass} text-brass`}>What We Handle</h2>
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
            className="inline-block bg-brass px-8 py-4 font-mono text-xs uppercase tracking-[0.1em] text-ink transition-opacity hover:opacity-90"
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

      <section className="mx-auto max-w-3xl px-6 py-16" id="faq">
        <h2 className={`${labelClass} text-brass`}>Accessible Unit Questions</h2>
        <div className="tick-rule mt-3 mb-8" />
        <FaqList items={FAQS} />
        <p className="mt-8 font-body text-sm text-ink/70">
          Need vendor paperwork first?{' '}
          <ObfuscatedEmail
            user="info"
            domain="mcloudconstruction.com"
            label="Email us"
            className="text-brass underline hover:text-ink"
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
          <Link href="/commercial/unit-renovations" className="border-l-2 border-brass pl-4 hover:text-brass">
            <div className="font-display text-xl font-bold uppercase tracking-tight">Unit Renovations &amp; Turns</div>
            <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
              Kitchens, baths, flooring, and finishes between residents, built to your property standard.
            </p>
          </Link>
        </div>
      </section>

      <PropertyManagerLinks current={PATH} />

      <CtaBanner
        heading="Have Units That Need to Be Accessible?"
        body="Tell us about the property, the number of units, and the specifications you are working from. We will follow up with next steps."
        href={ESTIMATE_HREF}
      />
    </>
  );
}
