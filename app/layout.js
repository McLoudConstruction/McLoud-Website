import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import AttributionTracker from '@/components/AttributionTracker';
import { phoneE164 } from '@/lib/siteConfig';
import { SITE_URL, SITE_NAME, OG_IMAGE } from '@/lib/seo';
import { AREA_SERVED, ORG_ID, WEBSITE_ID } from '@/lib/schema';

const DEFAULT_TITLE = 'Kansas City Remodeling Contractor | McLoud Construction';
const DEFAULT_DESCRIPTION =
  'Kansas City remodeling contractor for kitchens, bathrooms, basements, and accessibility remodels in MO & KS, plus renovations for property managers.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | McLoud Construction',
  },
  description: DEFAULT_DESCRIPTION,
  // No default canonical here: every page sets its own through pageMetadata,
  // and a root default would point pages without one (like the 404) at '/'.
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/og-image.png'],
  },
};

// GeneralContractor is a schema.org subtype of HomeAndConstructionBusiness
// (and of LocalBusiness and Organization), so it carries all of their
// properties. It is a service-area business: no street address is published.
// Pages point at this node by its @id instead of repeating it.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'GeneralContractor',
      '@id': ORG_ID,
      name: SITE_NAME,
      alternateName: 'McLoud Contracting, LLC',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/og-image.png`,
      description: DEFAULT_DESCRIPTION,
      slogan: 'Built right. Told straight.',
      founder: { '@type': 'Person', name: 'Stachys McLoud' },
      areaServed: AREA_SERVED,
      knowsAbout: [
        'Aging-in-place remodeling',
        'Aging-in-place bathroom remodels',
        'Curbless showers',
        'Home accessibility modifications',
        'Wheelchair ramps',
        'Doorway widening',
        'Tub-to-shower conversions',
        'Basement finishing',
        'Kitchen remodeling',
        'Bathroom remodeling',
        'Whole-home remodeling',
        'Apartment unit renovations',
        'Accessible unit upgrades for multifamily properties',
        'Commercial interior remodeling',
        'Exterior repaints and repairs',
      ],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      ...(phoneE164() ? { telephone: phoneE164() } : {}),
      sameAs: ['https://www.instagram.com/mcloud.construction/'],
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { '@id': ORG_ID },
      inLanguage: 'en-US',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders:wght@400;500;600;700;800;900&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-body antialiased">
        <AttributionTracker />
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
