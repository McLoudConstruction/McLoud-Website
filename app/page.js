import Link from 'next/link';
import FinancingBanner from '@/components/FinancingBanner';
import Tagline from '@/components/Tagline';
import { CREDENTIALS, SERVICE_AREAS } from '@/lib/siteConfig';
import { ACCESSIBILITY_SERVICES } from '@/lib/residentialServices';
import { estimateHref, PROPERTY_MANAGER_NAV } from '@/lib/projectOptions';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Kansas City Remodeling Contractor | McLoud Construction',
  absolute: true,
  description:
    'Kansas City remodeling contractor for kitchens, bathrooms, basements, and accessibility remodels in MO & KS, plus renovations for property managers.',
  path: '/',
});

// Homeowner services, in menu order. Tub-to-shower conversions also appear in
// the accessibility section below.
const HOMEOWNER = [
  {
    id: 'kitchen-remodeling',
    title: 'Kitchen Remodeling',
    href: '/residential/kitchen-remodeling',
    body: 'Cabinetry, countertops, layout changes, plumbing, electrical, flooring, and lighting, with guidance at every material and finish decision.',
  },
  {
    id: 'bathroom-remodeling',
    title: 'Bathroom Remodeling',
    href: '/residential/bathroom-remodeling',
    body: 'Full gut renovations and focused updates, with the waterproofing, ventilation, and blocking you never see done as carefully as the tile you do.',
  },
  {
    id: 'basement-finishing',
    title: 'Basement Finishing',
    href: '/residential/basement-finishing',
    body: 'Family rooms, guest suites, offices, and bathrooms in the space you already own, with moisture checked before anything is framed.',
  },
  {
    id: 'whole-home-remodeling',
    title: 'Whole-Home Remodeling',
    href: '/residential#whole-home-remodeling',
    body: 'Open-concept conversions, multi-room renovations, and full interior overhauls, coordinated across every trade with one point of contact.',
  },
  {
    id: 'tub-to-shower-conversions',
    title: 'Tub-to-Shower Conversions',
    href: '/residential/tub-to-shower-conversions',
    body: 'Swap a tub you never use for a walk-in shower, with the subfloor, plumbing, and waterproofing done right underneath.',
  },
];

const WHY = [
  {
    title: 'Large-project experience',
    body: 'Stachys McLoud founded McLoud Construction after years in the restoration industry managing large projects for Kansas City property management companies.',
  },
  {
    title: 'Clean work in lived-in homes',
    body: 'Most of our residential clients stay home during the project. We protect the rest of the house, keep the work area tidy, and tell you what is happening each day.',
  },
  {
    title: 'Water problems found first',
    body: 'Before we close up a bathroom or finish a basement, we look for moisture and hidden damage, so the finished space stays dry and solid.',
  },
  {
    title: 'Insured, with vetted trades',
    body: 'McLoud Construction is insured, and every subcontractor is vetted before they set foot on your property. You get one point of contact from estimate to walkthrough.',
  },
];

export default function Home() {
  return (
    <>
      {/* HERO: the H1 is the main keyword; the subhead names the services and
          carries the brand line. */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="field-stamp text-brass">Kansas City Metro · MO &amp; KS</div>
            <h1 className="mt-6 font-display text-[3rem] font-extrabold uppercase leading-[0.95] tracking-tight md:text-[4rem]">
              Kansas City Remodeling Contractor
            </h1>
            <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-paper/85 md:text-xl">
              Kitchens, bathrooms, basements and accessibility remodels for homes across the KC metro.
            </p>
            <Tagline
              tone="dark"
              className="mt-4 font-display text-2xl font-bold uppercase leading-tight tracking-tight md:text-3xl"
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/consultation?vertical=residential"
                className="bg-brass px-6 py-3.5 text-center font-mono text-xs uppercase tracking-[0.15em] text-ink transition-opacity hover:opacity-90"
              >
                Request a Free Estimate
              </Link>
              <a
                href="#homeowners"
                className="border border-paper/30 px-6 py-3.5 text-center font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:border-brass hover:text-brass"
              >
                See Our Services
              </a>
            </div>
            <p className="mt-6 font-body text-sm text-paper/70">
              Property manager?{' '}
              <Link href="/commercial" className="text-brass underline hover:text-paper">
                Unit renovations, interior remodels, and accessible units
              </Link>
            </p>
          </div>

          <ElevationDrawing />
        </div>
      </section>

      {/* Trust stamps */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-6 py-8 md:justify-between">
          <TrustStamp>Locally Owned</TrustStamp>
          {CREDENTIALS.map(c => (
            <TrustStamp key={c}>{c}</TrustStamp>
          ))}
          <TrustStamp>Vetted Subcontractors</TrustStamp>
          <TrustStamp>Property Management Experience</TrustStamp>
          <TrustStamp>Missouri &amp; Kansas</TrustStamp>
        </div>
      </section>

      {/* Accessibility: its own section right under the hero, linking to both
          accessibility pages (homes and rental units). */}
      <section id="accessibility" className="scroll-mt-24 bg-blueprint text-paper">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Accessibility &amp; Aging-in-Place</div>
          <h2 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
            Safer, Easier Homes for Every Stage of Life
          </h2>
          <p className="mt-4 max-w-2xl font-body leading-relaxed text-paper/80">
            Planning ahead for yourself, helping a parent stay home, or making room for a walker or wheelchair.
            McLoud Construction builds accessibility changes that still look like they belong in the home.
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {ACCESSIBILITY_SERVICES.map(service => (
              <div key={service.slug} className="border-l-2 border-brass pl-5">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight">
                  <Link href={`/residential/${service.slug}`} className="hover:text-brass">
                    {service.name}
                  </Link>
                </h3>
                <p className="mt-3 font-body leading-relaxed text-paper/80">{service.cardBlurb}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/residential/aging-in-place"
              className="border border-brass px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-brass transition-colors hover:bg-brass hover:text-ink"
            >
              Aging-in-Place &amp; Accessibility Planning →
            </Link>
            <Link
              href="/commercial/accessible-units"
              className="border border-paper/30 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:border-brass hover:text-brass"
            >
              Accessible Units for Property Managers →
            </Link>
          </div>
        </div>
      </section>

      {/* Homeowners */}
      <section id="homeowners" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">For Homeowners</div>
        <h2 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
          Home Remodeling in Kansas City
        </h2>
        <p className="mt-4 max-w-2xl font-body leading-relaxed text-ink/70">
          The kitchens, bathrooms, and basements that make a house work better, and any remodel can include
          features that make the room easier to use for years to come.
        </p>
        <div className="tick-rule mt-6 mb-10" />
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {HOMEOWNER.map(item => (
            <div key={item.id}>
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight">
                <Link href={item.href} className="hover:text-brass">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-3 font-body leading-relaxed text-ink/70">{item.body}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                <Link
                  href={item.href}
                  className="font-mono text-xs uppercase tracking-[0.15em] text-brass hover:underline"
                >
                  {item.title} →
                </Link>
                <Link
                  href={estimateHref(item.id)}
                  className="font-mono text-xs uppercase tracking-[0.15em] text-brass hover:underline"
                >
                  Free estimate →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/residential"
          className="mt-12 inline-block border border-brass px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-brass transition-colors hover:bg-brass hover:text-paper"
        >
          All Homeowner Services →
        </Link>
      </section>

      <FinancingBanner />

      {/* Why McLoud Construction */}
      <section className="border-t border-ink/10 bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Why McLoud Construction</div>
          <Tagline
            tone="light"
            as="h2"
            className="mt-3 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-5xl"
          />
          <div className="tick-rule mt-4 mb-10" />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((item, i) => (
              <div key={item.title}>
                <div className="font-mono text-2xl font-bold text-brass">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight tracking-tight">{item.title}</h3>
                <p className="mt-2 font-body leading-relaxed text-ink/70">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-blueprint text-paper">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-paper/60">How a project moves</div>
          <h2 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
            Our Process
          </h2>

          <ol className="mt-14 space-y-0">
            {PROCESS.map((step, i) => (
              <li key={step.title} className="border-t border-paper/15 py-7 first:border-t-0 md:flex md:gap-8">
                <span className="font-mono text-sm text-brass md:w-16 md:shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight">{step.title}</h3>
                  <p className="mt-2 max-w-2xl font-body text-paper/75 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* For Property Managers */}
      <section id="property-managers" className="scroll-mt-24 bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">For Property Managers</div>
            <h2 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
              Renovations for Property Managers
            </h2>
            <p className="mt-5 max-w-lg font-body leading-relaxed text-paper/75">
              Unit renovations and turns, commercial interior remodels, accessible units, and exterior repaints and
              repairs, planned around residents, tenants, and leasing calendars.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/commercial"
                className="border border-brass px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-brass transition-colors hover:bg-brass hover:text-ink"
              >
                Property Manager Services →
              </Link>
              <Link
                href={estimateHref('commercial')}
                className="border border-paper/30 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:border-brass hover:text-brass"
              >
                Request a Property Estimate →
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 content-start gap-y-5 sm:grid-cols-2 sm:gap-x-6">
            {PROPERTY_MANAGER_NAV.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="border-l-2 border-brass pl-4 font-display text-xl font-bold uppercase tracking-tight transition-colors hover:text-brass"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Owners */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="font-display text-2xl font-medium leading-snug text-ink md:text-3xl">
          &ldquo;We take pride in getting the details right and treating every project like our
          reputation depends on it &mdash; because it does.&rdquo;
        </p>
        <div className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-concrete">
          Stachys &amp; Isabelle McLoud, Owners
        </div>
      </section>

      {/* Service area + final CTA */}
      <section className="grid-paper border-t border-ink/10 bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-concrete">Where We Work</div>
          <h2 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
            Covering the Kansas City Metro
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-ink/70">
            Homeowners and property managers throughout communities across both Missouri and Kansas.
          </p>
          <div className="mx-auto mt-10 grid max-w-2xl gap-8 text-left sm:grid-cols-2">
            {Object.entries(SERVICE_AREAS).map(([state, cities]) => (
              <div key={state}>
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">{state}</div>
                <div className="tick-rule my-3" />
                <p className="font-body text-sm leading-relaxed text-ink/70">{cities.join(' · ')}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-body text-xs text-ink/50">Don&rsquo;t see your community? Ask. We work throughout the metro.</p>
          <Link
            href="/consultation"
            className="mt-9 inline-block bg-brass px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-opacity hover:opacity-90"
          >
            Request a Free Estimate
          </Link>
        </div>
      </section>

      {/* Existing clients and trade partners: kept, but out of the way */}
      <section className="border-t border-paper/10 bg-ink text-paper">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 font-body text-sm text-paper/70 md:flex-row md:items-center md:justify-between">
          <p>
            Already working with us?{' '}
            <a href="https://jobs.mcloudconstruction.com/customerportal" className="text-brass underline hover:text-paper">
              Log in to your client portal
            </a>{' '}
            to see your estimate, contract, photos, and invoices.
          </p>
          <p>
            Subcontractor?{' '}
            <a href="https://jobs.mcloudconstruction.com/subcontractor-apply" className="text-brass underline hover:text-paper">
              Apply to work with McLoud Construction
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

const PROCESS = [
  { title: 'Request Your Free Estimate', body: 'Reach out to schedule your consultation. It takes a few minutes and starts everything moving.' },
  { title: 'On-Site Consultation', body: 'We visit, listen to your goals, and follow up with a detailed estimate and scope of work.' },
  { title: 'Agreement & Precision Measurement', body: "Once you're ready, you'll sign your agreement and we'll take a precise technical measurement of the space." },
  { title: 'Design & Material Selection', body: 'You choose finishes, fixtures, and materials with guidance from our team.' },
  { title: 'Pre-Construction Walkthrough', body: 'We walk the finalized plan together and confirm the details before anything begins.' },
  { title: 'Construction & Completion', body: 'Our team gets to work, with clear communication and careful craftsmanship every step of the way.' },
];

function TrustStamp({ children }) {
  return <div className="field-stamp text-ink/70">{children}</div>;
}

// Original elevation-style line drawing, the hero's signature visual,
// standing in for photography we don't have and won't fake. The three labels
// sit below the ground line (not on the drawing) so they stay readable, and
// each speaks to one kind of customer: the left door to accessibility, the
// right door to property managers, and the full-width dimension to homeowners.
// The top label follows the tagline rule in components/Tagline.js (dark
// background: "Built Right." paper #EDE7DA, "Told Straight." brass #9B773D).
const LABEL = { fontFamily: 'IBM Plex Mono', fontSize: 13, letterSpacing: 1, textAnchor: 'middle' };

function ElevationDrawing() {
  return (
    <svg viewBox="0 0 460 350" className="w-full text-paper/90" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M40 260 L40 140 L230 40 L420 140 L420 260" />
        <path d="M40 260 L420 260" />
        <path d="M90 260 L90 170 L150 170 L150 260" />
        <path d="M300 260 L300 150 L370 150 L370 260" />
        <path d="M230 40 L230 260" strokeDasharray="3 4" opacity="0.4" />
      </g>
      <g stroke="#9B773D" strokeWidth="1">
        {/* Leaders from each door down to its label */}
        <line x1="120" y1="264" x2="120" y2="276" />
        <line x1="335" y1="264" x2="335" y2="276" />
        {/* Dimension line, broken in the middle for its label */}
        <line x1="40" y1="322" x2="114" y2="322" />
        <line x1="346" y1="322" x2="420" y2="322" />
        <line x1="40" y1="316" x2="40" y2="328" />
        <line x1="420" y1="316" x2="420" y2="328" />
        <line x1="40" y1="140" x2="20" y2="140" strokeDasharray="2 3" opacity="0.5" />
        <line x1="40" y1="40" x2="10" y2="40" />
        <line x1="10" y1="34" x2="10" y2="46" />
      </g>
      <text x="120" y="293" fill="#EDE7DA" {...LABEL}>
        AGING IN PLACE
      </text>
      <text x="335" y="293" fill="#EDE7DA" {...LABEL}>
        UNIT RENOVATIONS
      </text>
      <text x="230" y="326" fill="#9B773D" {...LABEL}>
        KITCHEN · BATH · BASEMENT
      </text>
      <text x="230" y="0" fontFamily="IBM Plex Mono" fontSize="12" letterSpacing="1" textAnchor="middle">
        <tspan x="230" dy="15" fill="#EDE7DA">BUILT RIGHT.</tspan>
        <tspan x="230" dy="15" fill="#9B773D">TOLD STRAIGHT.</tspan>
      </text>
    </svg>
  );
}
