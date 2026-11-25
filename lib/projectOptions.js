// Kept free of imports on purpose: the header and the estimate form are
// client components, and importing lib/residentialServices.js here would ship
// all of that page copy to every visitor's browser. If you add or rename a
// service in lib/residentialServices.js, update HOMEOWNER and ACCESSIBILITY here too.

// The site is organized around three kinds of customers: homeowners,
// accessibility (homeowners, families and property managers), and property
// managers. Each has a hub page and a menu.
export const HOMEOWNER = [
  { slug: 'kitchen-remodeling', name: 'Kitchen Remodeling' },
  { slug: 'bathroom-remodeling', name: 'Bathroom Remodeling' },
  { slug: 'basement-finishing', name: 'Basement Finishing' },
];

export const ACCESSIBILITY = [
  { slug: 'aging-in-place-bathroom-remodels', name: 'Aging-in-Place Bathroom Remodels' },
  { slug: 'tub-to-shower-conversions', name: 'Tub-to-Shower Conversions' },
  { slug: 'accessibility-modifications', name: 'Accessibility Modifications' },
];

export const HUBS = {
  homeowners: { href: '/residential', label: 'Homeowners' },
  accessibility: { href: '/residential/aging-in-place', label: 'Accessibility' },
  propertyManagers: { href: '/commercial', label: 'Property Managers' },
};

// Menus, in the order the header, mobile menu and footer show them.
// Tub-to-shower conversions appear under both Homeowners and Accessibility.
export const HOMEOWNER_NAV = [
  ...HOMEOWNER.map(s => ({ href: `/residential/${s.slug}`, label: s.name })),
  { href: '/residential#whole-home-remodeling', label: 'Whole-Home Remodeling' },
  { href: '/residential/tub-to-shower-conversions', label: 'Tub-to-Shower Conversions' },
];

export const ACCESSIBILITY_NAV = [
  { href: '/residential/aging-in-place', label: 'Aging-in-Place Planning' },
  ...ACCESSIBILITY.map(s => ({ href: `/residential/${s.slug}`, label: s.name })),
  { href: '/commercial/accessible-units', label: 'Accessible Units (Property Managers)' },
];

export const PROPERTY_MANAGER_NAV = [
  { href: '/commercial/unit-renovations', label: 'Unit Renovations & Turns' },
  { href: '/commercial/interior-remodels', label: 'Interior Remodels' },
  { href: '/commercial/accessible-units', label: 'Accessible Units' },
  { href: '/commercial/multi-family', label: 'Multi-Family' },
  { href: '/commercial#exterior-work', label: 'Exterior Repairs & Repaints' },
];

// "What's the project?" on the estimate form. `value` is what a link can
// pass as ?service= (it matches the residential page slugs) and `label` is
// what the lead record shows.
export const PROJECT_OPTIONS = [
  ...HOMEOWNER.map(s => ({ value: s.slug, label: s.name })),
  { value: 'whole-home-remodeling', label: 'Whole-Home Remodeling' },
  ...ACCESSIBILITY.map(s => ({ value: s.slug, label: s.name })),
  { value: 'unit-renovations', label: 'Unit Renovations & Turns (Property Management)' },
  { value: 'interior-remodels', label: 'Commercial Interior Remodel' },
  { value: 'accessible-units', label: 'Accessible Unit Upgrades (Property Management)' },
  { value: 'commercial', label: 'Other Property Management or Commercial Project' },
  { value: 'other', label: 'Something Else' },
];

// Options that are commercial work: choosing one switches the form to its
// commercial fields (company, property type, size, timeline).
export const COMMERCIAL_PROJECTS = ['commercial', 'unit-renovations', 'interior-remodels', 'accessible-units'];

export const PROJECT_BY_VALUE = Object.fromEntries(PROJECT_OPTIONS.map(o => [o.value, o]));

// "Who is it for?" on the estimate form (residential projects only). A link
// can preselect one with ?for=<value>.
export const AUDIENCE_OPTIONS = [
  { value: 'self', label: 'Myself / my own home' },
  { value: 'family', label: 'A parent or family member' },
  { value: 'tenant', label: 'A tenant or rental unit' },
  { value: 'other', label: 'Other' },
];

export const AUDIENCE_BY_VALUE = Object.fromEntries(AUDIENCE_OPTIONS.map(o => [o.value, o]));

// Estimate links that prefill the form. Residential links carry the
// residential vertical; unit renovations and accessible units are
// multi-family work. The vertical keys must exist in the jobs platform.
export function estimateHref(service) {
  if (service === 'accessible-units' || service === 'unit-renovations') {
    return `/consultation?vertical=multi_family&service=${service}`;
  }
  if (service === 'commercial' || service === 'interior-remodels') return `/consultation?service=${service}`;
  return `/consultation?vertical=residential&service=${service}`;
}
