'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { Photograph } from '@/types/photograph';
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react';

interface HorizontalScrollGalleryProps {
  photographs: Photograph[];
}

export default function HorizontalScrollGallery({ photographs }: HorizontalScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const [isMobileOrReduced, setIsMobileOrReduced] = useState(false);

  // Curated master photographs
  const displayPhotos = photographs.slice(0, 6);

  // Check mobile viewport (< 768px) and user's prefers-reduced-motion preference
  useEffect(() => {
    const checkPreference = () => {
      const isSmall = window.innerWidth < 768;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsMobileOrReduced(isSmall || prefersReduced);
    };

    checkPreference();
    window.addEventListener('resize', checkPreference);
    return () => window.removeEventListener('resize', checkPreference);
  }, []);

  // --------------------------------------------------------------------------
  // PRECISE 1:1 PINNED SCROLL CONTROLLER
  // 1. Starts translating horizontally the exact moment container pins at top: 0
  // 2. Translates horizontally until the final photograph settles in full view
  // 3. Immediately releases into vertical scroll with zero trailing blank space
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (isMobileOrReduced) return;

    let rafId: number;

    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;
      const container = containerRef.current;
      const track = trackRef.current;

      const rect = container.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Exact horizontal distance needed to bring the last photo into view
      const maxTranslate = Math.max(0, track.scrollWidth - viewportWidth);
      const totalScrollable = rect.height - viewportHeight;

      if (totalScrollable <= 0) {
        track.style.transform = 'translate3d(0, 0, 0)';
        if (progressFillRef.current) progressFillRef.current.style.width = '100%';
        return;
      }

      // scrollOffset: 0 when container top hits viewport top; totalScrollable when finished
      const scrollOffset = Math.min(Math.max(-rect.top, 0), totalScrollable);
      const progress = scrollOffset / totalScrollable;

      // 1:1 hardware-accelerated translation
      const currentX = -(progress * maxTranslate);
      track.style.transform = `translate3d(${currentX}px, 0, 0)`;

      // Update bottom progress indicator
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${progress * 100}%`;
      }
    };

    const updateDimensions = () => {
      if (!containerRef.current || !trackRef.current) return;
      const track = trackRef.current;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const maxTranslate = Math.max(0, track.scrollWidth - viewportWidth);

      // Section height is EXACTLY viewportHeight + maxTranslate
      // This gives an exact 1:1 ratio: 1px vertical scroll = 1px horizontal translation
      // When the last photograph reaches the end, the container immediately unpins!
      containerRef.current.style.height = `${viewportHeight + maxTranslate}px`;
      handleScroll();
    };

    updateDimensions();

    // Use ResizeObserver for accurate track measurements when fonts/images load
    const ro = new ResizeObserver(() => {
      updateDimensions();
    });
    if (trackRef.current) {
      ro.observe(trackRef.current);
    }

    const onScrollThrottled = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScrollThrottled, { passive: true });
    window.addEventListener('resize', updateDimensions);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('scroll', onScrollThrottled);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [isMobileOrReduced]);

  // --------------------------------------------------------------------------
  // MOBILE / REDUCED-MOTION VIEW:
  // Clean horizontal swipe without cluttering headers or trapping vertical scroll
  // --------------------------------------------------------------------------
  if (isMobileOrReduced) {
    return (
      <section className="py-12 px-6 bg-[#181916] text-warm-100 border-y border-white/10">
        <div className="site-container">
          {/* Touch-Friendly Horizontal Swipe Track */}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-none">
            {displayPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="flex-shrink-0 snap-center w-[78vw] sm:w-[50vw] max-w-[320px] flex flex-col bg-[#20221E] border border-white/15 rounded-none overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.imageUrl}
                    alt={photo.altText || photo.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-sm px-2 py-0.5 text-[10px] text-warm-200 rounded-none">
                    0{index + 1} / 0{displayPhotos.length}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-medium text-foreground tracking-wide uppercase block">
                      {photo.species || photo.category}
                    </span>
                    <h3 className="text-sm text-white font-semibold mt-1 leading-snug line-clamp-1">
                      {photo.title}
                    </h3>
                    <div className="flex items-center gap-2.5 text-[11px] text-warm-300/80 mt-1.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-foreground" />
                        <span className="truncate max-w-[130px]">{photo.location}</span>
                      </span>
                      <span>•</span>
                      <span>{photo.captureYear}</span>
                    </div>
                  </div>

                  <Link
                    href={`/photographs/${photo.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-warm-100 hover:text-foreground transition-colors pt-2 border-t border-white/10"
                  >
                    <span>View Story</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // DESKTOP PINNED VERTICAL-TO-HORIZONTAL SCROLL VIEW:
  // Minimalist, pure photography presentation. Zero clutter, zero trailing blank space.
  // --------------------------------------------------------------------------
  return (
    <section ref={containerRef} className="relative bg-[#181916] text-warm-100">
      {/* Pinned Fullscreen Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center relative">
        {/* Horizontally Translated Gallery Track (Compact & Sleek Photo Cards) */}
        <div className="relative w-full overflow-hidden py-4">
          <div
            ref={trackRef}
            style={{ willChange: 'transform' }}
            className="flex items-stretch gap-6 px-10 sm:px-16 w-max"
          >
            {displayPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="group flex-shrink-0 w-[300px] sm:w-[320px] md:w-[340px] flex flex-col bg-[#20221E] border border-white/15 rounded-none overflow-hidden transition-all duration-300"
              >
                {/* Photo Display with Hover Zoom */}
                <Link
                  href={`/photographs/${photo.slug}`}
                  className="block relative aspect-[16/10] overflow-hidden bg-black/60 cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.imageUrl}
                    alt={photo.altText || photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm text-warm-200 border border-white/15 rounded-none text-[10px] font-medium">
                      0{index + 1} / 0{displayPhotos.length}
                    </span>
                    <span className="px-2 py-0.5 bg-foreground/80 backdrop-blur-sm text-foreground border border-foreground/30 rounded-none font-semibold uppercase tracking-wider text-[9px]">
                      {photo.category}
                    </span>
                  </div>
                </Link>

                {/* Photo Editorial Metadata */}
                <div className="p-4 space-y-2 bg-[#20221E] flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-foreground tracking-wider uppercase block">
                      {photo.species || 'Wildlife Observation'}
                    </span>
                    <Link
                      href={`/photographs/${photo.slug}`}
                      className="group-hover:text-foreground transition-colors block"
                    >
                      <h3 className="text-sm sm:text-base text-white font-semibold leading-snug line-clamp-1">
                        {photo.title}
                      </h3>
                    </Link>
                    <p className="text-[11px] text-warm-200/80 line-clamp-2 leading-relaxed font-normal">
                      {photo.description}
                    </p>
                  </div>

                  {/* Location & Year */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-warm-300/80">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-foreground flex-shrink-0" />
                      <span className="truncate max-w-[130px]">{photo.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-foreground flex-shrink-0" />
                      <span>{photo.captureYear}</span>
                    </div>
                  </div>

                  {/* Explore Story Link */}
                  <div className="pt-1">
                    <Link
                      href={`/photographs/${photo.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-warm-100 group-hover:text-foreground transition-colors"
                    >
                      <span>Explore Photograph</span>
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal Bottom Progress Line */}
        <div className="absolute bottom-6 left-10 sm:left-16 right-10 sm:right-16 z-20">
          <div className="w-full h-[2px] bg-white/15 rounded-none -full overflow-hidden">
            <div
              ref={progressFillRef}
              className="h-full bg-foreground rounded-none -full transition-none"
              style={{ width: '0%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
