// One entry per residential service landing page (app/residential/[service]).
// `h1` is the keyword heading the page should rank for; `title` is the
// brand-voice line shown under it.
// To add or change a service, edit this file: the page, the sitemap, and the
// residential overview all read from it.

export const SITE_URL = 'https://mcloudconstruction.com';

export const RESIDENTIAL_SERVICES = [
  {
    slug: 'aging-in-place-bathroom-remodels',
    group: 'accessibility',
    h1: 'Aging-in-Place Bathroom Remodels in Kansas City',
    name: 'Aging-in-Place Bathroom Remodels',
    eyebrow: 'Accessibility · Kansas City Metro',
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
      'McLoud Construction does full remodels, not just fixture swaps. We are used to opening up a room, finishing it the right way, and keeping the job site as tidy as possible while people are still living in the house.',
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
      {
        href: '/residential/bathroom-remodeling',
        name: 'Bathroom Remodeling',
        blurb: 'A full bathroom remodel when safety is not the main reason for the project',
      },
    ],
    faqs: [
      {
        q: "What is an aging-in-place bathroom remodel?",
        a: "It is a bathroom remodel planned so the room stays safe and easy to use as you get older. Common changes include a curbless or low-threshold shower, grab bars with solid blocking behind them, a shower bench and handheld showerhead, a comfort-height toilet, slip-resistant flooring, lever handles, and brighter lighting.",
      },
      {
        q: "What is a curbless shower, and can one go in an existing bathroom?",
        a: "A curbless shower has no step or curb at the entry. The bathroom floor slopes gently to a drain, often a linear drain, so you can walk or roll straight in. In an existing home, that usually means recessing or reworking part of the floor, and whether it works depends on the framing or slab under the bathroom. We check that on site. When a fully curbless entry is not practical, a low-threshold shower base is the usual alternative.",
      },
      {
        q: "Where should grab bars go, and can they be added later?",
        a: "Grab bars are most useful beside the toilet, at the shower entry, and inside the shower where you stand up or sit down. They need to be anchored into solid wood blocking or framing, not drywall alone. During a remodel we can add blocking in the walls so bars can be installed now or later in the right spots.",
      },
      {
        q: "What is a comfort-height toilet?",
        a: "A comfort-height toilet has a seat roughly 17 to 19 inches above the floor, a few inches taller than many standard toilets. The extra height makes sitting down and standing up easier on the knees and hips.",
      },
      {
        q: "Will the bathroom look clinical?",
        a: "It should not. The goal is a bathroom that looks like a modern, well-finished room. Grab bars, benches, and fixtures are chosen to match the finishes, and features like a curbless shower are popular in high-end bathrooms anyway.",
      },
      {
        q: "What if this is the only bathroom in the house?",
        a: "Tell us early. We plan the order of work around it and talk through options before anything starts, so you know which days the bathroom will be out of service and what the plan is for those days.",
      },
    ],
    ctaHeading: "Let's Talk About Your Bathroom",
    ctaBody: 'Tell us how you use the space now and what you want to change. We will follow up to schedule a free estimate.',
    cardBlurb:
      'McLoud Construction remodels Kansas City metro bathrooms so they stay safer and easier to use as you get older—curbless showers, grab bars, and comfort-height fixtures that still look like a modern bathroom, not a hospital room.',
  },
  {
    slug: 'accessibility-modifications',
    group: 'accessibility',
    h1: 'Home Accessibility Modifications in Kansas City',
    name: 'Accessibility Modifications',
    eyebrow: 'Accessibility · Kansas City Metro',
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
      'Stachys McLoud founded McLoud Construction after years in the restoration industry managing large projects for Kansas City property management companies, including accessible units. We know how to plan changes that are useful in daily life and still look like they belong in the home.',
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
        q: "What are home accessibility modifications?",
        a: "They are changes that make a home easier to enter and use for someone with a disability or limited mobility, such as ramps, wider doorways, smoother thresholds, accessible kitchens and bathrooms, and stair or platform lifts.",
      },
      {
        q: "Does my home have to meet ADA standards?",
        a: "Usually not. The ADA Standards for Accessible Design apply to public accommodations and certain other facilities, not to most private single-family homes. Many homeowners still use them as a helpful reference for clearances, grab bar heights, and ramp slopes, but a home can be designed around the specific person who lives there. Rental and multifamily properties can have different requirements, which we cover on our accessible units page.",
        links: [
          {
            href: "/commercial/accessible-units",
            label: "Accessible unit upgrades",
          },
        ],
      },
      {
        q: "How wide does a doorway need to be for a wheelchair?",
        a: "A common target is at least 32 inches of clear opening, which usually means a 36-inch door. Some chairs need more. Swing-clear (offset) hinges can add clear width to an existing doorway, and in other cases the opening has to be reframed. We measure the doors and the chair or walker before recommending either.",
      },
      {
        q: "Should a wheelchair ramp be permanent or modular?",
        a: "A permanent ramp built of wood or concrete suits long-term needs and can be designed to fit the look of the house. A modular ramp can be installed and later removed or moved, which can make sense for a rental or a short-term need. Either way, the rise at the door and the space in front of it determine how long the ramp has to be, since a gentle slope (the ADA guideline is 1 inch of rise per 12 inches of run) takes room.",
      },
      {
        q: "Can you modify a kitchen for a wheelchair user?",
        a: "Yes. Typical changes include a lowered counter section, a roll-under sink with protected pipes, pull-out and lower storage, lever faucets, controls within reach, and clear floor space to turn around.",
      },
      {
        q: "Do you install stair lifts or platform lifts?",
        a: "We coordinate them as part of an accessibility project, working with a specialized install partner where the equipment calls for one, and handle the related construction such as landings, electrical, and finish work.",
      },
    ],
    ctaHeading: 'Ready to Make Every Room More Accessible?',
    ctaBody: 'Tell us how you use the home now and what is getting in the way. We will follow up to schedule a free estimate.',
    cardBlurb:
      'From ramps and wider doorways to accessible kitchens and bathrooms, McLoud Construction makes practical accessibility modifications that help Kansas City metro homes and rental units work better in daily life.',
  },
  {
    slug: 'basement-finishing',
    group: 'homeowner',
    h1: 'Basement Finishing in Kansas City',
    name: 'Basement Finishing',
    eyebrow: 'For Homeowners · Kansas City Metro',
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
      { type: 'text', value: 'If you are comparing this with other McLoud Construction work for homeowners, start on our ' },
      { type: 'link', href: '/residential', label: 'home remodeling' },
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
      'Years in the restoration industry taught Stachys McLoud what water does to a finished space. That is why McLoud Construction checks for moisture before finishing work begins. A beautiful room is only a good investment if it stays dry.',
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
        href: "/residential/bathroom-remodeling",
        name: "Bathroom Remodeling",
        blurb: "Bathrooms built with the waterproofing and ventilation a basement bath needs",
      },
      {
        href: "/residential",
        name: "Residential Remodeling",
        blurb: "Kitchens, bathrooms, whole-home remodels, and every McLoud Construction specialty",
      },
    ],
    faqs: [
      {
        q: "How do you check a basement for moisture before finishing it?",
        a: "We look for signs of water such as staining, white mineral deposits (efflorescence) on block or concrete, damp spots, musty odors, and cracks, and we look at how the yard is graded and where the gutters drain. If there is an active water problem, it gets addressed before any framing or drywall goes in, sometimes with a drainage or waterproofing specialist. That approach comes from years in the restoration industry, seeing what water does to finished basements.",
      },
      {
        q: "Does a basement bedroom need an egress window?",
        a: "Yes. Cities across the Kansas City metro base their residential codes on the International Residential Code, which requires an emergency escape opening in basement sleeping rooms. That generally means a window with at least 5.7 square feet of clear opening, a sill no more than 44 inches above the floor, and a window well large enough to climb out of. The exact requirements come from your city's adopted code, so we confirm them for your address.",
      },
      {
        q: "Do I need a permit to finish a basement?",
        a: "In most Kansas City metro cities, yes, for the framing, electrical, plumbing, and mechanical work involved. Requirements differ between cities on the Missouri and Kansas sides, so we confirm what your scope needs during the estimate.",
      },
      {
        q: "What flooring works best in a basement?",
        a: "Below grade, the safest choices tolerate some moisture: luxury vinyl plank, porcelain or ceramic tile, and carpet over a moisture-resistant pad. Solid hardwood is usually avoided. The moisture check helps decide which option fits your basement.",
      },
      {
        q: "What affects the cost of finishing a basement?",
        a: "The biggest factors are the size of the space, whether you add a bathroom (and how far it is from the existing drain lines), egress windows that need excavation, ceiling height and ductwork, any moisture work needed first, and your finish choices. We give you a written estimate after seeing the basement.",
      },
      {
        q: "Can I add a bathroom in the basement?",
        a: "Often, yes. If the new fixtures sit below the main sewer line, the bathroom may need an ejector or up-flush pump. Where the existing drain and vent lines run makes a big difference, so we look at that during the estimate.",
      },
    ],
    ctaHeading: 'Ready to Unlock the Space You Already Own?',
    ctaBody: 'Tell us how you want to use the basement. We will follow up to schedule a free estimate.',
    cardBlurb:
      'McLoud Construction turns unfinished Kansas City metro basements into livable rooms. We check for moisture first, then handle the finish work so you can add space without moving or building an addition.',
  },
  {
    slug: 'tub-to-shower-conversions',
    group: 'accessibility',
    h1: 'Tub-to-Shower Conversions in Kansas City',
    name: 'Tub-to-Shower Conversions',
    eyebrow: 'Homeowners & Accessibility · Kansas City Metro',
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
      'McLoud Construction treats a tub-to-shower conversion as a real remodel. Taking out a tub is not only a fixture swap. It can involve careful demolition, subfloor and plumbing repairs, and a watertight shower that is finished well enough to live with every day.',
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
      {
        href: '/residential/bathroom-remodeling',
        name: 'Bathroom Remodeling',
        blurb: 'A full remodel when you want to change more than the tub',
      },
    ],
    faqs: [
      {
        q: "What is a tub-to-shower conversion?",
        a: "It replaces an existing bathtub with a walk-in shower in roughly the same footprint. The old tub comes out, the plumbing and subfloor are repaired as needed, and a new shower base, walls, door or curtain, and fixtures go in. Grab bars, a bench, and niches are optional.",
      },
      {
        q: "Should I choose a tiled shower or shower wall panels?",
        a: "Tile gives you the most design choice and works with curbless or custom-size bases. Solid wall panels have fewer seams and less grout to clean. Both can be built watertight, so the choice usually comes down to look, upkeep, and budget.",
      },
      {
        q: "Will removing my only bathtub hurt resale?",
        a: "It can matter to some buyers, especially families with young children, who often look for at least one tub in the house. If this is your only tub, it is worth weighing how long you plan to stay. If there is another tub elsewhere in the home, it is usually less of a concern.",
      },
      {
        q: "Can a tub-to-shower conversion be curbless?",
        a: "Sometimes. A curbless entry needs the shower floor to be lowered or the bathroom floor to slope to the drain, which depends on the framing or slab underneath. A low-threshold base is the more common choice in existing bathrooms and is still much easier to step into than a tub.",
      },
      {
        q: "What if there is damage under the old tub?",
        a: "It is common to find worn plumbing or soft subfloor once a tub comes out, especially after years of small leaks. We repair it before the new shower goes in, and we tell you what we found before doing any added work.",
      },
    ],
    ctaHeading: "Ready for a Shower You'll Actually Use?",
    ctaBody: 'Tell us about the current tub and what you want from the new shower. We will follow up to schedule a free estimate.',
    cardBlurb:
      'McLoud Construction removes the old bathtub and builds a walk-in shower that is easier to use and easier to clean, with low-threshold and curbless options, new walls, and new fixtures.',
  },
  {
    slug: "kitchen-remodeling",
    group: 'homeowner',
    h1: 'Kitchen Remodeling in Kansas City',
    name: "Kitchen Remodeling",
    eyebrow: 'For Homeowners · Kansas City Metro',
    title: "A Kitchen Built Around How You Cook and Live",
    metaTitle: "Kitchen Remodeling in Kansas City",
    metaDescription: "Kitchen remodeling in Kansas City by McLoud Construction: cabinets, countertops, layout changes, plumbing, electrical, and lighting, with one point of contact.",
    description: "Kitchen remodeling across the Kansas City metro, including cabinetry, countertops, layout and structural changes, plumbing, electrical, flooring, and lighting.",
    heroBody: "McLoud Construction remodels kitchens across the Kansas City metro, on both the Missouri and Kansas sides of the state line, from focused updates to full gut renovations with new layouts.",
    intro: "The kitchen carries more daily use than any other room in the house, so it has to hold up to real life while still feeling like the heart of the home. We work through layout, storage, and finish choices with you, then build it with the same care for the parts you never see as for the cabinets you look at every day.",
    audienceIntro: "This work is a good fit if you:",
    audience: [
      "Have a kitchen that no longer fits how your household cooks, eats, or gathers",
      "Want to open up a closed-off kitchen or change the layout",
      "Are updating a home you plan to stay in, and want a kitchen that stays easy to use for years",
    ],
    audienceNoteParts: [
      {
        type: "text",
        value: "If someone in the home uses a wheelchair or walker, our ",
      },
      {
        type: "link",
        href: "/residential/accessibility-modifications",
        label: "accessibility modifications",
      },
      {
        type: "text",
        value: " cover lowered counters, roll-under sinks, and other accessible kitchen features.",
      },
    ],
    includedIntro: "Every kitchen is different, so we start by walking the space with you. A kitchen remodel from McLoud Construction can include:",
    included: [
      "Cabinetry, countertops, and backsplashes",
      "Layout changes, including opening or removing walls where the structure allows",
      "Plumbing and electrical updates, with trusted trade partners where needed",
      "Flooring and lighting, including task and under-cabinet lighting",
      "Pull-out storage, lever faucets, and other features that make the kitchen easier to use",
    ],
    includedNote: "You choose finishes, fixtures, and materials with guidance from our team, not just a spec sheet.",
    why: [
      "McLoud Construction does full remodels, down to the studs when the job calls for it. A kitchen remodel often means opening walls and floors, and we plan for what might be behind them so problems are fixed properly instead of covered up.",
      "Most families stay home during a kitchen remodel. We keep the work area closed off, protect the rest of the house, and give you one point of contact from the first visit to the final walkthrough. McLoud Construction is insured, and every trade partner is vetted.",
    ],
    photos: [],
    related: [
      {
        href: "/residential/bathroom-remodeling",
        name: "Bathroom Remodeling",
        blurb: "Full bathroom remodels and focused updates, waterproofed the right way",
      },
      {
        href: "/residential/accessibility-modifications",
        name: "Accessibility Modifications",
        blurb: "Accessible kitchens with lowered counters, roll-under sinks, and clear floor space",
      },
    ],
    faqs: [
      {
        q: "What affects the cost of a kitchen remodel?",
        a: "The biggest factors are whether the layout changes (moving plumbing, gas, or electrical costs more than keeping them in place), cabinet construction and finish, countertop material, appliances, flooring, and what is found behind the walls and under the floor. Removing or opening a wall adds structural work. We give you a written estimate after seeing the kitchen.",
      },
      {
        q: "Can you remove a wall to open up the kitchen?",
        a: "Often, yes. What it takes depends on whether the wall is load-bearing and what runs through it, such as plumbing, ductwork, or wiring. A load-bearing wall needs a properly sized beam and usually a permit. We evaluate the wall on site before recommending it.",
      },
      {
        q: "Can we live at home during a kitchen remodel?",
        a: "Most families do. Plan on the kitchen being out of service for part of the project. We talk through setting up a temporary space for the refrigerator and a microwave, and we keep the work area closed off from the rest of the house.",
      },
      {
        q: "Can a new kitchen be easier to use as we get older?",
        a: "Yes. Pull-out shelves and drawers instead of deep base cabinets, lever faucets, a mix of counter heights, better task lighting, and slip-resistant flooring all help, and they look like ordinary good design.",
        links: [
          {
            href: "/residential/accessibility-modifications",
            label: "Accessible kitchens",
          },
        ],
      },
    ],
    ctaHeading: "Let's Talk About Your Kitchen",
    ctaBody: "Tell us what is not working in the kitchen today and what you want from the new one. We will follow up to schedule a free estimate.",
    cardBlurb: "Cabinets, countertops, layout changes, plumbing, electrical, flooring, and lighting for Kansas City metro kitchens, with guidance at every material and finish decision.",
  },
  {
    slug: "bathroom-remodeling",
    group: 'homeowner',
    h1: 'Bathroom Remodeling in Kansas City',
    name: "Bathroom Remodeling",
    eyebrow: 'For Homeowners · Kansas City Metro',
    title: "A Bathroom Done Right Behind the Tile",
    metaTitle: "Bathroom Remodeling in Kansas City",
    metaDescription: "Bathroom remodeling in Kansas City by McLoud Construction: full gut renovations and focused updates, with waterproofing, ventilation, and tile done right.",
    description: "Bathroom remodeling across the Kansas City metro, including full gut renovations, showers and tubs, tile, vanities, fixtures, ventilation, and waterproofing.",
    heroBody: "McLoud Construction remodels bathrooms across the Kansas City metro, on both the Missouri and Kansas sides of the state line, from primary suites to hall baths and powder rooms.",
    intro: "Bathrooms are unforgiving of shortcuts. Waterproofing, ventilation, and fixture placement all have to be right the first time. Whether it is a full gut renovation or a focused update, we treat the parts you will never see, like moisture barriers, proper slope, and solid blocking, with the same care as the tile you look at every morning.",
    audienceIntro: "This work is a good fit if you:",
    audience: [
      "Have a dated or worn-out bathroom you want fully renovated",
      "Are dealing with a leaky shower, soft floor, or poor ventilation and want it fixed properly",
      "Want a better layout, more storage, or a larger shower",
    ],
    audienceNoteParts: [
      {
        type: "text",
        value: "If safety and getting older are the main reasons for the remodel, see our ",
      },
      {
        type: "link",
        href: "/residential/aging-in-place-bathroom-remodels",
        label: "aging-in-place bathroom remodels",
      },
      {
        type: "text",
        value: ". If you only want to replace a tub you do not use, a ",
      },
      {
        type: "link",
        href: "/residential/tub-to-shower-conversions",
        label: "tub-to-shower conversion",
      },
      {
        type: "text",
        value: " may be the simpler project.",
      },
    ],
    includedIntro: "A bathroom remodel from McLoud Construction can include:",
    included: [
      "Full gut renovations down to the studs and subfloor",
      "Showers, tubs, and tile, built over a continuous waterproof membrane",
      "Vanities, toilets, faucets, and lighting",
      "Ventilation sized for the room",
      "Wall blocking for grab bars now or later",
    ],
    includedNote: "We walk the bathroom with you first and help you choose a layout and finishes that fit the space and how you use it.",
    why: [
      "Stachys McLoud founded McLoud Construction after years in the restoration industry, so we have seen what failed waterproofing and poor ventilation do to framing and subfloors. That is why the hidden layers of a bathroom get as much attention as the finishes.",
      "We are used to working in occupied homes, which matters when the bathroom is one you still need. McLoud Construction is insured, and every trade partner is vetted.",
    ],
    photos: [],
    related: [
      {
        href: "/residential/tub-to-shower-conversions",
        name: "Tub-to-Shower Conversions",
        blurb: "A focused project that replaces a tub you never use with a walk-in shower",
      },
      {
        href: "/residential/aging-in-place-bathroom-remodels",
        name: "Aging-in-Place Bathroom Remodels",
        blurb: "A bathroom planned to stay safe and easy to use for years to come",
      },
    ],
    faqs: [
      {
        q: "What affects the cost of a bathroom remodel?",
        a: "The main factors are the size of the room, whether fixtures move (relocating a toilet or drain costs more than keeping it), shower and tub choices, tile and finish selections, ventilation, and the condition of the subfloor and framing once the old finishes come out. We give you a written estimate after seeing the bathroom.",
      },
      {
        q: "How do you keep a new shower from leaking?",
        a: "By treating waterproofing as its own step: a continuous waterproof membrane behind the tile, a properly sloped shower floor, sealed seams and penetrations, and a vent fan sized for the room. Years in the restoration industry mean we have seen what failed waterproofing does to framing and subfloors, so we do not cut corners on it.",
      },
      {
        q: "What is the difference between a bathroom remodel and a tub-to-shower conversion?",
        a: "A tub-to-shower conversion focuses on one change: replacing the tub with a walk-in shower. A full bathroom remodel can change everything else too, including the vanity, toilet, flooring, lighting, layout, and ventilation.",
        links: [
          {
            href: "/residential/tub-to-shower-conversions",
            label: "Tub-to-shower conversions",
          },
        ],
      },
      {
        q: "Can a regular bathroom remodel include accessibility features?",
        a: "Yes. Adding wall blocking for future grab bars, a low-threshold or curbless shower, a comfort-height toilet, and lever handles costs little extra while the walls are open, and none of it has to look clinical.",
        links: [
          {
            href: "/residential/aging-in-place-bathroom-remodels",
            label: "Aging-in-place bathroom remodels",
          },
        ],
      },
    ],
    ctaHeading: "Ready for a Bathroom Done Right?",
    ctaBody: "Tell us what you want to change about the bathroom. We will follow up to schedule a free estimate.",
    cardBlurb: "Full gut renovations and focused updates for Kansas City metro bathrooms, with the waterproofing, ventilation, and blocking you never see done as carefully as the tile you do.",
  },
];

// `group` puts each page under one hub: Homeowners (/residential) or
// Accessibility (/residential/aging-in-place). Tub-to-shower conversions sit
// under Accessibility but are also listed for homeowners.
export const HOMEOWNER_SERVICES = RESIDENTIAL_SERVICES.filter((s) => s.group === 'homeowner');
export const ACCESSIBILITY_SERVICES = RESIDENTIAL_SERVICES.filter((s) => s.group === 'accessibility');

export const RESIDENTIAL_SERVICE_BY_SLUG = Object.fromEntries(
  RESIDENTIAL_SERVICES.map(service => [service.slug, service])
);
