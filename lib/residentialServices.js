// One entry per residential service landing page (app/residential/[service]).
// To add or change a service, edit this file: the page, the sitemap, and the
// residential overview all read from it.

export const SITE_URL = 'https://mcloudconstruction.com';

export const RESIDENTIAL_SERVICES = [
  {
    slug: 'aging-in-place-bathroom-remodels',
    name: 'Aging-in-Place Bathroom Remodels',
    eyebrow: 'Aging-in-Place Bathroom Remodels · Kansas City',
    title: 'A Bathroom That Works for You Now and for Years to Come',
    metaTitle: 'Aging-in-Place Bathroom Remodels in Kansas City',
    metaDescription:
      'Aging in place bathroom remodel in Kansas City by McLoud Construction: curbless showers, grab bars, and a bathroom that still feels like home.',
    description:
      'Bathroom remodels across the Kansas City metro that make the space safer and easier to use as people get older, including curbless showers, grab bars, and comfort-height fixtures.',
    heroBody:
      'McLoud Construction designs aging-in-place bathroom remodels across the Kansas City metro, on both the Missouri and Kansas sides of the state line. The goal is a bathroom that helps you stay safely in the home you love, without looking like a hospital room.',
    intro:
      'We plan each project around how you actually move through the room: getting in and out of the shower, using the toilet, and reaching faucets and switches. The finished bathroom looks modern and well built. It just happens to be safer and easier to use.',
    audienceIntro: 'This work is a good fit if you are:',
    audience: [
      'An older homeowner who wants to keep living independently in your own house',
      'An adult child helping a parent plan ahead',
      'Anyone who wants to prepare for mobility changes before they become a daily problem',
    ],
    audienceNoteParts: [
      { type: 'text', value: 'If you mainly want to replace a bathtub with a walk-in shower, our ' },
      { type: 'link', href: '/residential/tub-to-shower-conversions', label: 'tub-to-shower conversions' },
      { type: 'text', value: ' may be the simpler starting point. If you need changes in more than one room—ramps, wider doorways, or an accessible kitchen—see our ' },
      { type: 'link', href: '/residential/accessibility-modifications', label: 'accessibility modifications' },
      { type: 'text', value: '.' },
    ],
    includedIntro:
      'Every home is different, so we walk the space with you and build a plan around what will help the most. An aging-in-place bathroom remodel from McLoud Construction can include:',
    included: [
      'Curbless, zero-threshold walk-in showers',
      'Grab bars, built-in shower benches, and handheld showerheads',
      'Comfort-height toilets',
      'Slip-resistant flooring',
      'Wider doorways and better lighting',
      'Lever-style faucets and door handles',
    ],
    includedNote: 'We can also connect this work to other updates in the home when they make sense together.',
    why: [
      'McLoud Construction is a demo and rebuild team. We are used to opening up a room, putting it back together the right way, and keeping the job site as tidy as possible while people are still living in the house.',
      'That background matters in a bathroom remodel. Aging-in-place work is not just about adding a few fixtures. It often means careful demolition, solid waterproofing, and a finished space that looks intentional—not clinical.',
    ],
    photos: [
      {
        label: 'Before',
        alt: 'Kansas City metro bathroom before an aging-in-place remodel by McLoud Construction, showing a standard tub and a tight layout',
      },
      {
        label: 'After',
        alt: 'Kansas City metro aging-in-place bathroom remodel by McLoud Construction with a curbless walk-in shower, grab bars, and a modern finish',
      },
    ],
    related: [
      {
        href: '/residential/accessibility-modifications',
        name: 'Accessibility Modifications',
        blurb: 'Ramps, wider doorways, accessible kitchens, and other changes that make the whole home easier to use',
      },
      {
        href: '/residential/tub-to-shower-conversions',
        name: 'Tub-to-Shower Conversions',
        blurb: 'A focused project if stepping over a tub wall is the main issue',
      },
    ],
    faqs: [
      {
        q: 'What is an aging-in-place bathroom remodel?',
        a: 'It is a bathroom update planned so the room stays safer and easier to use as you get older. Typical changes include a curbless or low-threshold shower, grab bars, a comfort-height toilet, better lighting, and flooring that is less slippery.',
      },
      {
        q: 'Will the bathroom still look like a regular, finished bathroom?',
        a: 'Yes. That is one of the main goals. McLoud Construction plans these rooms to look like a modern, high-end bathroom, not a clinical space.',
      },
      {
        q: 'Can you work in the house while we are living there?',
        a: 'Yes. We are used to working in occupied homes and aim to keep the work area contained and the rest of the house as livable as possible.',
      },
      {
        q: 'Do you only remodel the bathroom, or can you help with other accessibility changes?',
        a: 'We can start with the bathroom and, if you need it, plan related work such as accessibility modifications or a tub-to-shower conversion.',
        links: [
          { href: '/residential/accessibility-modifications', label: 'Accessibility modifications' },
          { href: '/residential/tub-to-shower-conversions', label: 'Tub-to-shower conversions' },
        ],
      },
      {
        q: 'Do you serve the Kansas City metro?',
        a: 'Yes. McLoud Construction offers aging-in-place bathroom remodels across the Kansas City metro, on both the Missouri and Kansas sides of the state line. If you are not sure whether your home is in our service area, request a free estimate and we will let you know.',
      },
      {
        q: 'How do I get started?',
        a: 'Request a free estimate. We will talk through how you use the bathroom now, what you want to change, and what a remodel could include.',
        links: [{ href: '/consultation?vertical=residential', label: 'Request a Free Estimate' }],
      },
    ],
    ctaHeading: "Let's Talk About Your Bathroom",
    ctaBody: 'Tell us how you use the space now and what you want to change. We will follow up to schedule a free estimate.',
    cardBlurb:
      'McLoud Construction remodels Kansas City metro bathrooms so they stay safer and easier to use as you get older—curbless showers, grab bars, and comfort-height fixtures that still look like a modern bathroom, not a hospital room.',
  },
  {
    slug: 'accessibility-modifications',
    name: 'Accessibility Modifications',
    eyebrow: 'Home Accessibility Modifications · Kansas City',
    title: 'Make Every Room Accessible',
    metaTitle: 'Home Accessibility Modifications in Kansas City',
    metaDescription:
      'Home accessibility modifications in Kansas City from McLoud Construction: ramps, wider doors, accessible kitchens, and bathrooms. Request a free estimate.',
    description:
      'Home accessibility modifications across the Kansas City metro, including wheelchair ramps, widened doorways, accessible kitchens, and accessible bathrooms.',
    heroBody:
      'McLoud Construction provides home accessibility modifications across the Kansas City metro, on both the Missouri and Kansas sides of the state line, for people who use a wheelchair or walker, families caring for someone with a disability, and property managers who need accessible units.',
    intro:
      'We focus on practical updates that make the biggest difference in day-to-day life: getting in the door, moving from room to room, and using the kitchen and bathroom with less strain.',
    audienceIntro: 'This work is a good fit if you are:',
    audience: [
      'A wheelchair or walker user who wants a home that works with you, not against you',
      'A veteran who needs better access at home',
      'A family member planning care for a parent, partner, or child',
      'A property manager updating units so more residents can use them comfortably',
    ],
    audienceNoteParts: [
      { type: 'text', value: 'If the bathroom is your main concern, you may also want our ' },
      { type: 'link', href: '/residential/aging-in-place-bathroom-remodels', label: 'aging-in-place bathroom remodels' },
      { type: 'text', value: ' or a ' },
      { type: 'link', href: '/residential/tub-to-shower-conversions', label: 'tub-to-shower conversion' },
      { type: 'text', value: '. Many clients use more than one of these services together.' },
    ],
    includedIntro:
      'McLoud Construction starts by walking the home or unit and identifying the changes that will help the most. Accessibility modifications can include:',
    included: [
      'Wheelchair ramps, permanent or modular',
      'Widened doorways and hallways',
      'Stair lifts and platform lifts, with a specialized install partner where the equipment calls for one',
      'Accessible kitchens with lowered counters and roll-under sinks',
      'Accessible bathrooms, including the updates described on our aging-in-place bathroom remodel page',
      'Accessible entries, thresholds, and flooring transitions',
    ],
    includedLinks: [
      { href: '/residential/aging-in-place-bathroom-remodels', label: 'Aging-in-place bathroom remodels' },
    ],
    why: [
      'McLoud Construction is a demo and rebuild team with experience working with property management companies, including on accessible units. We know how to plan changes that are useful in daily life and still look like they belong in the home.',
      'We are also used to working cleanly in occupied houses and units, which matters when someone is already living in the space and needs it to stay as usable as possible during the work.',
    ],
    photos: [
      {
        label: 'Before',
        alt: 'Kansas City metro home entry before accessibility modifications by McLoud Construction, showing a stepped entrance and a narrow doorway',
      },
      {
        label: 'After',
        alt: 'Kansas City metro home with an accessibility ramp and widened entry by McLoud Construction, showing a smoother threshold and a clearer path inside',
      },
    ],
    related: [
      {
        href: '/residential/aging-in-place-bathroom-remodels',
        name: 'Aging-in-Place Bathroom Remodels',
        blurb: 'A safer, easier bathroom that still looks like a finished, modern space',
      },
      {
        href: '/residential/tub-to-shower-conversions',
        name: 'Tub-to-Shower Conversions',
        blurb: 'Replace a hard-to-use tub with a walk-in shower',
      },
    ],
    faqs: [
      {
        q: 'What are home accessibility modifications?',
        a: 'They are changes that make a house or unit easier to enter and use for people with disabilities or limited mobility. That can include ramps, wider doorways, smoother thresholds, accessible kitchens, and accessible bathrooms.',
      },
      {
        q: 'Can you work on a rental unit or a property we manage?',
        a: 'Yes. McLoud Construction has experience working with property management companies on accessible units, and we can plan updates that serve residents while fitting the building.',
      },
      {
        q: 'Do you also remodel bathrooms as part of this work?',
        a: 'Yes. Accessible bathrooms are often part of a larger accessibility plan. You can also start with a dedicated aging-in-place bathroom remodel or a tub-to-shower conversion.',
        links: [
          { href: '/residential/aging-in-place-bathroom-remodels', label: 'Aging-in-place bathroom remodels' },
          { href: '/residential/tub-to-shower-conversions', label: 'Tub-to-shower conversions' },
        ],
      },
      {
        q: 'Can I stay in my home while the work is going on?',
        a: 'In many cases, yes. We are used to working in occupied homes and aim to keep the job site contained. During a free estimate, we can talk through how the work would be staged in your space.',
      },
      {
        q: 'Do you serve the Kansas City metro?',
        a: 'Yes. McLoud Construction offers home accessibility modifications across the Kansas City metro, on both the Missouri and Kansas sides of the state line. If you are not sure whether your property is in our service area, request a free estimate and we will let you know.',
      },
      {
        q: 'How do I request a free estimate?',
        a: 'Request a free estimate and tell us how you use the home now and what is getting in the way. We will review the space and recommend practical next steps.',
        links: [{ href: '/consultation?vertical=residential', label: 'Request a Free Estimate' }],
      },
    ],
    ctaHeading: 'Ready to Make Every Room More Accessible?',
    ctaBody: 'Tell us how you use the home now and what is getting in the way. We will follow up to schedule a free estimate.',
    cardBlurb:
      'From ramps and wider doorways to accessible kitchens and bathrooms, McLoud Construction makes practical accessibility modifications that help Kansas City metro homes and rental units work better in daily life.',
  },
  {
    slug: 'basement-finishing',
    name: 'Basement Finishing',
    eyebrow: 'Basement Finishing · Kansas City',
    title: 'Unlock the Space You Already Own',
    metaTitle: 'Basement Finishing in Kansas City',
    metaDescription:
      'Basement finishing in Kansas City by McLoud Construction: framing, flooring, bedrooms, and baths, with a moisture check first. Request a free estimate.',
    description:
      'Basement finishing across the Kansas City metro, including framing, insulation, drywall, below-grade flooring, and livable rooms after a moisture check.',
    heroBody:
      'McLoud Construction offers basement finishing across the Kansas City metro, on both the Missouri and Kansas sides of the state line, for homeowners who want more living space without moving or adding on, and for investors adding bedrooms or rental space.',
    intro:
      'A finished basement can become a family room, home office, gym, guest bedroom, bathroom, or wet bar—usable square footage in the home you already own, and a more practical path than building a full addition.',
    audienceIntro: 'This work is a good fit if you are:',
    audience: [
      'A Kansas City metro homeowner who wants more living space without moving or building an addition',
      'A family that needs a guest room, office, playroom, or a place to gather',
      'An investor adding bedrooms or more usable rental space',
    ],
    audienceNoteParts: [
      { type: 'text', value: 'If you are comparing this with other McLoud Construction residential work, start on our ' },
      { type: 'link', href: '/residential', label: 'Residential' },
      { type: 'text', value: ' page.' },
    ],
    includedIntro:
      'McLoud Construction can take an unfinished basement through to a finished, livable space. A basement finishing project can include:',
    included: [
      'Framing, insulation, and drywall',
      'Flooring designed for below-grade spaces',
      'Electrical, lighting, and HVAC extensions, with trusted trade partners',
      'Bedrooms with code-compliant egress windows, plus bathrooms, wet bars, home offices, gyms, and family rooms',
      'A moisture check before work starts',
    ],
    includedNote:
      'Because basements are below grade, we do not skip the first step: checking for water problems so the finished space has a better chance of staying dry.',
    why: [
      'McLoud Construction is a demo and rebuild team with a restoration background. That is why we check for moisture before finishing work begins. A beautiful room is only a good investment if it stays dry.',
      'You also get one team that can carry the project from demolition through finished trim, instead of coordinating every trade on your own. We are used to working in occupied homes and keeping the rest of the house as livable as possible while the basement is underway.',
    ],
    photos: [
      {
        label: 'Before',
        alt: 'Unfinished Kansas City metro basement before finishing by McLoud Construction, showing exposed framing or concrete walls and an open floor',
      },
      {
        label: 'After',
        alt: 'Finished Kansas City metro basement by McLoud Construction with flooring, lighting, and a livable family room or bedroom layout',
      },
    ],
    related: [
      {
        href: '/residential',
        name: 'Residential Remodeling',
        blurb: 'See all McLoud Construction residential services',
      },
    ],
    faqs: [
      {
        q: 'What is included in basement finishing?',
        a: 'A typical project can include framing, insulation, drywall, flooring made for below-grade spaces, lighting, and the rooms you want—such as a family room, office, gym, bedroom, bathroom, or wet bar. Electrical, lighting, and HVAC extensions are handled with trusted trade partners.',
      },
      {
        q: 'Do you check for water problems first?',
        a: 'Yes. McLoud Construction checks for moisture before finishing work starts. Our restoration background is one reason we treat this as a first step, not an afterthought.',
      },
      {
        q: 'Can you add a bedroom or bathroom in the basement?',
        a: 'Yes. Bedrooms can be included when they have code-compliant egress windows. Bathrooms and wet bars can also be part of the plan when the space and plumbing allow it.',
      },
      {
        q: 'Is finishing a basement a good alternative to building an addition?',
        a: 'For many Kansas City metro homeowners, yes. You add usable square footage and home value in space you already own, often without the scale of a full addition. During a free estimate, we can talk through what your basement can reasonably support.',
      },
      {
        q: 'Do you serve the Kansas City metro?',
        a: 'Yes. McLoud Construction offers basement finishing across the Kansas City metro, on both the Missouri and Kansas sides of the state line. If you are not sure whether your home is in our service area, request a free estimate and we will let you know.',
      },
      {
        q: 'How do I get a free estimate?',
        a: 'Request a free estimate. We will look at the existing space, check for moisture concerns, and talk through how you want to use the room.',
        links: [{ href: '/consultation?vertical=residential', label: 'Request a Free Estimate' }],
      },
    ],
    ctaHeading: 'Ready to Unlock the Space You Already Own?',
    ctaBody: 'Tell us how you want to use the basement. We will follow up to schedule a free estimate.',
    cardBlurb:
      'McLoud Construction turns unfinished Kansas City metro basements into livable rooms. We check for moisture first, then handle the finish work so you can add space without moving or building an addition.',
  },
  {
    slug: 'tub-to-shower-conversions',
    name: 'Tub-to-Shower Conversions',
    eyebrow: 'Tub-to-Shower Conversions · Kansas City',
    title: "Swap the Tub for a Shower You'll Actually Use",
    metaTitle: 'Tub-to-Shower Conversion in Kansas City',
    metaDescription:
      'A tub-to-shower conversion in Kansas City from McLoud Construction: low-threshold or curbless options, new walls, and fixtures. Request a free estimate.',
    description:
      'Tub-to-shower conversions across the Kansas City metro, including tub removal, a new shower pan or tiled base, low-threshold or curbless options, and new fixtures.',
    heroBody:
      'McLoud Construction offers tub-to-shower conversions across the Kansas City metro, on both the Missouri and Kansas sides of the state line, for homeowners who never use their tub, older adults who struggle to step over a tub wall, and landlords who want a lower-maintenance bath.',
    intro:
      'This is a clear, focused project: we take out the old tub and build a shower you will actually use. A walk-in shower can be safer, easier to clean, and much more useful than a bathtub that is mostly in the way.',
    audienceIntro: 'This work is a good fit if you are:',
    audience: [
      'A homeowner with a bathtub no one really uses',
      'An older adult, or a family member of one, who finds it hard or unsafe to step over a tub wall',
      'A landlord who wants a bathroom that is easier to keep clean and easier for tenants to use',
    ],
    audienceNoteParts: [
      { type: 'text', value: 'If you want a more complete bathroom update for long-term living, see our ' },
      { type: 'link', href: '/residential/aging-in-place-bathroom-remodels', label: 'aging-in-place bathroom remodels' },
      { type: 'text', value: '. If you also need ramps, wider doorways, or other access changes, see our ' },
      { type: 'link', href: '/residential/accessibility-modifications', label: 'accessibility modifications' },
      { type: 'text', value: '.' },
    ],
    includedIntro: 'A tub-to-shower conversion from McLoud Construction can include:',
    included: [
      'Removing and hauling away the old tub',
      'Repairing the plumbing and subfloor as needed',
      'A new shower pan or tiled base, with low-threshold and curbless options',
      'Tile or panel walls, a glass door or curtain, and new fixtures',
      'Optional grab bars, a built-in bench, and storage niches',
    ],
    includedNote:
      'We will walk through the existing bath with you and help you choose a layout that fits the space and how you want to use it.',
    why: [
      'McLoud Construction is a demo and rebuild team. Taking out a tub is not only a fixture swap. It can involve careful demolition, subfloor and plumbing repairs, and a watertight shower that is finished well enough to live with every day.',
      'We are used to working cleanly in occupied homes, which matters when the bathroom is one of the rooms you still need. For property managers and landlords, we also understand the value of a straightforward, well-defined bathroom update.',
    ],
    photos: [
      {
        label: 'Before',
        alt: 'Kansas City metro bathroom before a tub-to-shower conversion by McLoud Construction, showing a built-in bathtub that is hard to step over',
      },
      {
        label: 'After',
        alt: 'Kansas City metro tub-to-shower conversion by McLoud Construction with a low-threshold walk-in shower, new wall finish, and updated fixtures',
      },
    ],
    related: [
      {
        href: '/residential/aging-in-place-bathroom-remodels',
        name: 'Aging-in-Place Bathroom Remodels',
        blurb: 'A fuller bathroom plan for comfort and safety over the long term',
      },
      {
        href: '/residential/accessibility-modifications',
        name: 'Accessibility Modifications',
        blurb: 'Ramps, wider doorways, and other changes beyond the bathroom',
      },
    ],
    faqs: [
      {
        q: 'What is a tub-to-shower conversion?',
        a: 'It is a project that removes an existing bathtub and replaces it with a walk-in shower. McLoud Construction can build a low-threshold or curbless base, finish the walls with tile or panels, and add new fixtures. Grab bars, a bench, and niches are optional.',
      },
      {
        q: 'Is a walk-in shower safer than a bathtub?',
        a: 'For many people, yes, especially if stepping over a tub wall has become difficult. A lower or curbless entry, optional grab bars, and a bench can make daily bathing easier. The right setup depends on how you use the room, which we can talk through during a free estimate.',
      },
      {
        q: 'Can I add grab bars or a bench at the same time?',
        a: 'Yes. Those options are a natural fit with a tub-to-shower conversion, and they also appear in our aging-in-place bathroom remodels.',
        links: [{ href: '/residential/aging-in-place-bathroom-remodels', label: 'Aging-in-place bathroom remodels' }],
      },
      {
        q: 'Will you repair the floor or plumbing if something is worn out under the tub?',
        a: 'Yes, as needed. After the tub comes out, we can repair the plumbing and subfloor before the new shower goes in.',
      },
      {
        q: 'Do you serve the Kansas City metro?',
        a: 'Yes. McLoud Construction offers tub-to-shower conversions across the Kansas City metro, on both the Missouri and Kansas sides of the state line. If you are not sure whether your home is in our service area, request a free estimate and we will let you know.',
      },
      {
        q: 'How do I get a free estimate?',
        a: 'Request a free estimate. Tell us what you do not like about the current tub and what you want from the new shower, and we will walk through the options.',
        links: [{ href: '/consultation?vertical=residential', label: 'Request a Free Estimate' }],
      },
    ],
    ctaHeading: "Ready for a Shower You'll Actually Use?",
    ctaBody: 'Tell us about the current tub and what you want from the new shower. We will follow up to schedule a free estimate.',
    cardBlurb:
      'McLoud Construction removes the old bathtub and builds a walk-in shower that is easier to use and easier to clean, with low-threshold and curbless options, new walls, and new fixtures.',
  },
];

export const RESIDENTIAL_SERVICE_BY_SLUG = Object.fromEntries(
  RESIDENTIAL_SERVICES.map(service => [service.slug, service])
);
