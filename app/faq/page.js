import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';

const DESCRIPTION =
  'Answers to common questions about McLoud Construction’s service area, estimates, financing, timelines, scope changes, and permits for Kansas City remodeling and commercial projects.';

export const metadata = {
  title: 'Remodeling & Commercial Construction FAQ | McLoud Construction Kansas City',
  description: DESCRIPTION,
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'Remodeling & Commercial Construction FAQ | McLoud Construction Kansas City',
    description: DESCRIPTION,
    url: '/faq',
  },
};

const FAQS = [
  {
    q: 'What areas do you serve?',
    a: 'We serve the greater Kansas City metro, including communities on both the Missouri and Kansas sides.',
  },
  {
    q: 'How much will my project cost?',
    a: "Every project is different, so we don't quote prices without seeing the space. The estimate is free and carries no obligation: we visit, listen to your goals, and follow up with a detailed estimate and scope of work before anything moves forward. Homeowners can also look at financing options before they decide.",
  },
  {
    q: 'Do you offer financing?',
    a: "Yes, for residential projects. We work with Acorn Finance, which lets you check your rate in about 60 seconds with a soft credit check that doesn't affect your credit score. McLoud Construction is not a lender, and terms and approval are set by the lender. Details are on our financing page.",
    link: { href: '/financing', label: 'See financing options' },
  },
  {
    q: 'How long does a typical project take?',
    a: "It depends entirely on scope. A bathroom remodel and a whole-home renovation are very different timelines. We'll walk through a realistic schedule with you during your in-home consultation, before any agreement is signed.",
  },
  {
    q: 'How does the estimate process work?',
    a: "It starts with a free estimate request, followed by an in-home consultation where we discuss your goals in detail. From there, we put together a full estimate and scope of work before anything moves forward.",
  },
  {
    q: 'What happens if the scope changes during a project?',
    a: 'If something changes, you hear it from us first, and change orders are written down so the scope and the cost stay clear for everyone.',
  },
  {
    q: 'Do you use subcontractors, and are they vetted?',
    a: 'Yes, on most projects we work with trusted subcontractors for specialty trades. Every subcontractor is vetted before they ever set foot on your property. That vetting process is something we take seriously, not a formality.',
  },
  {
    q: 'Will I have one point of contact throughout the project?',
    a: "Yes. You'll know who to call from your first consultation through the final walkthrough, with no getting bounced between departments.",
  },
  {
    q: 'Can I track my project online?',
    a: 'Yes. Clients get a portal login where they can see their estimate, contract, photos, and invoices, and message us directly.',
  },
  {
    q: 'Do you work on both residential and commercial projects?',
    a: 'Yes. Residential covers kitchen, bathroom, and whole-home remodeling. Commercial covers exterior repaints and repairs, renovations, and buildouts for multi-family, hotel, retail, office, recreational, church, and other property types.',
  },
  {
    q: 'Can you work in occupied buildings?',
    a: 'Yes. For apartment communities, hotels, retail centers, and other properties that stay open, we plan access, noise, and sequencing around residents, guests, and customers, and build the schedule around your leasing calendar or lease dates.',
  },
  {
    q: 'Do you handle permits?',
    a: "Permit requirements vary by project and municipality. We'll let you know what's needed for your specific scope during the estimate process.",
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero eyebrow="Common Questions" title="FAQ" />

      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="divide-y divide-ink/10 border-t border-ink/10">
          {FAQS.map(item => (
            <details key={item.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-bold uppercase tracking-tight">
                {item.q}
                <span className="shrink-0 font-mono text-lg text-brass transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-2xl font-body leading-relaxed text-ink/70">{item.a}</p>
              {item.link && (
                <Link
                  href={item.link.href}
                  className="mt-3 inline-block font-mono text-xs uppercase tracking-[0.15em] text-rust hover:underline"
                >
                  {item.link.label} →
                </Link>
              )}
            </details>
          ))}
        </div>
      </section>

      <CtaBanner body="Still have a question? Reach out and we'll get back to you." />
    </>
  );
}
