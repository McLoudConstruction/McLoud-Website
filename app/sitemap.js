import { PAGE_VERTICALS } from '@/lib/verticals';
import { RESIDENTIAL_SERVICES } from '@/lib/residentialServices';

export default function sitemap() {
  const baseUrl = 'https://mcloudconstruction.com';
  const now = new Date();

  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'monthly' },
    { path: '/residential', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/residential/aging-in-place', priority: 0.8, changeFrequency: 'monthly' },
    ...RESIDENTIAL_SERVICES.map(service => ({
      path: `/residential/${service.slug}`,
      priority: 0.8,
      changeFrequency: 'monthly',
    })),
    { path: '/commercial', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/commercial/unit-renovations', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/commercial/interior-remodels', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/commercial/accessible-units', priority: 0.8, changeFrequency: 'monthly' },
    ...PAGE_VERTICALS.map(v => ({ path: `/commercial/${v.slug}`, priority: 0.7, changeFrequency: 'monthly' })),
    { path: '/about', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/faq', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/financing', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/consultation', priority: 0.8, changeFrequency: 'yearly' },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
