// BRAND RULE: "Built Right. Told Straight."
//
// 1. The two parts are ALWAYS on separate lines (or the whole tagline sits on
//    its own line with a break between the parts). Never run it inline after
//    other text.
// 2. Colors come from the palette in tailwind.config.js:
//      On dark backgrounds:  "Built Right." paper #EDE7DA (white),  "Told Straight." brass #9B773D (tan)
//      On light backgrounds: "Built Right." brass #9B773D (tan),    "Told Straight." ink #1C1B19 (black)
//
// Use this component anywhere the tagline appears on the page. The animated
// version in the homepage hero (components/HomeHero.js) uses TAGLINE_COLORS to
// follow the same rule. Plain-text copies that cannot carry a line break or
// color (structured data, image alt text, llms.txt) keep the words only.
export const TAGLINE_COLORS = {
  dark: { first: 'text-paper', second: 'text-brass' },
  light: { first: 'text-brass', second: 'text-ink' },
};

export default function Tagline({ tone = 'dark', as: Tag = 'p', className = '' }) {
  const colors = TAGLINE_COLORS[tone] || TAGLINE_COLORS.dark;
  return (
    <Tag className={className}>
      <span className={`block ${colors.first}`}>Built Right.</span>
      <span className={`block ${colors.second}`}>Told Straight.</span>
    </Tag>
  );
}
