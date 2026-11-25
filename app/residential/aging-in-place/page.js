import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import FaqList from '@/components/FaqList';
import { pageMetadata } from '@/lib/seo';
import { faqPageNode, graph, JsonLd, serviceNode } from '@/lib/schema';
import { ACCESSIBILITY_SERVICES } from '@/lib/residentialServices';

// The Accessibility hub: for older homeowners, adult children planning with a
// parent, and anyone who needs a home to work with a walker or wheelchair. It
// routes visitors to the specific service pages rather than repeating them,
// and points property managers at accessible units.

const PATH = '/residential/aging-in-place';
const ESTIMATE_HREF = '/consultation?vertical=residential';
const FAMILY_ESTIMATE_HREF = '/consultation?vertical=residential&for=family';

export const metadata = pageMetadata({
  title: 'Aging in Place & Accessibility Remodeling in Kansas City',
  description:
    'Aging-in-place and accessibility remodeling in Kansas City: safer bathrooms, tub-to-shower conversions, ramps, and wider doorways, for you or a parent.',
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
  'Stachys McLoud founded McLoud Construction after years in the restoration industry managing large projects for Kansas City property management companies. Aging-in-place work often means opening up a wall or floor, so we plan for what might be behind it and finish the room properly.',
  'Most of our clients stay home during the work. We protect the rest of the house, keep the work area tidy, and make sure you always know what is happening next.',
  'McLoud Construction is insured, every subcontractor is vetted, and you have one point of contact from the first visit to the final walkthrough.',
];

const FAQS = [
  {
    q: "What does aging in place mean?",
    a: "It means continuing to live safely and comfortably in your own home as you get older, instead of moving. Home modifications, such as a safer bathroom, an easier entry, and wider doorways, are a big part of making that possible.",
  },
  {
    q: "Where should we start?",
    a: "Most families start with the bathroom or the main entry, because those are where getting around becomes hardest first. A walkthrough helps you see which changes would help most in your home.",
  },
  {
    q: "Can I request an estimate for my parent?",
    a: "Yes. Request the estimate yourself and choose \"A parent or family member\" on the form. We coordinate the visit with you and your parent, and family members are welcome at the walkthrough.",
  },
  {
    q: "Do we have to do everything at once?",
    a: "No. Many families make the most important change first and plan the rest later. We can lay out the work in an order that makes sense for the home and the budget.",
  },
  {
    q: "Do you make apartments or rental units accessible?",
    a: "Yes. For property managers, McLoud Construction upgrades units for residents with mobility needs, built to the specifications you or your design professional provide.",
    links: [{ label: 'Accessible units for property managers', href: '/commercial/accessible-units' }],
  },
  {
    q: "Should we talk to an occupational therapist first?",
    a: "It can help. An occupational therapist can assess how a person moves through the day and recommend specific changes. If you have those recommendations, we are glad to build from them.",
  },
];

const schema = graph(
  serviceNode({
    name: 'Aging-in-Place & Accessibility Remodeling',
    serviceType: 'Aging-in-place and accessibility home remodeling',
    description:
      'Aging-in-place and accessibility remodeling across the Kansas City metro, including safer bathrooms, tub-to-shower conversions, accessible entries, wider doorways, and accessible kitchens.',
    path: PATH,
  }),
  faqPageNode(FAQS)
);

const labelClass = 'font-mono text-xs uppercase tracking-[0.2em]';

export default function AgingInPlacePage() {
  return (
    <>
      <JsonLd data={schema} />

      <PageHero
        eyebrow="Accessibility · Kansas City Metro"
        title="Aging-in-Place & Accessibility Remodeling in Kansas City"
        subtitle="Stay in the Home You Love, Safely"
        body="Whether you are planning ahead for yourself, helping a parent, or making room for a walker or wheelchair, McLoud Construction makes the changes that let people keep living safely and comfortably in their own Kansas City homes."
        crumbs={[{ name: 'Accessibility', href: PATH }]}
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

      <section className="bg-blueprint text-paper">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className={`${labelClass} text-brass`}>Accessibility Services</h2>
          <div className="tick-rule mt-3 mb-10" />
          <div className="grid gap-10 md:grid-cols-2">
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
            <div className="border-l-2 border-brass pl-5">
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight">
                <Link href="/commercial/accessible-units" className="hover:text-brass">
                  Accessible Units for Property Managers
                </Link>
              </h3>
              <p className="mt-3 font-body leading-relaxed text-paper/80">
                Roll-in showers, wider doorways, and accessible kitchens for apartment and rental units, built in
                occupied buildings to the specifications you provide.
              </p>
            </div>
          </div>
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

      <section className="mx-auto max-w-3xl px-6 py-16" id="faq">
        <h2 className={`${labelClass} text-rust`}>Accessibility &amp; Aging-in-Place Questions</h2>
        <div className="tick-rule mt-3 mb-8" />
        <FaqList items={FAQS} />
      </section>

      <CtaBanner
        heading="Let's Talk About Staying Home"
        body="Tell us about the home and who lives there. We will follow up to schedule a free estimate."
        href={ESTIMATE_HREF}
      />
    </>
  );
}
