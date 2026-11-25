import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import FaqList from '@/components/FaqList';
import { pageMetadata } from '@/lib/seo';
import { faqPageNode, graph, JsonLd } from '@/lib/schema';

const DESCRIPTION =
  'Kansas City remodeling FAQ: where McLoud Construction works, who it works for, how free estimates work, insurance and subcontractors, and staying informed.';

export const metadata = pageMetadata({
  title: 'Kansas City Remodeling FAQ',
  description: DESCRIPTION,
  path: '/faq',
});

// Five general questions. Everything specific to homeowners, accessibility,
// or property managers lives on that audience's pages, with its own FAQ
// structured data, and is linked below instead of repeated.
const FAQS = [
  {
    q: "What areas does McLoud Construction serve?",
    a: "The greater Kansas City metro on both sides of the state line, including Kansas City, Lee's Summit, Independence, Blue Springs, Liberty, and Raymore in Missouri, and Overland Park, Olathe, Lenexa, Shawnee, Leawood, and Kansas City, Kansas. If you do not see your community, ask.",
  },
  {
    q: "Who does McLoud Construction work for?",
    a: "Homeowners planning kitchen, bathroom, basement, and whole-home remodels; homeowners and families planning aging-in-place and accessibility changes; and property managers who need unit renovations, interior remodels, accessible units, and exterior repairs.",
    links: [
      { href: "/residential", label: "Homeowners" },
      { href: "/residential/aging-in-place", label: "Accessibility" },
      { href: "/commercial", label: "Property managers" },
    ],
  },
  {
    q: "How do estimates work, and what affects the cost?",
    a: "You request a free estimate online, we visit to see the space and hear your goals, and then we send a written estimate and scope of work, with no obligation. Cost depends on the size of the space, whether plumbing, electrical, or walls move, what is found behind walls and under floors, and the materials you choose, so we do not quote prices without seeing the space.",
    links: [{ href: "/consultation", label: "Request a free estimate" }],
  },
  {
    q: "Is McLoud Construction insured, and who does the work?",
    a: "Yes. McLoud Construction is insured and can provide a certificate of insurance on request. We work with trusted subcontractors for specialty trades, and every one is vetted before they set foot on your property.",
  },
  {
    q: "How will I know what is happening during my project?",
    a: "You have one point of contact from the first visit through the final walkthrough, and a client portal where you can see your estimate, contract, photos, and invoices and message us directly. If the scope changes, you hear it from us first, and change orders are written down.",
  },
];

const faqSchema = graph(faqPageNode(FAQS));

const AUDIENCE_FAQ_LINKS = [
  {
    label: 'Homeowners',
    links: [
      { href: '/residential#faq', label: 'Home remodeling questions' },
      { href: '/residential/kitchen-remodeling#faq', label: 'Kitchen remodeling' },
      { href: '/residential/bathroom-remodeling#faq', label: 'Bathroom remodeling' },
      { href: '/residential/basement-finishing#faq', label: 'Basement finishing' },
      { href: '/financing', label: 'Financing' },
    ],
  },
  {
    label: 'Accessibility',
    links: [
      { href: '/residential/aging-in-place#faq', label: 'Aging-in-place planning' },
      { href: '/residential/aging-in-place-bathroom-remodels#faq', label: 'Aging-in-place bathrooms' },
      { href: '/residential/tub-to-shower-conversions#faq', label: 'Tub-to-shower conversions' },
      { href: '/residential/accessibility-modifications#faq', label: 'Accessibility modifications' },
    ],
  },
  {
    label: 'Property Managers',
    links: [
      { href: '/commercial#faq', label: 'Property manager questions' },
      { href: '/commercial/unit-renovations', label: 'Unit renovations & turns' },
      { href: '/commercial/interior-remodels', label: 'Commercial interior remodels' },
      { href: '/commercial/accessible-units#faq', label: 'Accessible units' },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <PageHero
        eyebrow="Common Questions"
        title="Kansas City Remodeling FAQ"
        body="General questions about working with McLoud Construction. Questions about a specific project are answered on the pages for homeowners, accessibility, and property managers."
        crumbs={[{ name: 'FAQ', href: '/faq' }]}
      />

      <section className="mx-auto max-w-3xl px-6 py-20">
        <FaqList items={FAQS} />
        <h2 className="mt-16 font-mono text-xs uppercase tracking-[0.2em] text-rust">Questions About Your Project</h2>
        <div className="tick-rule mt-3 mb-6" />
        <div className="grid gap-8 sm:grid-cols-3">
          {AUDIENCE_FAQ_LINKS.map(group => (
            <div key={group.label}>
              <h3 className="font-display text-lg font-bold uppercase tracking-tight">{group.label}</h3>
              <ul className="mt-3 space-y-2 font-body text-sm text-ink/75">
                {group.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-rust underline hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner body="Still have a question? Reach out and we'll get back to you." />
    </>
  );
}
