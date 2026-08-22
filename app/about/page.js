import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Locally Owned & Operated"
        title="About McLoud"
        body="Founded by Stachys and Isabelle McLoud, we're a family-owned general contracting company built on a simple idea: do quality work, and never make a client guess what's happening."
      />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-rust">What We Believe</div>
            <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight">
              Quality Work, Honest Communication
            </h2>
            <p className="mt-4 font-body leading-relaxed text-ink/75">
              Those aren&rsquo;t just words on a page. Every subcontractor we bring onto a job is
              vetted before they ever set foot on your property, and every client, residential or
              commercial, gets a clear point of contact from the first estimate through the final
              walkthrough. If something changes, you hear it from us first.
            </p>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-rust">Where We Work</div>
            <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight">
              Kansas City, Missouri &amp; Kansas
            </h2>
            <p className="mt-4 font-body leading-relaxed text-ink/75">
              We&rsquo;re local, not a franchise, which means the people who show up to your
              consultation are the same people who&rsquo;ll answer the phone six weeks into your
              project. We serve homeowners and commercial property owners across both sides of the
              metro.
            </p>
          </div>
        </div>

        <div className="tick-rule my-16" />

        <div className="rounded-none border border-ink/10 bg-paper p-10 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-concrete">Unofficial Team Member</div>
          <h3 className="mt-3 font-display text-2xl font-extrabold uppercase tracking-tight">Meet Magic</h3>
          <p className="mx-auto mt-3 max-w-xl font-body leading-relaxed text-ink/70">
            Our unofficial four-legged foreman. No formal training in reading blueprints, but
            genuinely excellent at greeting clients and making a job site feel a little less
            corporate.
          </p>
        </div>
      </section>

      <CtaBanner body="Ready to talk through your project? We'd love to hear about it." />
    </>
  );
}
