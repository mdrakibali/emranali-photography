import { MetadataRoute } from 'next';
import { siteSettings } from '@/data/site-settings';
import { getPhotographs, getJournalArticles, getConservationStories } from '@/lib/data-access';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteSettings.siteUrl;

  const photos = await getPhotographs();
  const articles = await getJournalArticles();
  const conservation = await getConservationStories();

  const staticRoutes = [
    '',
    '/portfolio',
    '/about',
    '/journal',
    '/conservation',
    '/prints',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const photoRoutes = photos.map((p) => ({
    url: `${baseUrl}/photographs/${p.slug}`,
    lastModified: new Date(p.captureDate),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${baseUrl}/journal/${a.slug}`,
    lastModified: new Date(a.publishedDate),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const conservationRoutes = conservation.map((c) => ({
    url: `${baseUrl}/conservation/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...photoRoutes, ...articleRoutes, ...conservationRoutes];
}
