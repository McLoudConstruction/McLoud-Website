import Link from 'next/link';

export default function FinancingBanner() {
  return (
    <section className="border-y border-ink/10 bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-center sm:flex-row sm:text-left">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Financing Available</div>
          <p className="mt-1 font-body text-sm text-ink/70">
            Check your rate in about 60 seconds, with no impact to your credit score.
          </p>
        </div>
        <Link
          href="/financing"
          className="shrink-0 border border-brass px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-brass transition-colors hover:bg-brass hover:text-ink"
        >
          See Financing Options
        </Link>
      </div>
    </section>
  );
}
