// Business facts used across the site. Anything left empty is simply not shown,
// so it is safe to deploy with these blank and fill them in later.

// Business phone as 10 digits with no punctuation, e.g. '8165550123'.
// When set, a tap-to-call link appears in the header, the footer, the
// estimate form's error message, and the structured data Google reads.
export const PHONE = '';

// Short trust badges shown beside "Locally Owned" on the homepage,
// e.g. ['Licensed & Insured', 'Free Written Estimates'].
// Only add what is true and can be backed up with paperwork.
export const CREDENTIALS = [];

// Named communities, for the footer, homepage, and structured data.
// Trim or extend to match where you actually take work.
export const SERVICE_AREAS = {
  Missouri: ['Kansas City', "Lee's Summit", 'Independence', 'Blue Springs', 'Liberty', 'Raymore'],
  Kansas: ['Overland Park', 'Olathe', 'Lenexa', 'Shawnee', 'Leawood', 'Kansas City, KS'],
};

export function phoneDisplay() {
  const d = PHONE.replace(/\D/g, '');
  if (d.length !== 10) return '';
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function phoneHref() {
  const d = PHONE.replace(/\D/g, '');
  return d.length === 10 ? `tel:+1${d}` : '';
}
