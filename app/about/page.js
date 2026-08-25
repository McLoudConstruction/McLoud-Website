import Image from 'next/image';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';

export const metadata = {
  title: 'About McLoud Construction | Kansas City, MO & KS',
  description:
    'Locally owned and operated by Stachys and Isabelle McLoud, serving the Kansas City metro with honest communication and hands-on craftsmanship.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About McLoud Construction | Kansas City, MO & KS',
    description:
      'Locally owned and operated by Stachys and Isabelle McLoud, serving the Kansas City metro with honest communication and hands-on craftsmanship.',
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Locally Owned & Operated" title="About McLoud Construction" />

      {/* Owners intro, photo paired with copy */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="border border-ink/10 p-2">
            <Image
              src="/stachys-isabelle.jpg"
              alt="Stachys and Isabelle McLoud"
              width={900}
              height={1080}
              className="h-auto w-full object-cover"
            />
            <div className="pt-3 pb-1 text-center font-mono text-[0.65rem] uppercase tracking-[0.15em] text-concrete">
              Stachys &amp; Isabelle McLoud, Owners
            </div>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-rust">Family Owned</div>
            <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
              Built by People You&rsquo;ll Actually Meet
            </h2>
            <p className="mt-4 font-body leading-relaxed text-ink/75">
              McLoud Construction was founded by Stachys and Isabelle McLoud on a simple idea: do
              quality work, and never make a client guess what&rsquo;s happening. We&rsquo;re local,
              not a franchise, so the people who show up to your consultation are the same people
              who&rsquo;ll answer the phone six weeks into your project.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
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
              We serve homeowners and commercial property owners across both sides of the metro,
              with the same crew and the same standards on every job, regardless of zip code.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Magic, now with the real photo instead of text alone */}
      <section className="border-t border-ink/10 bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1.3fr]">
            <div className="border border-ink/10 p-2">
              <Image
                src="/stachys-magic.jpg"
                alt="Stachys with Magic"
                width={450}
                height={599}
                className="h-auto w-full object-cover"
              />
              <div className="pt-3 pb-1 text-center font-mono text-[0.65rem] uppercase tracking-[0.15em] text-concrete">
                Magic, Unofficial Foreman
              </div>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-rust">Unofficial Team Member</div>
              <h3 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight">Meet Magic</h3>
              <p className="mt-4 max-w-xl font-body leading-relaxed text-ink/75">
                No formal training in reading blueprints, but genuinely excellent at greeting
                clients and making a job site feel a little less corporate. If you see him on a
                consultation, that&rsquo;s him doing his job.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner body="Ready to talk through your project? We'd love to hear about it." />
    </>
  );
}
