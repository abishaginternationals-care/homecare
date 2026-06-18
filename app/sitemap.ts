import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://abishaginternationals.com';

  // Core static pages
  const routes = ['', '/about', '/services', '/contact', '/blog', '/careers'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Add individual services manually or fetch them from your data source if dynamic
  const services = [
    '/services/caregiver-services',
    '/services/nursing-services',
    '/services/hospice-care',
    '/services/elderly-daycare',
    '/services/physical-therapy',
    '/services/occupational-therapy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...services];
}
