import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://abishaginternationals.com';

  // Core static pages
  const routes = [
    '', '/about', '/services', '/contact', '/blog', '/careers',
    '/privacy', '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Individual service pages
  const services = [
    '/services/caregiver-services',
    '/services/nursing-services',
    '/services/hospice-care',
    '/services/dementia-care',
    '/services/allied-health-visit',
    '/services/nurse-visit',
    '/services/geriatric-care',
    '/services/palliative-care',
    '/services/medical-equipment',
    '/services/icu-setup',
    '/services/care-coordination',
    '/services/lab-sample-collection',
    '/services/pharmacy-delivery',
    '/services/dietician-consultation',
    '/services/mental-health-counseling',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...services];
}
