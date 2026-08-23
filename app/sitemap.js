export default function sitemap() {
  const baseUrl = 'https://mcloudconstruction.com';
  const now = new Date();

  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'monthly' },
    { path: '/residential', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/commercial', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/faq', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/consultation', priority: 0.8, changeFrequency: 'yearly' },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
