// One entry per commercial industry landing page (app/commercial/[industry]).
// `key` is the value sent to the jobs platform as the lead's vertical, so it
// must match VERTICALS in the jobs repo (lib/verticals.js). `slug` is the URL.
// To add or change an industry, edit this file only: the page, the sitemap and
// the commercial overview all read from it.
//
// Every entry stays here because the estimate form's property types and the
// jobs platform's lead verticals use them. Only entries with `hasPage: true`
// get a page at /commercial/<slug>; the others were folded into the property
// manager pages and their old URLs redirect (see next.config.js).

export const VERTICALS = [
  {
    key: 'multi_family',
    slug: 'multi-family',
    hasPage: true,
    label: 'Multi-Family',
    eyebrow: 'For Apartment Owners & Property Managers',
    title: 'Multi-Family Renovations in Kansas City',
    subtitle: 'Units, Amenities and Exteriors, Planned Around Residents',
    metaTitle: 'Multi-Family Renovations in Kansas City',
    metaDescription:
      'Multi-family renovations in Kansas City: unit renovations and turns, clubhouse and amenity remodels, accessible units, and exterior repaints and repairs.',
    body: 'Unit renovations and turns, clubhouse and amenity remodels, accessible units, and exterior repaints and repairs for apartment communities, planned around your residents and your leasing calendar.',
    projects: [
      { title: 'Unit Renovations & Turns', body: 'Kitchens, baths, flooring, and finishes updated between residents or as a full interior renovation, built to your property standards.' },
      { title: 'Accessible Unit Upgrades', body: 'Roll-in showers, wider doorways, and accessible kitchens for residents with mobility needs, built to your specifications.' },
      { title: 'Clubhouse Remodels & Renovations', body: 'Full remodels for clubhouses, leasing offices, and shared spaces that take real daily use.' },
      { title: 'Amenity Additions & Renovations', body: 'New amenity spaces and updates to existing ones, planned around how residents actually use them.' },
      { title: 'Exterior Repaints', body: 'Complete repaints for multi-building communities, sequenced building by building so residents know what to expect.' },
      { title: 'Wood Rot, Trim & Stucco Repairs', body: 'Rot and trim repairs that address the moisture source, and stucco patches matched to the existing texture and color.' },
    ],
    concerns: [
      { title: 'Residents stay in place', body: 'We plan access, noise, and sequencing so the community keeps running while the work happens.' },
      { title: 'Turns on your schedule', body: 'Unit work is planned around move-outs, move-ins, and your leasing calendar, and any change gets communicated early.' },
      { title: 'Straight answers on deferred work', body: 'We tell you plainly whether an issue needs attention now or can wait.' },
    ],
    faqs: [
      {
        q: 'Can you renovate units while the rest of the community stays occupied?',
        a: 'Yes. Unit work is planned around move-outs and move-ins, and work in occupied buildings is sequenced to keep noise, dust, and access problems away from residents who are still living there.',
        links: [{ label: 'Unit renovations & turns', href: '/commercial/unit-renovations' }],
      },
      {
        q: 'Do you handle exterior work on apartment communities?',
        a: 'Yes. McLoud Construction handles exterior repaints, wood rot and trim repairs, and stucco repairs, sequenced building by building so residents know what to expect.',
      },
      {
        q: 'Can you make a unit accessible for a resident with mobility needs?',
        a: 'Yes. Roll-in showers, wider doorways, grab bars with proper blocking, and accessible kitchens, built to the specifications you set for the unit.',
        links: [{ label: 'Accessible unit upgrades', href: '/commercial/accessible-units' }],
      },
    ],
    ctaHeading: 'Planning Work on Your Community?',
    ctaBody: 'Tell us about the property, the number of units, and the scope. We will follow up with next steps.',
  },
  {
    key: 'hotel_lodging',
    slug: 'hotel-lodging',
    label: 'Hotel & Lodging',
    eyebrow: 'For Hotel & Lodging Owners',
    title: 'Hotel & Lodging Renovations',
    metaTitle: 'Hotel & Lodging Renovations in Kansas City',
    metaDescription:
      'Exterior and interior renovations, repaints, trim and stucco repair, and amenity upgrades for hotels and lodging properties across the Kansas City metro.',
    body: 'Exterior and interior renovations for hotels and lodging properties, phased to keep guests arriving and the front desk running.',
    projects: [
      { title: 'Exterior & Interior Renovations', body: 'Full-scope work across the building envelope and interior spaces, coordinated as one project.' },
      { title: 'Full Exterior Paints', body: 'Complete exterior repaints, scheduled to limit disruption to arriving guests.' },
      { title: 'Wood Rot & Trim Replacement', body: 'Repairs that fix the underlying moisture issue so the work lasts.' },
      { title: 'Stucco Repairs', body: 'Repairs matched to existing texture and color, so the fix disappears into the surface.' },
      { title: 'Amenity Additions & Renovations', body: 'Lobbies, fitness rooms, and shared spaces updated for how guests use them.' },
      { title: 'Finish Carpentry', body: 'Precision trim and millwork where guests judge the quality of a property.' },
    ],
    concerns: [
      { title: 'Guests keep arriving', body: 'Work is phased to limit disruption to occupied rooms, entrances, and public areas.' },
      { title: 'Improvement plans have deadlines', body: 'If your brand has a property improvement plan, we build the schedule around its requirements and dates.' },
      { title: 'One point of contact', body: 'You always know what is happening, what is next, and who to call.' },
    ],
    ctaHeading: 'Planning Work on Your Property?',
    ctaBody: 'Tell us about the property and the scope. We will follow up with next steps.',
  },
  {
    key: 'office',
    slug: 'office',
    label: 'Office',
    eyebrow: 'For Office Owners & Tenants',
    title: 'Office Buildouts & Renovations',
    metaTitle: 'Office Buildouts in Kansas City',
    metaDescription:
      'Office buildouts, tenant improvements, and renovations, from full-floor reconfigurations to targeted updates, across the Kansas City metro.',
    body: 'Office buildouts and renovations, from full-floor reconfigurations to targeted updates, planned around your move-in and your lease.',
    projects: [
      { title: 'Office Buildout & Renovations', body: 'Full-floor reconfigurations and targeted updates, built around real move-in timelines.' },
      { title: 'Exterior & Interior Renovations', body: 'Envelope and interior work coordinated as a single project.' },
      { title: 'Finish Carpentry', body: 'Millwork, trim, and detail work in the spaces clients and employees notice.' },
      { title: 'Full Exterior Paints', body: 'Exterior repaints for office properties and multi-building campuses.' },
    ],
    concerns: [
      { title: 'Lease deadlines are real', body: 'We plan the schedule backward from your move-in or occupancy date and flag risks early.' },
      { title: 'Occupied buildings', body: 'When neighbors or tenants stay in the building, we plan noise, access, and staging so work does not spill over.' },
      { title: 'Clear scope and budget', body: 'You get a clear scope and a straight answer on cost before work starts, and change orders are written down.' },
    ],
    ctaHeading: 'Planning an Office Project?',
    ctaBody: 'Tell us about the space and the timeline. We will follow up with next steps.',
  },
  {
    key: 'retail',
    slug: 'retail',
    label: 'Retail',
    eyebrow: 'For Retail Owners & Tenants',
    title: 'Retail Buildouts & Renovations',
    metaTitle: 'Retail Buildouts in Kansas City',
    metaDescription:
      'Retail buildouts and renovations built around opening dates and lease deadlines, plus exterior repaints and repairs, across the Kansas City metro.',
    body: 'Retail buildouts and renovations built around opening dates and lease deadlines, with exterior work for the storefront customers see first.',
    projects: [
      { title: 'Retail Buildout & Renovations', body: 'Buildouts and renovations for retail spaces, built around real move-in timelines and lease deadlines.' },
      { title: 'Exterior & Interior Renovations', body: 'Storefront and interior work coordinated as one project.' },
      { title: 'Finish Carpentry', body: 'Millwork, trim, and detail work where presentation matters.' },
      { title: 'Full Exterior Paints', body: 'Exterior repaints for retail centers and standalone buildings.' },
      { title: 'Stucco Repairs', body: 'Repairs matched to existing texture and color.' },
    ],
    concerns: [
      { title: 'Opening dates do not move', body: 'We build the schedule backward from your opening or lease date and tell you early if something threatens it.' },
      { title: 'Landlord and tenant scope', body: 'We help sort out who is responsible for what, so the scope is clear before work starts.' },
      { title: 'Open for business', body: 'For centers and storefronts that stay open, we plan access and staging around customers.' },
    ],
    ctaHeading: 'Planning a Retail Project?',
    ctaBody: 'Tell us about the space and your opening date. We will follow up with next steps.',
  },
  {
    key: 'recreational',
    slug: 'recreational-facilities',
    label: 'Recreational Facilities',
    eyebrow: 'For Recreational Facility Owners',
    title: 'Recreational Facility Renovations',
    metaTitle: 'Recreational Facility Renovations, KC',
    metaDescription:
      'Renovations, repaints, repairs, and amenity upgrades for recreational facilities, clubs, and community centers across the Kansas City metro.',
    body: 'Renovations and repairs for recreational facilities, clubs, and community centers, scheduled around your seasons and your members.',
    projects: [
      { title: 'Exterior & Interior Renovations', body: 'Full-scope work across the building and its interior spaces, coordinated as one project.' },
      { title: 'Amenity Additions & Renovations', body: 'New spaces and updates to existing ones, planned around how members actually use them.' },
      { title: 'Full Exterior Paints', body: 'Exterior repaints for buildings that take weather and heavy use.' },
      { title: 'Wood Rot & Trim Replacement', body: 'Repairs that address the underlying moisture issue so the work lasts.' },
      { title: 'Finish Carpentry', body: 'Trim and millwork built to handle real daily use.' },
    ],
    concerns: [
      { title: 'Seasons drive the schedule', body: 'We plan work around your busy and slow periods, not ours.' },
      { title: 'Built for heavy use', body: 'We recommend materials and details that hold up to the traffic your facility actually sees.' },
      { title: 'Members and staff stay informed', body: 'Clear communication about access and timing, so the work does not surprise anyone.' },
    ],
    ctaHeading: 'Planning Work on Your Facility?',
    ctaBody: 'Tell us about the facility and the scope. We will follow up with next steps.',
  },
  {
    key: 'church',
    slug: 'churches',
    label: 'Churches',
    eyebrow: 'For Churches & Ministries',
    title: 'Church Renovations & Capital Improvements',
    metaTitle: 'Church Renovations in Kansas City',
    metaDescription:
      'Exterior repairs, repaints, and interior renovations for churches across the Kansas City metro, planned around your services and your budget.',
    body: 'Repairs, repaints, and renovations for churches, from larger projects planned a year or two ahead to smaller fixes that cannot wait.',
    projects: [
      { title: 'Exterior & Interior Renovations', body: 'Sanctuaries, fellowship spaces, classrooms, and exteriors, coordinated as one project when it makes sense.' },
      { title: 'Full Exterior Paints', body: 'Complete exterior repaints for sanctuaries and multi-building campuses.' },
      { title: 'Wood Rot & Trim Replacement', body: 'Rot repair that fixes the moisture source so you are not repairing the same spot again.' },
      { title: 'Stucco Repairs', body: 'Repairs matched to existing texture and color.' },
      { title: 'Finish Carpentry', body: 'Trim, millwork, and detail work in the spaces your congregation sees every week.' },
    ],
    concerns: [
      { title: 'Work around services and events', body: 'We plan access and schedules around worship, weddings, funerals, and the rest of your calendar.' },
      { title: 'Committees and budgets', body: 'We give straight answers and rough budgets so a facilities team or a volunteer committee can plan with confidence.' },
      { title: 'Big and small', body: 'We welcome the larger repair and replacement projects as well as the smaller fixes that cannot wait.' },
    ],
    ctaHeading: 'Have a Building Project in Mind?',
    ctaBody: 'Tell us about the building and what you are seeing. We will follow up with next steps, no obligation.',
  },
];

// The industries that still have their own page.
export const PAGE_VERTICALS = VERTICALS.filter(v => v.hasPage);

export const VERTICAL_BY_SLUG = Object.fromEntries(VERTICALS.map(v => [v.slug, v]));
export const VERTICAL_BY_KEY = Object.fromEntries(VERTICALS.map(v => [v.key, v]));

// The residential page is not an industry page but is tracked the same way.
export const RESIDENTIAL_KEY = 'residential';
export const ALL_VERTICAL_KEYS = [...VERTICALS.map(v => v.key), RESIDENTIAL_KEY];
