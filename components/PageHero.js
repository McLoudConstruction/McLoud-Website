import Breadcrumbs from '@/components/Breadcrumbs';

// `title` is the page's H1 (the keyword it should rank for). `subtitle` is an
// optional brand-voice line shown under it, not a heading.
export default function PageHero({ eyebrow, title, subtitle, body, crumbs }) {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        {crumbs?.length > 0 && <Breadcrumbs crumbs={crumbs} className="mb-8" />}
        {eyebrow && <div className="field-stamp text-brass">{eyebrow}</div>}
        <h1 className="mt-6 font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-brass md:text-3xl">
            {subtitle}
          </p>
        )}
        {body && <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-paper/80">{body}</p>}
      </div>
    </section>
  );
}
