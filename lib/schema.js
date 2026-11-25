// Structured data shared across pages. The organization is defined once in
// the root layout under ORG_ID; pages point at it instead of repeating it.
import { SITE_URL, SITE_NAME } from '@/lib/seo';
import { SERVICE_AREAS } from '@/lib/siteConfig';

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// The Kansas City metro on both sides of the state line, plus the named
// communities in lib/siteConfig.js.
export const AREA_SERVED = [
  { '@type': 'AdministrativeArea', name: 'Kansas City metropolitan area, MO & KS' },
  { '@type': 'State', name: 'Missouri' },
  { '@type': 'State', name: 'Kansas' },
  ...Object.entries(SERVICE_AREAS).flatMap(([state, cities]) =>
    cities.map(city => ({ '@type': 'City', name: city.includes(',') ? city : `${city}, ${state === 'Missouri' ? 'MO' : 'KS'}` }))
  ),
];

export const PROVIDER = { '@type': 'GeneralContractor', '@id': ORG_ID, name: SITE_NAME, url: SITE_URL };

export function serviceNode({ name, description, path, serviceType }) {
  return {
    '@type': 'Service',
    '@id': `${SITE_URL}${path}#service`,
    name,
    serviceType: serviceType || name,
    description,
    url: `${SITE_URL}${path}`,
    areaServed: AREA_SERVED,
    provider: PROVIDER,
  };
}

// Built from the same array the page renders, so the questions and answers
// Google reads always match the visible text.
export function faqPageNode(items) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function breadcrumbNode(crumbs) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.href === '/' ? '' : crumb.href}`,
    })),
  };
}

export function graph(...nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) };
}

export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
