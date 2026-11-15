import { photographsData } from '@/data/photographs';
import { journalArticlesData } from '@/data/journal';
import { conservationStoriesData } from '@/data/conservation';
import { fineArtPrintsData, licensingOptionsData } from '@/data/prints';
import { categoriesData } from '@/data/categories';
import { photographerData } from '@/data/photographer';
import { awardsData } from '@/data/awards';
import { testimonialsData } from '@/data/testimonials';
import { videosData } from '@/data/videos';
import { Photograph, PhotographyCategory } from '@/types/photograph';
import { JournalArticle } from '@/types/journal';
import { ConservationStory } from '@/types/conservation';
import { FineArtPrintItem, LicensingOption } from '@/types/print';
import { PhotographerProfile } from '@/types/photographer';
import { VideoItem } from '@/types/video';

/**
 * Reusable Data-Access Layer
 * Future Phase Compatibility: These asynchronous functions can be transparently
 * modified to query PostgreSQL / Drizzle ORM / Cloudflare D1 without altering the UI components.
 */

// Photograph Queries
export async function getPhotographs(): Promise<Photograph[]> {
  return [...photographsData];
}

export async function getFeaturedPhotographs(): Promise<Photograph[]> {
  return photographsData.filter((p) => p.isFeatured);
}

export async function getPhotographBySlug(slug: string): Promise<Photograph | undefined> {
  return photographsData.find((p) => p.slug === slug);
}

export async function getPhotographsByCategory(
  category: PhotographyCategory
): Promise<Photograph[]> {
  return photographsData.filter((p) => p.category === category);
}

export async function getRelatedPhotographs(
  currentSlug: string,
  limit: number = 3
): Promise<Photograph[]> {
  const current = photographsData.find((p) => p.slug === currentSlug);
  if (!current) return photographsData.slice(0, limit);

  return photographsData
    .filter(
      (p) =>
        p.slug !== currentSlug && (p.category === current.category || p.region === current.region)
    )
    .slice(0, limit);
}

export async function getAdjacentPhotographs(
  currentSlug: string
): Promise<{ prev?: Photograph; next?: Photograph }> {
  const index = photographsData.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return {};

  const prev = index > 0 ? photographsData[index - 1] : photographsData[photographsData.length - 1];
  const next = index < photographsData.length - 1 ? photographsData[index + 1] : photographsData[0];

  return { prev, next };
}

// Category Queries
export async function getCategories() {
  return [...categoriesData];
}

export async function getCategoryById(id: PhotographyCategory) {
  return categoriesData.find((c) => c.id === id);
}

// Journal Queries
export async function getJournalArticles(): Promise<JournalArticle[]> {
  return [...journalArticlesData];
}

export async function getFeaturedJournalArticle(): Promise<JournalArticle> {
  return journalArticlesData[0];
}

export async function getJournalBySlug(slug: string): Promise<JournalArticle | undefined> {
  return journalArticlesData.find((j) => j.slug === slug);
}

export async function getRelatedJournalArticles(
  currentSlug: string,
  limit: number = 2
): Promise<JournalArticle[]> {
  return journalArticlesData.filter((j) => j.slug !== currentSlug).slice(0, limit);
}

// Conservation Queries
export async function getConservationStories(): Promise<ConservationStory[]> {
  return [...conservationStoriesData];
}

export async function getConservationBySlug(slug: string): Promise<ConservationStory | undefined> {
  return conservationStoriesData.find((c) => c.slug === slug);
}

// Print & Licensing Queries
export async function getPrintCollections(): Promise<FineArtPrintItem[]> {
  return [...fineArtPrintsData];
}

export async function getPrintByPhotographSlug(
  slug: string
): Promise<FineArtPrintItem | undefined> {
  return fineArtPrintsData.find((p) => p.photographSlug === slug);
}

export async function getLicensingOptions(): Promise<LicensingOption[]> {
  return [...licensingOptionsData];
}

// Photographer Profile Queries
export async function getPhotographerProfile(): Promise<PhotographerProfile> {
  return { ...photographerData };
}

export async function getAwardsAndRecognition() {
  return { ...awardsData };
}

export async function getTestimonials() {
  return [...testimonialsData];
}

// Video Queries
export async function getVideos(): Promise<VideoItem[]> {
  return [...videosData];
}
