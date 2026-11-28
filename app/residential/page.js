import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import FinancingBanner from '@/components/FinancingBanner';
import FaqList from '@/components/FaqList';
import { ACCESSIBILITY_SERVICES } from '@/lib/residentialServices';
import { estimateHref } from '@/lib/projectOptions';
import { pageMetadata } from '@/lib/seo';
import { faqPageNode, graph, JsonLd, serviceNode } from '@/lib/schema';

export const metadata = pageMetadata({
  title: 'Home Remodeling in Kansas City, MO & KS',
  description:
    'Home remodeling contractor in Kansas City, MO & KS: kitchen and bathroom remodels, basement finishing, whole-home remodels, and tub-to-shower conversions.',
  path: '/residential',
});

const SERVICES = [
  {
    id: 'kitchen-remodeling',
    title: 'Kitchen Remodeling',
    page: '/residential/kitchen-remodeling',
    linkLabel: 'Kitchen remodeling in Kansas City',
    body: 'Cabinetry and countertops, layout changes, plumbing, electrical, flooring, and lighting, with guidance at every material and finish decision instead of a spec sheet.',
    points: ['Cabinetry & countertops', 'Layout & structural changes', 'Plumbing & electrical', 'Flooring & lighting'],
  },
  {
    id: 'bathroom-remodeling',
    title: 'Bathroom Remodeling',
    page: '/residential/bathroom-remodeling',
    linkLabel: 'Bathroom remodeling in Kansas City',
    body: 'Full gut renovations and focused updates, with the waterproofing, ventilation, and blocking you never see built as carefully as the tile you look at every morning.',
    points: ['Full gut renovations', 'Tile, showers & tubs', 'Vanities & fixtures', 'Ventilation & waterproofing'],
  },
  {
    id: 'basement-finishing',
    title: 'Basement Finishing',
    page: '/residential/basement-finishing',
    linkLabel: 'Basement finishing in Kansas City',
    body: 'Family rooms, guest suites, home offices, and bathrooms in the space you already own, with moisture checked and dealt with before any framing or drywall goes in.',
    points: ['Moisture checks first', 'Framing & insulation', 'Basement bathrooms', 'Egress & lighting'],
  },
  {
    id: 'whole-home-remodeling',
    title: 'Whole-Home Remodeling',
    body: "Some projects touch nearly every room: an open-concept conversion, a full interior overhaul, or a home that's simply outgrown its original layout. These jobs take real coordination across every trade, and that's exactly where a single point of contact and a clear schedule matter most.",
    points: ['Open-concept conversions', 'Multi-room renovations', 'Structural & layout changes', 'Full interior overhauls'],
  },
];

const FAQS = [
  {
    q: "Should I remodel the bathroom, convert the tub, or plan an aging-in-place bathroom?",
    a: "If you only want to replace a tub you do not use, a tub-to-shower conversion is the focused option. If you want a new bathroom overall, start with a bathroom remodel. If safety and getting older are the main reasons, an aging-in-place bathroom remodel plans the whole room around that. Many projects combine elements of all three.",
  },
  {
    q: "Can a kitchen or bathroom remodel include accessibility features?",
    a: "Yes. While walls and floors are open, it is easy to add blocking for grab bars, wider doorways, lever handles, pull-out storage, and low-threshold showers, and none of it has to look clinical.",
  },
  {
    q: "Can we stay in the house during the remodel?",
    a: "Most homeowners do. McLoud Construction protects the rest of the house, keeps the work area tidy, and tells you what is happening each day, so you know which rooms are usable and when.",
  },
  {
    q: "Is my basement ready to finish?",
    a: "It depends on moisture. We look for signs of water before anything else, and if there is an active problem it gets addressed before any framing or drywall goes in.",
    links: [{ label: 'Basement finishing', href: '/residential/basement-finishing' }],
  },
  {
    q: "Do you handle permits?",
    a: "Permit requirements vary by project and by city, and they differ between the Missouri and Kansas sides of the metro. We tell you what your scope needs during the estimate process.",
  },
  {
    q: "Do you take on whole-home remodels?",
    a: "Yes. Open-concept conversions, multi-room renovations, and full interior overhauls are coordinated across every trade with one point of contact and a clear schedule agreed before work starts.",
  },
];

export default function ResidentialPage() {
  return (
    <>
      <JsonLd
        data={graph(
          serviceNode({
            name: 'Home Remodeling',
            serviceType: 'Residential remodeling',
            description:
              'Kitchen remodels, bathroom remodels, basement finishing, whole-home remodels, and tub-to-shower conversions for homeowners across the Kansas City metro.',
            path: '/residential',
          }),
          faqPageNode(FAQS)
        )}
      />
      <PageHero
        eyebrow="For Kansas City Homeowners"
        title="Home Remodeling Contractor in Kansas City"
        subtitle="Built Around How You Actually Live"
        body="Kitchens, bathrooms, basements, and whole-home remodels across the Kansas City metro, on both sides of the state line, with honest communication from your first walkthrough to the final punch list."
        crumbs={[{ name: 'Homeowners', href: '/residential' }]}
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="font-mono text-xs uppercase tracking-[0.12em] text-brass">Kitchens, Baths, Basements &amp; Whole-Home</div>
        <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          Remodels You&rsquo;ll Use Every Day
        </h2>
        <div className="tick-rule mt-4 mb-12" />
        <div className="space-y-16">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              id={service.id}
              className="grid scroll-mt-28 gap-8 border-t border-ink/10 pt-12 first:border-t-0 first:pt-0 md:grid-cols-[auto_1fr]"
            >
              <span className="font-mono text-sm text-brass">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
                  {service.page ? (
                    <Link href={service.page} className="hover:text-brass">
                      {service.title}
                    </Link>
                  ) : (
                    service.title
                  )}
                </h3>
                <p className="mt-4 max-w-2xl font-body leading-relaxed text-ink/75">{service.body}</p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.1em] text-concrete">
                  {service.points.map(point => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {service.page && (
                    <Link
                      href={service.page}
                      className="font-mono text-xs uppercase tracking-[0.1em] text-brass hover:underline"
                    >
                      {service.linkLabel} →
                    </Link>
                  )}
                  <Link
                    href={estimateHref(service.id)}
                    className="font-mono text-xs uppercase tracking-[0.1em] text-brass hover:underline"
                  >
                    Request a Free Estimate →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl border-t border-ink/10 px-6 py-20">
          <div className="font-mono text-xs uppercase tracking-[0.12em] text-brass">Easier to Use for Years to Come</div>
          <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
            Accessibility &amp; Aging-in-Place
          </h2>
          <p className="mt-4 max-w-3xl font-body leading-relaxed text-ink/75">
            Planning for yourself or for a parent? Any remodel can include features that make a room safer and easier
            to use, and some projects are built around that from the start.{' '}
            <Link href="/residential/aging-in-place" className="text-brass underline hover:text-ink">
              See our aging-in-place and accessibility planning guide
            </Link>
            .
          </p>
          <div className="tick-rule mt-6 mb-10" />
          <div className="grid gap-10 md:grid-cols-3">
            {ACCESSIBILITY_SERVICES.map(service => (
              <div key={service.slug} className="border-l-2 border-brass pl-5">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight">
                  <Link href={`/residential/${service.slug}`} className="hover:text-brass">
                    {service.name}
                  </Link>
                </h3>
                <p className="mt-3 font-body leading-relaxed text-ink/75">{service.cardBlurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20" id="faq">
        <h2 className="font-mono text-xs uppercase tracking-[0.12em] text-brass">Homeowner Remodeling Questions</h2>
        <div className="tick-rule mt-3 mb-8" />
        <FaqList items={FAQS} />
        <p className="mt-8 font-body text-sm text-ink/70">
          More answers about estimates, insurance, and working with McLoud Construction are on our{' '}
          <Link href="/faq" className="text-brass underline hover:text-ink">
            general FAQ
          </Link>
          .
        </p>
      </section>

      <FinancingBanner />

      <section className="bg-blueprint text-paper">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.12em] text-brass">One Process, Every Time</div>
          <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
            Six Steps, Start to Finish
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-6">
            {[
              'Free Estimate',
              'In-Home Consultation',
              'Precise Measurement',
              'Material Selection',
              'Pre-Construction Walkthrough',
              'Clear Communication Throughout',
            ].map((step, i) => (
              <div key={step}>
                <div className="font-mono text-2xl font-bold text-brass">{String(i + 1).padStart(2, '0')}</div>
                <div className="tick-rule my-3" />
                <div className="font-display text-base font-bold uppercase leading-tight tracking-tight md:text-lg">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        body="Tell us about your project and we'll schedule a free in-home consultation."
        href="/consultation?vertical=residential"
      />
    </>
  );
}
