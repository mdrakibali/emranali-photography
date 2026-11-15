'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Photograph } from '@/types/photograph';
import FullscreenLightbox from '@/components/photography/FullscreenLightbox';
import { ArrowUpRight, Camera } from 'lucide-react';

interface GalleryGridProps {
  initialPhotos: Photograph[];
  initialCategory?: string;
  showCategoryFilters?: boolean;
}

export default function EditorialGalleryGrid({
  initialPhotos,
  initialCategory = 'all',
  showCategoryFilters = true,
}: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [activePhotoForLightbox, setActivePhotoForLightbox] = useState<Photograph | null>(null);

  const categories = [
    { id: 'all', label: 'ALL' },
    { id: 'birds', label: 'BIRDS' },
    { id: 'wildlife', label: 'WILDLIFE' },
    { id: 'nature', label: 'NATURE & LANDSCAPES' },
    { id: 'macro', label: 'MACRO PHOTOGRAPHY' },
  ];

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'all') return initialPhotos;
    return initialPhotos.filter((p) => p.category === selectedCategory);
  }, [initialPhotos, selectedCategory]);

  return (
    <section className="w-full">
      {/* Category Filter Navigation (Rectangular Editorial Tabs matching design spec) */}
      {showCategoryFilters && (
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 py-6 border-b border-border mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`cursor-pointer px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.08em] transition-all duration-200 rounded-none ${
                  isActive
                    ? 'bg-primary text-primary-foreground border border-primary '
                    : 'bg-card text-foreground border border-border hover:border-foreground'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Asymmetric Staggered Editorial Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
        {filteredPhotos.map((photo, index) => {
          const getAspectClass = (ratio: string, idx: number) => {
            if (ratio === 'portrait') return 'aspect-[3/4]';
            if (ratio === 'panoramic') return 'aspect-[16/9]';
            if (ratio === 'square') return 'aspect-square';
            return idx % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[3/2]';
          };

          return (
            <div
              key={photo.id}
              className="break-inside-avoid group relative overflow-hidden bg-card border border-border rounded-none transition-all duration-500"
            >
              {/* Image Container with Hover Scale */}
              <div
                className={`relative w-full overflow-hidden cursor-pointer ${getAspectClass(
                  photo.aspectRatio,
                  index
                )}`}
                onClick={() => setActivePhotoForLightbox(photo)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.imageUrl}
                  alt={photo.altText}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* Subtle Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-xs font-sans text-white/70 font-medium">
                    {photo.location}
                  </span>
                  <h3 className="text-xl sm:text-2xl text-white font-normal leading-snug mt-0.5">
                    {photo.title}
                  </h3>
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/20 text-xs font-sans text-white/80">
                    <span className="italic opacity-85">{photo.species}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium hover:text-white">
                      Expand Lightbox <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Minimal Editorial Caption */}
              <div className="p-4 sm:p-5 flex items-start justify-between bg-card border-t border-border">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-foreground font-sans font-semibold uppercase tracking-wider">
                      {photo.category}
                    </span>
                    <span className="text-muted/40">•</span>
                    <span className="text-xs text-muted font-sans">{photo.captureYear}</span>
                  </div>
                  <Link
                    href={`/photographs/${photo.slug}`}
                    className="text-lg text-foreground group-hover:text-muted transition-colors block leading-tight font-medium"
                  >
                    {photo.title}
                  </Link>
                  <p className="text-xs text-muted font-sans">{photo.location}</p>
                </div>

                <Link
                  href={`/photographs/${photo.slug}`}
                  className="p-2 text-muted hover:text-foreground transition-colors"
                  title="View Dedicated Photograph Page"
                  aria-label={`View dedicated page for ${photo.title}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="py-24 text-center">
          <Camera className="w-8 h-8 text-muted mx-auto mb-3 opacity-60" />
          <p className="text-xl text-foreground">No photographs found in this category.</p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="mt-4 text-sm font-sans font-medium text-foreground border-b border-foreground pb-0.5"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Lightbox Modal with Full Gallery Next / Previous Support */}
      <FullscreenLightbox
        photo={activePhotoForLightbox}
        isOpen={Boolean(activePhotoForLightbox)}
        allPhotos={filteredPhotos}
        onSelectPhoto={(photo) => setActivePhotoForLightbox(photo)}
        onClose={() => setActivePhotoForLightbox(null)}
      />
    </section>
  );
}
