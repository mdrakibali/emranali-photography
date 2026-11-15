'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Photograph } from '@/types/photograph';
import { ArrowUpRight, MapPin, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface FeaturedPhotoSliderProps {
  photographs: Photograph[];
}

export default function FeaturedPhotoSlider({ photographs }: FeaturedPhotoSliderProps) {
  const photos = photographs.slice(0, 8);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Touch swipe coordinates for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Responsive items-per-view: 1 on mobile, 2 on md & lg, 3 on desktop
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerView(1); // Mobile (< 768px): exactly 1 card
      } else if (width < 1280) {
        setItemsPerView(2); // md & lg (768px - 1279px): exactly 2 cards
      } else {
        setItemsPerView(3); // Desktop (>= 1280px): exactly 3 cards
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, photos.length - itemsPerView);

  // Keep currentIndex valid when resizing changes itemsPerView
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, Math.max(0, photos.length - itemsPerView)));
  }, [itemsPerView, photos.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play interval: slides automatically every 4 seconds
  useEffect(() => {
    if (isPaused || photos.length <= itemsPerView) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPaused, nextSlide, photos.length, itemsPerView]);

  // Touch swipe support for smooth mobile interaction
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-dark text-white border-b border-dark-border">
      <div className="site-container space-y-10">
        {/* Section Header with Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-dark-border pb-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase font-sans">
              Curated Series
            </span>
            <h2 className="text-3xl sm:text-4xl text-white font-normal leading-tight font-serif">
              Selected Works
            </h2>
            <p className="text-sm text-muted-foreground font-normal max-w-xl font-sans">
              Moments, encounters, and quiet stories from the northern plains and wetlands.
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-3 self-start sm:self-end">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="cursor-pointer p-2.5 rounded-none bg-white/10 hover:bg-white text-white hover:text-dark border border-white/20 transition-all"
              title={isPaused ? 'Resume auto-slide' : 'Pause auto-slide'}
              aria-label={isPaused ? 'Resume auto-slide' : 'Pause auto-slide'}
            >
              {isPaused ? (
                <Play className="w-4 h-4 fill-current" />
              ) : (
                <Pause className="w-4 h-4 fill-current" />
              )}
            </button>
            <button
              onClick={prevSlide}
              className="cursor-pointer p-2.5 rounded-none bg-white/10 hover:bg-white text-white hover:text-dark border border-white/20 transition-all"
              title="Previous photograph"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="cursor-pointer p-2.5 rounded-none bg-white/10 hover:bg-white text-white hover:text-dark border border-white/20 transition-all"
              title="Next photograph"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-out -mx-3"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                style={{
                  width: `${100 / itemsPerView}%`,
                }}
                className="flex-shrink-0 px-3"
              >
                <div className="group h-full flex flex-col bg-dark-surface border border-dark-border rounded-none overflow-hidden transition-all duration-300">
                  {/* Photo Display with Hover Zoom */}
                  <Link
                    href={`/photographs/${photo.slug}`}
                    className="block relative aspect-[16/10] overflow-hidden bg-black/50 cursor-pointer"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.imageUrl}
                      alt={photo.altText || photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 bg-black/75 backdrop-blur-sm text-white/90 border border-white/15 rounded-none text-[10px] font-medium font-sans">
                        0{index + 1} / 0{photos.length}
                      </span>
                      <span className="px-2 py-0.5 bg-white/90 text-dark rounded-none font-semibold uppercase tracking-wider text-[9px] font-sans">
                        {photo.category}
                      </span>
                    </div>
                  </Link>

                  {/* Editorial Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-medium text-white/60 tracking-wider uppercase block font-sans">
                        {photo.species || 'Wildlife Observation'}
                      </span>
                      <Link
                        href={`/photographs/${photo.slug}`}
                        className="group-hover:text-white/80 transition-colors block"
                      >
                        <h3 className="text-base sm:text-lg text-white font-semibold leading-snug line-clamp-1 font-serif">
                          {photo.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-white/70 line-clamp-2 leading-relaxed font-normal font-sans">
                        {photo.description}
                      </p>
                    </div>

                    {/* Metadata & Explore Link */}
                    <div className="pt-3 border-t border-dark-border flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-white/60 text-[11px] font-sans">
                        <MapPin className="w-3 h-3 text-white/50 flex-shrink-0" />
                        <span className="truncate max-w-[120px]">{photo.location}</span>
                      </div>

                      <Link
                        href={`/photographs/${photo.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:underline transition-colors font-sans"
                      >
                        <span>Explore</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`cursor-pointer h-2 transition-all duration-300 rounded-full ${
                idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/25 hover:bg-white/60'
              }`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
