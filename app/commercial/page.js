import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';

export const metadata = {
  title: 'Commercial Buildouts & Capital Improvements | McLoud',
  description:
    'Exterior repaints, retail and office buildouts, and multifamily amenity renovations for commercial property owners across the Kansas City metro.',
  alternates: { canonical: '/commercial' },
  openGraph: {
    title: 'Commercial Buildouts & Capital Improvements | McLoud',
    description:
      'Exterior repaints, retail and office buildouts, and multifamily amenity renovations for commercial property owners across the Kansas City metro.',
    url: '/commercial',
  },
};

const GROUPS = [
  {
    label: 'Exteriors',
    services: [
      { title: 'Full Exterior Paints', body: 'Complete exterior repaints for multi-building properties, coordinated to minimize disruption to tenants and residents.' },
      { title: 'Wood Rot & Trim Replacement', body: 'Rot repair and trim replacement that addresses the underlying moisture issue, not just the visible damage.' },
      { title: 'Stucco Repairs', body: 'Patch and repair work matched to existing texture and color, so the fix disappears into the surface.' },
    ],
  },
  {
    label: 'Renovations & Buildouts',
    services: [
      { title: 'Exterior & Interior Renovations', body: 'Full-scope renovation work spanning both the building envelope and interior spaces, coordinated as one project.' },
      { title: 'Retail Buildout & Renovations', body: 'Buildouts and renovations for retail spaces, built around real move-in timelines and lease deadlines.' },
      { title: 'Office Buildout & Renovations', body: 'Office space buildouts and renovations, from full-floor reconfigurations to targeted updates.' },
    ],
  },
  {
    label: 'Finishing & Amenities',
    services: [
      { title: 'Finish Carpentry', body: 'Precision trim, millwork, and finish carpentry for spaces where the details are what tenants actually notice.' },
      { title: 'Clubhouse Remodels & Renovations', body: 'Full remodels for multi-family clubhouses and shared amenity spaces, built to handle real daily use.' },
      { title: 'Amenity Additions & Renovations', body: 'New amenity spaces and renovations to existing ones, planned around how residents actually use them.' },
    ],
  },
];

const INDUSTRIES = ['Multi-Family', 'Hotel & Lodging', 'Office', 'Retail', 'Recreational Facilities', 'Churches'];

export default function CommercialPage() {
  return (
    <>
      <PageHero
        eyebrow="For Property Owners"
        title="Commercial Buildouts & Renovations"
        body="From full exterior renovations to interior buildouts, we work with property managers and owners who need a contractor that shows up, communicates clearly, and finishes on schedule."
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        {GROUPS.map(group => (
          <div key={group.label} className="mb-16 last:mb-0">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-rust">{group.label}</div>
            <div className="tick-rule mt-3 mb-8" />
            <div className="grid gap-8 md:grid-cols-3">
              {group.services.map(service => (
                <div key={service.title}>
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight">{service.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">{service.body}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Industries We Serve</div>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-3">
            {INDUSTRIES.map(industry => (
              <div key={industry} className="border-l-2 border-brass pl-4 font-display text-2xl font-bold uppercase tracking-tight">
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Have a Property That Needs Work?"
        body="Tell us about the scope and timeline, and we'll follow up with next steps."
      />
    </>
  );
}
