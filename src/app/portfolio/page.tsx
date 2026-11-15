import React from 'react';
import type { Metadata } from 'next';
import { getPhotographs } from '@/lib/data-access';
import EditorialGalleryGrid from '@/components/gallery/EditorialGalleryGrid';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Portfolio — Complete Wildlife & Nature Archive',
  description:
    'Explore selected avian chronicles, Bengal foxes, northern landscapes of Panchagarh and Thakurgaon, and macro flora by Emran Ali.',
  slug: 'portfolio',
});

interface PortfolioPageProps {
  searchParams?: {
    category?: string;
  };
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const photos = await getPhotographs();
  const initialCategory = searchParams?.category || 'all';

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-background min-h-screen">
      <div className="site-container">
        {/* Editorial Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <span className="text-xs font-sans text-muted font-semibold tracking-wide uppercase">
            Photographic Archive
          </span>
          <h1 className="text-4xl sm:text-6xl text-foreground font-normal">
            The Living Wilderness
          </h1>
          <p className="italic text-lg sm:text-xl text-muted font-light leading-relaxed">
            &ldquo;Every frame represents hours of quiet waiting — observing the natural rhythms of
            avian migrants, secretive predators, and the fleeting Himalayan horizons of northern
            Bengal.&rdquo;
          </p>
          <p className="text-sm text-foreground/70 font-sans leading-relaxed">
            Click on any photograph to open the fullscreen high-resolution lightbox with technical
            EXIF specifications, or navigate into the dedicated story page.
          </p>
        </div>

        {/* Full Interactive Editorial Gallery with Category Filtering */}
        <EditorialGalleryGrid
          initialPhotos={photos}
          initialCategory={initialCategory}
          showCategoryFilters={true}
        />
      </div>
    </div>
  );
}
