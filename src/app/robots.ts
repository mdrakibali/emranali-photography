import { MetadataRoute } from 'next';
import { siteSettings } from '@/data/site-settings';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/'],
    },
    sitemap: `${siteSettings.siteUrl}/sitemap.xml`,
  };
}
