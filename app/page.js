import Link from 'next/link';
import FinancingBanner from '@/components/FinancingBanner';
import { CREDENTIALS, SERVICE_AREAS } from '@/lib/siteConfig';
import { RESIDENTIAL_SERVICES } from '@/lib/residentialServices';
import { VERTICALS } from '@/lib/verticals';
import { estimateHref } from '@/lib/projectOptions';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Kansas City Remodeling for Every Stage of Life | McLoud Construction',
  absolute: true,
  description:
    'Aging-in-place bathrooms, accessibility modifications, tub-to-shower conversions, basement finishing, and kitchen and bath remodels across the Kansas City metro.',
  path: '/',
});

// "What brings you here?" One tile per kind of visitor, each pointing at the
// page written for them.
const PATHS = [
  {
    eyebrow: 'Staying in your home',
    title: 'I want to stay in my home as I get older',
    href: '/residential/aging-in-place-bathroom-remodels',
    cta: 'Aging-in-place bathrooms',
  },
  {
    eyebrow: 'Planning for a parent',
    title: 'I am helping a parent stay safely at home',
    href: '/residential/aging-in-place',
    cta: 'Aging-in-place planning',
  },
  {
    eyebrow: 'Wheelchair or walker',
    title: 'Someone at home needs easier access',
    href: '/residential/accessibility-modifications',
    cta: 'Accessibility modifications',
  },
  {
    eyebrow: 'The tub goes unused',
    title: 'I would rather have a walk-in shower',
    href: '/residential/tub-to-shower-conversions',
    cta: 'Tub-to-shower conversions',
  },
  {
    eyebrow: 'Need more room',
    title: 'We need more living space without moving',
    href: '/residential/basement-finishing',
    cta: 'Basement finishing',
  },
  {
    eyebrow: 'Kitchen or bath',
    title: 'I want a new kitchen or bathroom',
    href: '/residential#kitchen-remodeling',
    cta: 'Kitchen & bath remodeling',
  },
];

const EVERYDAY = [
  {
    id: 'kitchen-remodeling',
    title: 'Kitchen Remodeling',
    body: 'Cabinetry, countertops, layout changes, plumbing, electrical, flooring, and lighting, with guidance at every material and finish decision.',
  },
  {
    id: 'bathroom-remodeling',
    title: 'Bathroom Remodeling',
    body: 'Full gut renovations and focused updates, with the waterproofing, ventilation, and blocking you never see done as carefully as the tile you do.',
  },
  {
    id: 'whole-home-remodeling',
    title: 'Whole-Home Remodeling',
    body: 'Open-concept conversions, multi-room renovations, and full interior overhauls, coordinated across every trade with one point of contact.',
  },
];

const WHY = [
  {
    title: 'A restoration background',
    body: 'Stachys McLoud came to McLoud Construction from restoration, doing large demo-and-rebuild work for property management companies. We know how to open a room up and put it back together the right way.',
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
      {/* HERO: the niches lead. The tagline stays as the brand line; the H1
          carries what McLoud Construction does and where. */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="field-stamp text-brass">Kansas City Metro · MO &amp; KS</div>
            <h1 className="mt-6 font-display text-[3rem] font-extrabold uppercase leading-[0.95] tracking-tight md:text-[4rem]">
              Kansas City Remodeling for Every Stage of Life
            </h1>
            <p className="mt-5 font-display text-2xl font-bold uppercase tracking-tight text-brass md:text-3xl">
              Built right. Told straight.
            </p>
            <p className="mt-5 max-w-lg font-body text-lg leading-relaxed text-paper/80">
              Aging-in-place bathrooms, accessibility modifications, tub-to-shower conversions, and basement
              finishing, plus the kitchen and bath remodels McLoud Construction has always done. You&rsquo;ll
              always know what&rsquo;s happening, what&rsquo;s next, and who to call.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/consultation?vertical=residential"
                className="bg-brass px-6 py-3.5 text-center font-mono text-xs uppercase tracking-[0.15em] text-ink transition-opacity hover:opacity-90"
              >
                Request a Free Estimate
              </Link>
              <a
                href="#specialties"
                className="border border-paper/30 px-6 py-3.5 text-center font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:border-brass hover:text-brass"
              >
                See Our Specialties
              </a>
            </div>
            <p className="mt-6 font-body text-sm text-paper/70">
              Property manager?{' '}
              <Link href="/commercial" className="text-brass underline hover:text-paper">
                Commercial renovations and accessible-unit upgrades
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
          <TrustStamp>Demo &amp; Rebuild Experience</TrustStamp>
          <TrustStamp>Missouri &amp; Kansas</TrustStamp>
        </div>
      </section>

      {/* Audience paths */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-rust">Start Here</div>
        <h2 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
          What Brings You Here?
        </h2>
        <div className="tick-rule mt-4 mb-10" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PATHS.map(path => (
            <Link
              key={path.href}
              href={path.href}
              className="group block border border-ink/15 p-7 transition-colors hover:border-brass"
            >
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-rust">{path.eyebrow}</div>
              <h3 className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-tight">{path.title}</h3>
              <div className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-rust group-hover:underline">
                {path.cta} →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Specialties */}
      <section id="specialties" className="scroll-mt-24 bg-blueprint text-paper">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Our Specialties</div>
          <h2 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
            Safer, More Accessible, More Room
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {RESIDENTIAL_SERVICES.map(service => (
              <div key={service.slug} className="border-l-2 border-brass pl-5">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight">
                  <Link href={`/residential/${service.slug}`} className="hover:text-brass">
                    {service.name}
                  </Link>
                </h3>
                <p className="mt-3 font-body leading-relaxed text-paper/80">{service.cardBlurb}</p>
                <Link
                  href={`/residential/${service.slug}`}
                  className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.15em] text-brass hover:underline"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kitchen, bath and whole-home: still a full part of the business */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-rust">Kitchen, Bath &amp; Whole-Home</div>
        <h2 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
          The Rooms You Use Every Day
        </h2>
        <p className="mt-4 max-w-2xl font-body leading-relaxed text-ink/70">
          McLoud Construction still builds the kitchens and bathrooms that make a house feel new, and any remodel
          can include features that make the room easier to use for years to come.
        </p>
        <div className="tick-rule mt-6 mb-10" />
        <div className="grid gap-10 md:grid-cols-3">
          {EVERYDAY.map(item => (
            <div key={item.id}>
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight">{item.title}</h3>
              <p className="mt-3 font-body leading-relaxed text-ink/70">{item.body}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                <Link
                  href={`/residential#${item.id}`}
                  className="font-mono text-xs uppercase tracking-[0.15em] text-rust hover:underline"
                >
                  Details →
                </Link>
                <Link
                  href={estimateHref(item.id)}
                  className="font-mono text-xs uppercase tracking-[0.15em] text-rust hover:underline"
                >
                  Free estimate →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why McLoud Construction */}
      <section className="border-t border-ink/10 bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-rust">Why McLoud Construction</div>
          <h2 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
            Built by a Demo-and-Rebuild Crew
          </h2>
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

      {/* Commercial and property management */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">For Property Owners &amp; Managers</div>
            <h2 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
              Commercial &amp; Property Management
            </h2>
            <p className="mt-5 max-w-lg font-body leading-relaxed text-paper/75">
              Exterior repaints, buildouts, unit renovations, and amenity remodels, planned around residents,
              guests, and leasing calendars. We also upgrade units for residents with mobility needs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/commercial"
                className="border border-brass px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-brass transition-colors hover:bg-brass hover:text-ink"
              >
                Explore Commercial →
              </Link>
              <Link
                href="/commercial/accessible-units"
                className="border border-paper/30 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:border-brass hover:text-brass"
              >
                Accessible Unit Upgrades →
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 content-start gap-x-6 gap-y-5">
            {VERTICALS.map(v => (
              <Link
                key={v.key}
                href={`/commercial/${v.slug}`}
                className="border-l-2 border-brass pl-4 font-display text-xl font-bold uppercase tracking-tight transition-colors hover:text-brass"
              >
                {v.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinancingBanner />

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
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-rust">{state}</div>
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
// standing in for photography we don't have and won't fake.
function ElevationDrawing() {
  return (
    <svg viewBox="0 0 460 360" className="w-full text-paper/90" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M40 260 L40 140 L230 40 L420 140 L420 260" />
        <path d="M40 260 L420 260" />
        <path d="M90 260 L90 170 L150 170 L150 260" />
        <path d="M300 260 L300 150 L370 150 L370 260" />
        <path d="M230 40 L230 260" strokeDasharray="3 4" opacity="0.4" />
      </g>
      <g stroke="#9B773D" strokeWidth="1">
        <line x1="40" y1="290" x2="420" y2="290" />
        <line x1="40" y1="284" x2="40" y2="296" />
        <line x1="420" y1="284" x2="420" y2="296" />
        <line x1="40" y1="140" x2="20" y2="140" strokeDasharray="2 3" opacity="0.5" />
        <line x1="40" y1="40" x2="10" y2="40" />
        <line x1="10" y1="34" x2="10" y2="46" />
      </g>
      <text x="230" y="308" textAnchor="middle" fill="#9B773D" fontFamily="IBM Plex Mono" fontSize="10" letterSpacing="1">
        38&apos;-0&quot;
      </text>
      <text x="120" y="215" textAnchor="middle" fill="currentColor" opacity="0.6" fontFamily="IBM Plex Mono" fontSize="9" letterSpacing="1">
        WIDER DOORWAY
      </text>
      <text x="335" y="205" textAnchor="middle" fill="currentColor" opacity="0.6" fontFamily="IBM Plex Mono" fontSize="9" letterSpacing="1">
        CURBLESS SHOWER
      </text>
      <text x="230" y="30" textAnchor="middle" fill="#A8471F" fontFamily="IBM Plex Mono" fontSize="9" letterSpacing="1">
        SCOPE: EVERY STAGE OF LIFE
      </text>
    </svg>
  );
}
