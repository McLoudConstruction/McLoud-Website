export default function PageHero({ eyebrow, title, body }) {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <div className="field-stamp text-brass">{eyebrow}</div>
        <h1 className="mt-6 font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-7xl">
          {title}
        </h1>
        {body && <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-paper/80">{body}</p>}
      </div>
    </section>
  );
}
