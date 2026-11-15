'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { HERO_SLIDES, SLIDE_AUTOPLAY_DURATION } from '@/data/hero-slides';
import { useStudio } from '@/context/StudioContext';
import { ChevronLeft, ChevronRight, ArrowUpRight, Pause, Play, MapPin } from 'lucide-react';

export default function HeroSlideshow() {
  const { heroSlides } = useStudio();
  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : HERO_SLIDES;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Guard against index out of bounds
  const safeIndex = currentSlideIndex < slides.length ? currentSlideIndex : 0;
  const activeSlide = slides[safeIndex] || slides[0];

  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const selectSlide = (index: number) => {
    setCurrentSlideIndex(index);
    setProgress(0);
  };

  // Progress Bar and Auto-Slide Timer
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const intervalStep = 50;
    const totalSteps = SLIDE_AUTOPLAY_DURATION / intervalStep;
    let stepCount = 0;

    progressIntervalRef.current = setInterval(() => {
      stepCount += 1;
      setProgress(Math.min((stepCount / totalSteps) * 100, 100));
    }, intervalStep);

    timerRef.current = setTimeout(() => {
      goToNextSlide();
    }, SLIDE_AUTOPLAY_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [safeIndex, isPaused, goToNextSlide]);

  return (
    <section className="relative min-h-screen lg:h-screen w-full overflow-hidden bg-dark flex flex-col justify-end pt-24 sm:pt-28 pb-10 sm:pb-16 lg:pb-20">
      {/* Background Slides with Cross-Fade */}
      {slides.map((slide, index) => {
        const isActive = index === safeIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Real High-Resolution Wildlife Photograph */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.imageUrl}
              alt={slide.altText}
              className={`w-full h-full object-cover object-center transition-transform duration-7000 ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        );
      })}

      {/* Multi-Layer Cinematic Scrims to Ensure 100% Typography Contrast */}
      <div className="absolute inset-0 z-20 bg-linear-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
      <div className="absolute inset-0 z-20 bg-linear-to-r from-black/85 via-black/45 to-transparent pointer-events-none" />

      {/* Main Hero Foreground Content */}
      <div className="relative z-30 site-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left Column: Clean Minimal Typography */}
          <div className="lg:col-span-8 max-w-2xl space-y-5">
            <div className="space-y-1.5">
              <span className="text-xs sm:text-sm font-medium text-white/80 tracking-wide block">
                Wildlife & Nature Photographer
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white leading-[1.02]">
                Emran Ali
              </h1>
            </div>

            <div className="space-y-3">
              <p className="italic text-xl sm:text-2xl text-white/90 font-normal leading-relaxed">
                &ldquo;Finding extraordinary stories in the quiet moments of the natural
                world.&rdquo;
              </p>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal max-w-xl">
                Documenting trans-Himalayan avian flyways, secretive grassland predators, and the
                fleeting winter sunrise of Mount Kanchenjunga across northern Bangladesh.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <Link
                href="/portfolio"
                className="px-7 py-3.5 bg-white text-dark font-semibold hover:bg-neutral-200 transition-colors rounded-none inline-flex items-center gap-2"
              >
                <span>Explore My Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="px-7 py-3.5 bg-dark/80 backdrop-blur-sm text-white font-semibold hover:bg-dark border border-white/30 transition-colors rounded-none"
              >
                Discover My Story
              </Link>
            </div>
          </div>

          {/* Right Column: Slide Information Badge & Controls */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end space-y-4">
            {/* Slide Metadata Card */}
            <div className="w-full lg:w-80 p-4 sm:p-5 rounded-none bg-card/95 backdrop-blur-md border border-border text-card-foreground space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-semibold uppercase tracking-wider">
                  {activeSlide.category}
                </span>
                <span className="text-muted font-medium">
                  0{safeIndex + 1} / 0{slides.length}
                </span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl text-card-foreground font-semibold leading-tight">
                  {activeSlide.title}
                </h2>
                <p className="text-xs text-muted mt-0.5 font-normal">{activeSlide.species}</p>
                <p className="text-xs text-muted mt-1 flex items-center gap-1.5 font-normal">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{activeSlide.location}</span>
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-[2.5px] bg-border rounded-none overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Slide Navigation & Link */}
              <div className="pt-1 flex items-center justify-between text-xs">
                <Link
                  href={`/photographs/${activeSlide.slug}`}
                  className="inline-flex items-center gap-1 text-xs text-card-foreground hover:text-muted-foreground border-b border-card-foreground pb-0.5 transition-colors font-semibold"
                >
                  <span>View Story</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-1.5 rounded-none hover:bg-secondary text-card-foreground transition-colors"
                    title={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
                    aria-label={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
                  >
                    {isPaused ? (
                      <Play className="w-3.5 h-3.5 fill-current" />
                    ) : (
                      <Pause className="w-3.5 h-3.5 fill-current" />
                    )}
                  </button>
                  <button
                    onClick={goToPrevSlide}
                    className="cursor-pointer p-1.5 rounded-none hover:bg-secondary text-card-foreground transition-colors"
                    aria-label="Previous photograph"
                    title="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={goToNextSlide}
                    className="cursor-pointer p-1.5 rounded-none hover:bg-secondary text-card-foreground transition-colors"
                    aria-label="Next photograph"
                    title="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Slide Selector Dots/Pills */}
            <div className="flex items-center gap-2 text-xs">
              {HERO_SLIDES.map((slide, idx) => {
                const isSelected = idx === currentSlideIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => selectSlide(idx)}
                    className={`px-3 py-1.5 rounded-none transition-all ${
                      isSelected
                        ? 'bg-primary text-primary-foreground font-bold scale-105'
                        : 'bg-card/90 backdrop-blur-sm text-card-foreground hover:bg-card border border-border'
                    }`}
                    aria-label={`Jump to slide ${idx + 1}: ${slide.title}`}
                  >
                    0{idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
