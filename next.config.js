/** @type {import('next').NextConfig} */

// The industry pages that were folded into the property manager pages. The
// verticals themselves stay in lib/verticals.js for the estimate form and the
// jobs platform; only their pages are gone. Each sends a 301 (moved
// permanently) so search engines pass the old page's standing to the new one.
const FOLDED_INDUSTRY_PAGES = [
  ['/commercial/office', '/commercial/interior-remodels'],
  ['/commercial/retail', '/commercial/interior-remodels'],
  ['/commercial/hotel-lodging', '/commercial/interior-remodels'],
  ['/commercial/churches', '/commercial'],
  ['/commercial/recreational-facilities', '/commercial'],
];

const nextConfig = {
  async redirects() {
    return FOLDED_INDUSTRY_PAGES.map(([source, destination]) => ({ source, destination, statusCode: 301 }));
  },
};

module.exports = nextConfig;
