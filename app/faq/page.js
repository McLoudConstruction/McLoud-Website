import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';

export const metadata = {
  title: 'Remodeling FAQ | McLoud Construction Kansas City',
  description:
    'Answers to common questions about McLoud Construction\u2019s service area, process, timelines, and licensing for Kansas City remodeling and buildout projects.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'Remodeling FAQ | McLoud Construction Kansas City',
    description:
      'Answers to common questions about McLoud Construction\u2019s service area, process, timelines, and licensing for Kansas City remodeling and buildout projects.',
    url: '/faq',
  },
};

const FAQS = [
  {
    q: 'What areas do you serve?',
    a: 'We serve the greater Kansas City metro, including communities on both the Missouri and Kansas sides.',
  },
  {
    q: 'Do you use subcontractors, and are they vetted?',
    a: 'Yes, on most projects we work with trusted subcontractors for specialty trades. Every subcontractor is vetted before they ever set foot on your property. That vetting process is something we take seriously, not a formality.',
  },
  {
    q: 'How long does a typical project take?',
    a: "It depends entirely on scope. A bathroom remodel and a whole-home renovation are very different timelines. We'll walk through a realistic schedule with you during your in-home consultation, before any agreement is signed.",
  },
  {
    q: 'Do you work on both residential and commercial projects?',
    a: 'Yes. Residential covers kitchen, bathroom, and whole-home remodeling. Commercial covers renovations and buildouts for multi-family, retail, office, hospitality, and other property types.',
  },
  {
    q: 'How does the estimate process work?',
    a: "It starts with a free estimate request, followed by an in-home consultation where we discuss your goals in detail. From there, we put together a full estimate and scope of work before anything moves forward.",
  },
  {
    q: 'Will I have one point of contact throughout the project?',
    a: "Yes. You'll know who to call from your first consultation through the final walkthrough, with no getting bounced between departments.",
  },
  {
    q: 'Do you handle permits?',
    a: "Permit requirements vary by project and municipality. We'll let you know what's needed for your specific scope during the estimate process.",
  },
];

export default function FaqPage() {
  return (
    <>
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
            </details>
          ))}
        </div>
      </section>

      <CtaBanner body="Still have a question? Reach out and we'll get back to you." />
    </>
  );
}
