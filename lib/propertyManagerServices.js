// Copy for the property manager service pages at /commercial/<slug> that are
// not industry pages: unit renovations and commercial interior remodels.
// Each page file in app/commercial/<slug>/ reads its entry from here.

const W9_FAQ = {
  q: 'Do you provide a W-9 and certificate of insurance?',
  a: 'Yes. McLoud Construction is insured, and we can send a W-9 and a certificate of insurance for vendor onboarding.',
};

export const PROPERTY_MANAGER_SERVICES = {
  'unit-renovations': {
    slug: 'unit-renovations',
    name: 'Unit Renovations & Turns',
    eyebrow: 'For Property Managers',
    h1: 'Apartment Unit Renovations in Kansas City',
    subtitle: 'Unit Turns and Interior Upgrades, Planned Around Your Leasing Calendar',
    metaTitle: 'Apartment Unit Renovations & Turns in Kansas City',
    metaDescription:
      'Apartment unit renovations and turns in Kansas City: kitchens, baths, flooring, and finishes for property managers, planned around move-outs and move-ins.',
    serviceType: 'Apartment unit renovation',
    heroBody:
      'McLoud Construction renovates apartment and rental units for property managers across the Kansas City metro, from turns between residents to full interior renovations, built to your property standard and scheduled around your leasing calendar.',
    scope: [
      { title: 'Kitchen Updates', body: 'Cabinets, countertops, sinks, fixtures, and lighting, updated to your property standard or a new one.' },
      { title: 'Bathroom Updates', body: 'Vanities, tile, fixtures, and ventilation, including tub-to-shower conversions where they make sense for the unit.' },
      { title: 'Flooring & Finishes', body: 'Durable flooring, paint, trim, and doors chosen to hold up through resident turnover.' },
      { title: 'Full Interior Renovations', body: 'Units taken down to the studs and finished again, with wet areas and hidden damage dealt with before the walls close.' },
      { title: 'Accessible Units', body: 'Roll-in showers, wider doorways, and accessible kitchens for residents with mobility needs.', href: '/commercial/accessible-units' },
      { title: 'Common-Area Touch-Ups', body: 'Hallways, stairwells, and entries refreshed alongside the units so the property reads as one.' },
    ],
    how: [
      { title: 'Turns on your schedule', body: 'Work is planned around move-out and move-in dates, and you hear early if anything threatens a date.' },
      { title: 'One standard, every unit', body: 'Every unit is built to the finish standard you set, so later units match the first.' },
      { title: 'Problems found first', body: 'Moisture, rot, and hidden damage are flagged before the walls close, with a straight answer on what needs attention now.' },
      { title: 'One point of contact', body: 'One person to call from the walkthrough to the final punch list, with change orders written down.' },
    ],
    faqs: [
      {
        q: 'Can you match our property’s finish standard?',
        a: 'Yes. Send us your standard, or walk a finished unit with us, and we build every unit to it. If a material is unavailable, we bring you options before substituting anything.',
      },
      {
        q: 'Can you renovate several units at once?',
        a: 'Tell us how many units and the window you have. We will tell you straight what McLoud Construction can take on and how the work would be sequenced.',
      },
      {
        q: 'Do residents need to move out during a unit renovation?',
        a: 'Unit renovations usually happen while a unit is vacant between residents. Work in occupied buildings is planned so neighboring residents can stay put, with access, noise, and dust control coordinated with your on-site team.',
      },
      {
        q: 'Can you make a unit accessible during a renovation?',
        a: 'Yes. A renovation is a good time to add a roll-in or low-threshold shower, grab bar blocking, wider doorways, or an accessible kitchen, built to the specifications you provide.',
        links: [{ label: 'Accessible unit upgrades', href: '/commercial/accessible-units' }],
      },
      W9_FAQ,
    ],
    vertical: 'multi_family',
    ctaHeading: 'Have Units Coming Up for Renovation?',
    ctaBody: 'Tell us about the property, the number of units, and your dates. We will follow up with next steps.',
  },

  'interior-remodels': {
    slug: 'interior-remodels',
    name: 'Commercial Interior Remodels',
    eyebrow: 'For Property Managers & Owners',
    h1: 'Commercial Interior Remodeling in Kansas City',
    subtitle: 'Office, Retail, Hospitality and Community Spaces',
    metaTitle: 'Commercial Interior Remodeling in Kansas City',
    metaDescription:
      'Commercial interior remodeling in Kansas City: office and retail buildouts, lobbies, clubhouses, and community spaces, planned around tenants and open hours.',
    serviceType: 'Commercial interior remodeling',
    heroBody:
      'McLoud Construction remodels commercial interiors across the Kansas City metro, from office and retail buildouts to lobbies, clubhouses, and church and community spaces, planned around the tenants, guests, and members who keep using the building.',
    scope: [
      { title: 'Office Buildouts & Renovations', body: 'Full-floor reconfigurations and targeted updates, built around real move-in dates and lease deadlines.' },
      { title: 'Retail Buildouts & Renovations', body: 'Buildouts and renovations for retail spaces, scheduled backward from your opening or lease date.' },
      { title: 'Lobbies, Clubhouses & Leasing Offices', body: 'Shared spaces and amenity rooms remodeled for how residents, guests, and members actually use them.' },
      { title: 'Restrooms & Break Rooms', body: 'Restroom and break-room remodels with the plumbing, ventilation, and finishes built to take daily use.' },
      { title: 'Finish Carpentry', body: 'Trim, millwork, and detail work in the spaces tenants and customers notice.' },
      { title: 'Church & Community Spaces', body: 'Fellowship halls, classrooms, and community rooms, planned around services, events, and seasons.' },
    ],
    how: [
      { title: 'Dates that do not move', body: 'We plan the schedule backward from your move-in, opening, or event date and flag risks early.' },
      { title: 'Open for business', body: 'When the building stays open, we plan noise, access, and staging so work does not spill over onto tenants, guests, or customers.' },
      { title: 'Clear scope and cost', body: 'A clear scope and a straight answer on cost before work starts. Landlord and tenant responsibilities are sorted out up front.' },
      { title: 'Vetted trades', body: 'Every subcontractor is vetted before they set foot on your property, with one point of contact for the whole job.' },
    ],
    faqs: [
      {
        q: 'Can you remodel while the building stays open?',
        a: 'Yes. For offices, retail centers, hotels, and community buildings that stay open, we plan access, noise, and staging around tenants, guests, and customers, and coordinate the schedule with your team before work starts.',
      },
      {
        q: 'Can you work to a lease or opening deadline?',
        a: 'We build the schedule backward from your move-in, opening, or event date, and tell you early and plainly if something threatens it.',
      },
      {
        q: 'What kinds of commercial interiors do you remodel?',
        a: 'Offices, retail spaces, hotel lobbies and amenity rooms, apartment clubhouses and leasing offices, churches, and recreational and community facilities.',
      },
      W9_FAQ,
    ],
    vertical: null,
    ctaHeading: 'Planning a Commercial Interior Project?',
    ctaBody: 'Tell us about the space, the scope, and your dates. We will follow up with next steps.',
  },
};
