// Kept free of imports on purpose: the header and the estimate form are
// client components, and importing lib/residentialServices.js here would ship
// all of that page copy to every visitor's browser. If you add or rename a
// service in lib/residentialServices.js, add it to SPECIALTIES too.
export const SPECIALTIES = [
  { slug: 'aging-in-place-bathroom-remodels', name: 'Aging-in-Place Bathroom Remodels' },
  { slug: 'accessibility-modifications', name: 'Accessibility Modifications' },
  { slug: 'basement-finishing', name: 'Basement Finishing' },
  { slug: 'tub-to-shower-conversions', name: 'Tub-to-Shower Conversions' },
];

// The residential menu, in the order the header, mobile menu and footer show
// it: the specialty pages first, then the standard remodels (which live as
// sections of /residential until they get pages of their own).
export const RESIDENTIAL_NAV = [
  { href: '/residential/aging-in-place', label: 'Aging-in-Place Planning' },
  ...SPECIALTIES.map(s => ({ href: `/residential/${s.slug}`, label: s.name })),
  { href: '/residential#kitchen-remodeling', label: 'Kitchen Remodeling' },
  { href: '/residential#bathroom-remodeling', label: 'Bathroom Remodeling' },
  { href: '/residential#whole-home-remodeling', label: 'Whole-Home Remodeling' },
];

// "What's the project?" on the estimate form. `value` is what a link can
// pass as ?service= (it matches the residential page slugs) and `label` is
// what the lead record shows.
export const PROJECT_OPTIONS = [
  ...SPECIALTIES.map(s => ({ value: s.slug, label: s.name })),
  { value: 'kitchen-remodeling', label: 'Kitchen Remodeling' },
  { value: 'bathroom-remodeling', label: 'Bathroom Remodeling' },
  { value: 'whole-home-remodeling', label: 'Whole-Home Remodeling' },
  { value: 'commercial', label: 'Commercial Project' },
  { value: 'accessible-units', label: 'Accessible Unit Upgrades (Property Management)' },
  { value: 'other', label: 'Something Else' },
];

// Options that are commercial work: choosing one switches the form to its
// commercial fields (company, property type, size, timeline).
export const COMMERCIAL_PROJECTS = ['commercial', 'accessible-units'];

// The commercial menu's extra page beside the industry pages.
export const COMMERCIAL_EXTRA_NAV = [{ href: '/commercial/accessible-units', label: 'Accessible Units' }];

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
// residential vertical; the accessible-units page is multi-family work.
export function estimateHref(service) {
  if (service === 'accessible-units') return '/consultation?vertical=multi_family&service=accessible-units';
  if (service === 'commercial') return '/consultation?service=commercial';
  return `/consultation?vertical=residential&service=${service}`;
}
