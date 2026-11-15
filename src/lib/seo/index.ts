import { siteSettings } from '@/data/site-settings';
import { Photograph } from '@/types/photograph';
import { JournalArticle } from '@/types/journal';

export function constructMetadata({
  title,
  description = siteSettings.defaultDescription,
  image = '/og-image.jpg',
  type = 'website',
  slug = '',
}: {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  slug?: string;
}) {
  const fullTitle = title
    ? `${title} | ${siteSettings.photographerName} — Wildlife Photography`
    : `${siteSettings.photographerName} | Wildlife & Nature Photographer`;

  const canonicalUrl = `${siteSettings.siteUrl}${slug ? `/${slug}` : ''}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteSettings.siteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteSettings.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || siteSettings.siteName,
        },
      ],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteSettings.photographerName,
    jobTitle: 'Wildlife & Nature Photographer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Thakurgaon',
      addressRegion: 'Rangpur Division',
      addressCountry: 'Bangladesh',
    },
    url: siteSettings.siteUrl,
    sameAs: [
      siteSettings.social.instagram,
      siteSettings.social.fiveHundredPx,
      siteSettings.social.natGeo,
    ],
  };
}

export function generatePhotographSchema(photo: Photograph) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: photo.title,
    caption: photo.description,
    contentUrl: photo.imageUrl,
    datePublished: photo.captureDate,
    creator: {
      '@type': 'Person',
      name: siteSettings.photographerName,
    },
    contentLocation: {
      '@type': 'Place',
      name: photo.location,
    },
  };
}

export function generateArticleSchema(article: JournalArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.publishedDate,
    author: {
      '@type': 'Person',
      name: siteSettings.photographerName,
    },
    publisher: {
      '@type': 'Person',
      name: siteSettings.photographerName,
    },
  };
}
