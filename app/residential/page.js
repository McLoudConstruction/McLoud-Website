import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';

const SERVICES = [
  {
    title: 'Kitchen Remodeling',
    body: "The kitchen carries more daily use than any other room in the house, so it has to hold up to real life while still feeling like the heart of the home. We handle everything from cabinetry and countertops to layout changes, plumbing, and electrical, working through your options with you at every material and finish decision, not just handing you a spec sheet.",
    points: ['Cabinetry & countertops', 'Layout & structural changes', 'Plumbing & electrical', 'Flooring & lighting'],
  },
  {
    title: 'Bathroom Remodeling',
    body: "Bathrooms are unforgiving of shortcuts. Waterproofing, ventilation, and fixture placement all have to be right the first time. Whether it's a full gut renovation or a focused update, we treat the parts you'll never see (moisture barriers, proper slope, solid blocking) with the same care as the tile you'll look at every morning.",
    points: ['Full gut renovations', 'Tile, showers & tubs', 'Vanities & fixtures', 'Ventilation & waterproofing'],
  },
  {
    title: 'Whole Home Remodeling',
    body: "Some projects touch nearly every room: an open-concept conversion, a full interior overhaul, or a home that's simply outgrown its original layout. These jobs take real coordination across every trade, and that's exactly where a single point of contact and a clear schedule matter most.",
    points: ['Open-concept conversions', 'Multi-room renovations', 'Structural & layout changes', 'Full interior overhauls'],
  },
];

export default function ResidentialPage() {
  return (
    <>
      <PageHero
        eyebrow="For Homeowners"
        title="Residential Remodeling"
        body="Kitchens, bathrooms, and whole-home projects, built around how you actually live, with honest communication from your first walkthrough to the final punch list."
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="space-y-16">
          {SERVICES.map((service, i) => (
            <div key={service.title} className="grid gap-8 border-t border-ink/10 pt-12 first:border-t-0 first:pt-0 md:grid-cols-[auto_1fr]">
              <span className="font-mono text-sm text-brass">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
                  {service.title}
                </h2>
                <p className="mt-4 max-w-2xl font-body leading-relaxed text-ink/75">{service.body}</p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.1em] text-concrete">
                  {service.points.map(point => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blueprint text-paper">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">One Process, Every Time</div>
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
                <div className="font-display text-sm font-bold uppercase leading-tight tracking-tight">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner body="Tell us about your project and we'll schedule a free in-home consultation." />
    </>
  );
}
