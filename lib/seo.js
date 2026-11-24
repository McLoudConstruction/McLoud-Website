// Shared page metadata. Next.js replaces (does not merge) a parent's
// openGraph and twitter objects when a page sets its own, so every page
// builds them here to keep the share image, site name and per-page
// title/description on every URL.

export const SITE_URL = 'https://mcloudconstruction.com';
export const SITE_NAME = 'McLoud Construction';
export const OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'McLoud Construction \u2014 Built right. Told straight.',
};

// `title` is the page's own title without the brand; the root layout's
// template adds " | McLoud Construction". Pass `absolute: true` when the
// title already contains the brand and should be used as is.
export function pageMetadata({ title, description, path, absolute = false, image = OG_IMAGE }) {
  const fullTitle = absolute ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      title: fullTitle,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}
