export default function robots() {
  const baseUrl = 'https://mcloudconstruction.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
