// Business facts used across the site. Anything left empty is simply not shown,
// so it is safe to deploy with these blank and fill them in later.

// Business phone (the Google Voice number) as 10 digits, e.g. '8165550123';
// punctuation is ignored. While it is empty, no phone number appears anywhere.
// When set, a tap-to-call link appears in the header, the footer, the
// "Get a Free Estimate" banners, the estimate form's error message, and the
// `telephone` in the structured data Google reads. Use the same number on the
// Google Business Profile so the listings match.
export const PHONE = '';

// Short trust badges shown beside "Locally Owned" on the homepage,
// e.g. ['Insured', 'Free Written Estimates'].
// Only add what is true and can be backed up with paperwork.
export const CREDENTIALS = ['Insured'];

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

// +18165550123 form for structured data, or '' when no number is set.
export function phoneE164() {
  const d = PHONE.replace(/\D/g, '');
  return d.length === 10 ? `+1${d}` : '';
}
