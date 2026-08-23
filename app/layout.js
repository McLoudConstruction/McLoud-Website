import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'McLoud Construction | Kansas City Remodeling & Commercial Buildouts',
  description: 'Quality work, honest communication. McLoud Construction serves homeowners and commercial clients across the Kansas City metro, including Missouri and Kansas.',
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
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
      </head>
      <body
        className="font-body antialiased"
        style={{ '--font-display': "'Big Shoulders', sans-serif", '--font-body': "'Work Sans', sans-serif", '--font-mono': "'IBM Plex Mono', monospace" }}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
