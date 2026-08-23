import Link from 'next/link';

export const metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      {/* HERO: the thesis. No stock photography; the signature visual is an
          original technical elevation drawing, since that's the single most
          characteristic artifact in this subject's world: a marked-up plan. */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-32">
          <div>
            <div className="field-stamp text-brass">Kansas City Metro · MO &amp; KS</div>
            <h1 className="mt-6 font-display text-[3.4rem] font-extrabold uppercase leading-[0.92] tracking-tight md:text-[4.6rem]">
              Built right.
              <br />
              <span className="text-brass">Told straight.</span>
            </h1>
            <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-paper/80">
              McLoud Construction brings honest craftsmanship to remodels and commercial buildouts
              across the Kansas City metro. You&rsquo;ll always know what&rsquo;s happening, what&rsquo;s next,
              and who to call.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/consultation"
                className="bg-brass px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-opacity hover:opacity-90"
              >
                Get a Free Estimate
              </Link>
              <Link
                href="/residential"
                className="border border-paper/30 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:border-brass hover:text-brass"
              >
                Explore Our Services
              </Link>
            </div>
          </div>

          <ElevationDrawing />
        </div>
      </section>

      {/* Trust stamps */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-6 py-8 md:justify-between">
          <TrustStamp>Locally Owned</TrustStamp>
          <TrustStamp>Vetted Subcontractors</TrustStamp>
          <TrustStamp>Residential + Commercial</TrustStamp>
          <TrustStamp>Est. Kansas City</TrustStamp>
        </div>
      </section>

      {/* Residential / Commercial split */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <ServiceCard
            eyebrow="For Homeowners"
            title="Residential"
            body="Kitchens, bathrooms, and whole-home remodeling, spaces built around how you actually live."
            href="/residential"
            items={['Kitchen Remodeling', 'Bathroom Remodeling', 'Whole Home Remodeling']}
          />
          <ServiceCard
            eyebrow="For Property Owners"
            title="Commercial"
            body="Buildouts and renovations for multi-family, retail, office, and hospitality properties."
            href="/commercial"
            items={['Retail & Office Buildouts', 'Exterior Renovations', 'Clubhouse Remodels']}
            dark
          />
        </div>
      </section>

      {/* 6-step process, numbered because it IS a real, ordered sequence */}
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

      {/* Why homeowners choose us */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="font-display text-2xl font-medium leading-snug text-ink md:text-3xl">
          &ldquo;We take pride in getting the details right and treating every project like our
          reputation depends on it &mdash; because it does.&rdquo;
        </p>
        <div className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-concrete">
          Stachys &amp; Isabelle McLoud, Owners
        </div>
      </section>

      {/* Existing clients */}
      <section className="bg-ink text-paper">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-16 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Already Working With Us?</div>
            <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
              Track Your Project Online
            </h2>
            <p className="mt-2 max-w-md font-body text-paper/70">
              Log in to see your estimate, contract, photos, and invoices, and message us directly, all in one place.
            </p>
          </div>
          <a
            href="https://jobs.mcloudconstruction.com/customerportal"
            className="shrink-0 border border-brass px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-brass transition-colors hover:bg-brass hover:text-ink"
          >
            Client Portal Login →
          </a>
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
            Homeowners and commercial clients throughout communities across both Missouri and Kansas.
          </p>
          <Link
            href="/consultation"
            className="mt-9 inline-block bg-brass px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-opacity hover:opacity-90"
          >
            Start the Conversation
          </Link>
        </div>
      </section>
    </>
  );
}

const PROCESS = [
  { title: 'Request Your Free Estimate', body: 'Reach out to schedule your consultation. It takes a few minutes and starts everything moving.' },
  { title: 'In-Home Consultation', body: 'We visit your home, listen to your goals, and follow up with a detailed estimate and scope of work.' },
  { title: 'Agreement & Precision Measurement', body: "Once you're ready, you'll sign your agreement and we'll take a precise technical measurement of your space." },
  { title: 'Design & Material Selection', body: 'You choose finishes, fixtures, and materials with guidance from our team.' },
  { title: 'Pre-Construction Walkthrough', body: "We walk the finalized plan together, confirm details, and set the timeline before anything begins." },
  { title: 'Construction & Completion', body: 'Our team gets to work, with clear communication and careful craftsmanship every step of the way.' },
];

function TrustStamp({ children }) {
  return <div className="field-stamp text-ink/70">{children}</div>;
}

function ServiceCard({ eyebrow, title, body, href, items, dark }) {
  return (
    <Link
      href={href}
      className={`group block border p-9 transition-colors ${
        dark
          ? 'border-ink bg-ink text-paper hover:bg-blueprint'
          : 'border-ink/15 bg-transparent text-ink hover:border-brass'
      }`}
    >
      <div className={`font-mono text-xs uppercase tracking-[0.2em] ${dark ? 'text-brass' : 'text-rust'}`}>
        {eyebrow}
      </div>
      <h3 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight">{title}</h3>
      <p className={`mt-4 font-body leading-relaxed ${dark ? 'text-paper/75' : 'text-ink/70'}`}>{body}</p>
      <ul className="mt-6 space-y-1.5 font-mono text-xs uppercase tracking-[0.1em]">
        {items.map(item => (
          <li key={item} className={dark ? 'text-paper/60' : 'text-ink/50'}>• {item}</li>
        ))}
      </ul>
      <div className={`mt-7 font-mono text-xs uppercase tracking-[0.15em] ${dark ? 'text-brass' : 'text-rust'} group-hover:underline`}>
        Explore {title} →
      </div>
    </Link>
  );
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
        KITCHEN
      </text>
      <text x="335" y="205" textAnchor="middle" fill="currentColor" opacity="0.6" fontFamily="IBM Plex Mono" fontSize="9" letterSpacing="1">
        BATH
      </text>
      <text x="230" y="30" textAnchor="middle" fill="#A8471F" fontFamily="IBM Plex Mono" fontSize="9" letterSpacing="1">
        SCOPE: WHOLE HOME
      </text>
    </svg>
  );
}
