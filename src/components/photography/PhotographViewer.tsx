'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Photograph } from '@/types/photograph';
import FullscreenLightbox from '@/components/photography/FullscreenLightbox';
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotographViewerProps {
  photo: Photograph;
  allPhotos: Photograph[];
  prev?: Photograph;
  next?: Photograph;
}

export default function PhotographViewer({
  photo,
  allPhotos,
  prev: initialPrev,
  next: initialNext,
}: PhotographViewerProps) {
  const router = useRouter();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<Photograph>(photo);

  // Sync state if photo prop changes from external router navigation
  useEffect(() => {
    setCurrentPhoto(photo);
  }, [photo]);

  // Dynamically compute adjacent photos from allPhotos list based on currentPhoto
  const currentIndex = allPhotos.findIndex(
    (p) => p.slug === currentPhoto.slug || p.id === currentPhoto.id
  );

  const currentPrev =
    allPhotos.length > 1
      ? currentIndex > 0
        ? allPhotos[currentIndex - 1]
        : allPhotos[allPhotos.length - 1]
      : initialPrev;

  const currentNext =
    allPhotos.length > 1
      ? currentIndex < allPhotos.length - 1
        ? allPhotos[currentIndex + 1]
        : allPhotos[0]
      : initialNext;

  // Handle switching photo inside the lightbox without closing it
  const handleSelectPhoto = useCallback((newPhoto: Photograph) => {
    setCurrentPhoto(newPhoto);
    // Seamlessly update browser URL bar without unmounting the lightbox
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `/photographs/${newPhoto.slug}`);
    }
  }, []);

  // Sync state if user clicks browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window === 'undefined') return;
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      const slug = pathSegments[pathSegments.length - 1];
      const found = allPhotos.find((p) => p.slug === slug);
      if (found) {
        setCurrentPhoto(found);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [allPhotos]);

  return (
    <>
      <div className="site-container pt-28 pb-20">
        {/* Top Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs text-muted mb-8 pb-4 border-b border-border/60 font-sans">
          <nav className="flex items-center gap-2">
            <Link href="/portfolio" className="hover:text-foreground transition-colors">
              Portfolio
            </Link>
            <span>/</span>
            <Link
              href={`/portfolio?category=${currentPhoto.category}`}
              className="hover:text-foreground transition-colors capitalize"
            >
              {currentPhoto.category}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-50 sm:max-w-none">
              {currentPhoto.title}
            </span>
          </nav>

          {/* Quick Prev / Next Links */}
          <div className="hidden sm:flex items-center gap-4 text-xs font-medium">
            {currentPrev && (
              <Link
                href={`/photographs/${currentPrev.slug}`}
                onClick={() => setCurrentPhoto(currentPrev)}
                className="hover:text-foreground transition-colors flex items-center gap-1"
                title={`Previous: ${currentPrev.title}`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </Link>
            )}
            {currentNext && (
              <Link
                href={`/photographs/${currentNext.slug}`}
                onClick={() => setCurrentPhoto(currentNext)}
                className="hover:text-foreground transition-colors flex items-center gap-1"
                title={`Next: ${currentNext.title}`}
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* 2-Column Fine-Art Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Photograph Display (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-3">
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="group relative cursor-pointer w-full overflow-hidden rounded-none border border-border bg-card transition-all duration-300"
            >
              {/* Main Exhibition Photograph */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentPhoto.imageUrl}
                alt={currentPhoto.altText || currentPhoto.title}
                className="w-full h-auto object-cover max-h-[75vh]"
              />

              {/* Inspect Fullscreen Overlay Button */}
              <button
                type="button"
                className="cursor-pointer absolute bottom-4 right-4 bg-black/80 hover:bg-black text-white text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-none backdrop-blur-sm flex items-center gap-1.5 transition-all duration-200 group-hover:scale-105"
              >
                <Maximize2 className="w-3 h-3 text-white/80" />
                <span>INSPECT FULLSCREEN</span>
              </button>
            </div>

            <p className="text-[11px] text-muted font-normal pt-1 px-1">
              Field location: {currentPhoto.location} — Documented by Emran Ali (Fine-Art Wildlife
              &amp; Nature Photography)
            </p>
          </div>

          {/* Right Column: Editorial Details, Metadata Table & CTAs (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-7">
            {/* Header Titles */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-widest block">
                {currentPhoto.category} Collection
              </span>
              <h1 className="text-3xl sm:text-4xl text-foreground font-normal leading-tight">
                {currentPhoto.title}
              </h1>
              <p className="italic text-sm sm:text-base text-muted font-light leading-relaxed pt-1">
                {currentPhoto.description}
              </p>
            </div>

            {/* Clean Structured Metadata Table */}
            <div className="border-t border-b border-border divide-y divide-border text-xs font-sans">
              <div className="grid grid-cols-12 py-2.5">
                <span className="col-span-5 sm:col-span-4 uppercase tracking-wider text-[10px] font-semibold text-muted">
                  SUBJECT
                </span>
                <span className="col-span-7 sm:col-span-8 text-foreground font-medium">
                  {currentPhoto.species}{' '}
                  {currentPhoto.scientificName && `(${currentPhoto.scientificName})`}
                </span>
              </div>

              <div className="grid grid-cols-12 py-2.5">
                <span className="col-span-5 sm:col-span-4 uppercase tracking-wider text-[10px] font-semibold text-muted">
                  LOCATION
                </span>
                <span className="col-span-7 sm:col-span-8 text-foreground font-medium">
                  {currentPhoto.location}
                </span>
              </div>

              <div className="grid grid-cols-12 py-2.5">
                <span className="col-span-5 sm:col-span-4 uppercase tracking-wider text-[10px] font-semibold text-muted">
                  CAPTURED
                </span>
                <span className="col-span-7 sm:col-span-8 text-foreground font-medium">
                  {currentPhoto.captureDate}
                </span>
              </div>

              <div className="grid grid-cols-12 py-2.5">
                <span className="col-span-5 sm:col-span-4 uppercase tracking-wider text-[10px] font-semibold text-muted">
                  CAMERA &amp; LENS
                </span>
                <span className="col-span-7 sm:col-span-8 text-foreground font-medium">
                  {currentPhoto.exif.camera || 'Pro Mirrorless Body'} /{' '}
                  {currentPhoto.exif.lens || 'Telephoto Prime'}
                </span>
              </div>

              <div className="grid grid-cols-12 py-2.5">
                <span className="col-span-5 sm:col-span-4 uppercase tracking-wider text-[10px] font-semibold text-muted">
                  EXPOSURE
                </span>
                <span className="col-span-7 sm:col-span-8 text-foreground font-medium">
                  {currentPhoto.exif.shutterSpeed || '1/400s'} •{' '}
                  {currentPhoto.exif.aperture || 'f/5.6'} • ISO {currentPhoto.exif.iso || '100'}
                </span>
              </div>

              <div className="grid grid-cols-12 py-2.5">
                <span className="col-span-5 sm:col-span-4 uppercase tracking-wider text-[10px] font-semibold text-muted">
                  AVAILABILITY
                </span>
                <span className="col-span-7 sm:col-span-8 text-foreground font-medium">
                  Rights-Managed Licensing • Archival Print Inquiry
                </span>
              </div>
            </div>

            {/* Behind the Photograph Narrative */}
            <div className="space-y-3 pt-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted block">
                BEHIND THE PHOTOGRAPH
              </span>
              <div className="space-y-3 text-xs sm:text-sm text-foreground/85 leading-relaxed font-normal">
                {currentPhoto.story.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {currentPhoto.fieldNotes && (
                <div className="mt-4 p-3.5 bg-secondary border-l-2 border-primary text-xs text-foreground">
                  <span className="font-semibold text-foreground block text-[10px] uppercase tracking-wider mb-0.5">
                    Field Protocol Note
                  </span>
                  {currentPhoto.fieldNotes}
                </div>
              )}
            </div>

            {/* Commercial Inquiries & Action Buttons */}
            <div className="space-y-3 pt-3">
              <Link
                href={`/contact?type=licensing&subject=${encodeURIComponent(currentPhoto.title)}`}
                className="w-full py-3.5 bg-primary hover:bg-neutral-800 text-primary-foreground text-xs font-semibold uppercase tracking-wider text-center rounded-none transition-colors block cursor-pointer"
              >
                LICENSE THIS IMAGE &rarr;
              </Link>
              <Link
                href={`/prints?photo=${currentPhoto.slug}`}
                className="w-full py-3.5 border border-border hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-semibold uppercase tracking-wider text-center rounded-none transition-colors block cursor-pointer"
              >
                INQUIRE ABOUT FINE-ART PRINTS
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Adjacent Navigation Bar */}
        <div className="mt-20 pt-8 border-t border-border flex items-center justify-between text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground">
          {currentPrev ? (
            <Link
              href={`/photographs/${currentPrev.slug}`}
              onClick={() => setCurrentPhoto(currentPrev)}
              className="hover:text-muted transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">PREVIOUS PHOTOGRAPH</span>
              <span className="sm:hidden">PREVIOUS</span>
            </Link>
          ) : (
            <div />
          )}

          {currentNext ? (
            <Link
              href={`/photographs/${currentNext.slug}`}
              onClick={() => setCurrentPhoto(currentNext)}
              className="hover:text-muted transition-colors flex items-center gap-2"
            >
              <span className="hidden sm:inline">NEXT PHOTOGRAPH</span>
              <span className="sm:hidden">NEXT</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      <FullscreenLightbox
        photo={currentPhoto}
        allPhotos={allPhotos}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onSelectPhoto={handleSelectPhoto}
      />
    </>
  );
}
