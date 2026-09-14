import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';

const ACORN_APPLY_URL = 'https://www.acornfinance.com/pre-qualify/?d=D8WDE&utm_medium=user_pre_qual_link';

export const metadata = {
  title: 'Project Financing | McLoud Construction Kansas City',
  description:
    'Check your rate for remodel financing in minutes with no impact to your credit score, through a network of vetted lenders arranged by Acorn Finance.',
  alternates: { canonical: '/financing' },
  openGraph: {
    title: 'Project Financing | McLoud Construction Kansas City',
    description:
      'Check your rate for remodel financing in minutes with no impact to your credit score, through a network of vetted lenders arranged by Acorn Finance.',
    url: '/financing',
  },
};

const BENEFITS = [
  {
    title: 'Check Your Rate, No Credit Impact',
    body: "See personalized offers with a soft credit check that won't affect your credit score.",
  },
  {
    title: 'Multiple Lenders, One Application',
    body: 'Compare offers from a network of vetted lenders instead of applying to each one separately.',
  },
  {
    title: 'Fast Decisions',
    body: 'Get pre-qualified in minutes, with funding available quickly once you accept an offer.',
  },
  {
    title: 'No Cost to Apply',
    body: 'Checking your rate and comparing offers costs nothing and carries no obligation.',
  },
];

const STEPS = ['Check your rate with basic info', 'Compare personalized offers', 'Accept an offer and get funded'];

export default function FinancingPage() {
  return (
    <>
      <PageHero
        eyebrow="Make It Affordable"
        title="Project Financing"
        body="Spread the cost of your remodel over time with financing options from a network of vetted lenders, arranged through Acorn Finance."
      />

      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <a
          href={ACORN_APPLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brass px-10 py-5 font-mono text-sm uppercase tracking-[0.15em] text-ink transition-opacity hover:opacity-90"
        >
          Check Your Rate
        </a>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-ink/50">
          Takes about 60 seconds · No impact to your credit score
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 sm:grid-cols-2">
          {BENEFITS.map((benefit, i) => (
            <div key={benefit.title} className="border-t border-ink/10 pt-6">
              <span className="font-mono text-sm text-brass">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-tight">{benefit.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">{benefit.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blueprint text-paper">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">How It Works</div>
          <h2 className="mt-3 font-display text-2xl font-extrabold uppercase tracking-tight md:text-3xl">
            Three Steps to Get Funded
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step}>
                <div className="font-mono text-2xl font-bold text-brass">{String(i + 1).padStart(2, '0')}</div>
                <div className="tick-rule my-3" />
                <div className="font-display text-sm font-bold uppercase leading-tight tracking-tight">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12 text-center">
        <p className="font-body text-xs leading-relaxed text-ink/50">
          McLoud Construction is not a lender and does not make credit decisions. Financing options are offered
          through Acorn Finance&rsquo;s network of third-party lenders. Checking your rate uses a soft credit
          inquiry and will not affect your credit score; a hard inquiry may occur later if you accept a loan
          offer. Terms, rates, and approval are determined by the lender and are subject to credit review.
        </p>
      </section>

      <CtaBanner body="Have questions about your project before you apply? Reach out and we'll walk through it with you." />
    </>
  );
}
