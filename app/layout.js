import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import AttributionTracker from '@/components/AttributionTracker';
import { PHONE, SERVICE_AREAS } from '@/lib/siteConfig';

const SITE_URL = 'https://mcloudconstruction.com';
const SITE_NAME = 'McLoud Construction';
const DEFAULT_TITLE = 'McLoud Construction | Kansas City Commercial & Residential Contractor';
const DEFAULT_DESCRIPTION =
  'Commercial capital improvements and residential remodeling across the Kansas City metro, Missouri and Kansas. Quality work, honest communication.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | McLoud Construction',
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
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
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'McLoud Construction \u2014 Built right. Told straight.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/og-image.png'],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: 'McLoud Construction',
  alternateName: 'McLoud Contracting, LLC',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.png`,
  description: DEFAULT_DESCRIPTION,
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Kansas City Metro, MO & KS' },
    ...Object.entries(SERVICE_AREAS).flatMap(([state, cities]) =>
      cities.map(city => ({ '@type': 'City', name: city.includes(',') ? city : `${city}, ${state}` }))
    ),
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  ...(PHONE && PHONE.replace(/\D/g, '').length === 10
    ? { telephone: `+1${PHONE.replace(/\D/g, '')}` }
    : {}),
  sameAs: ['https://www.instagram.com/mcloud.construction/'],
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
