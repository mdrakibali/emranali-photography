'use client';

import React, { useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import { Photograph } from '@/types/photograph';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Info,
  Camera,
  ExternalLink,
} from 'lucide-react';

interface FullscreenLightboxProps {
  photo: Photograph | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  allPhotos?: Photograph[];
  onSelectPhoto?: (photo: Photograph) => void;
}

export default function FullscreenLightbox({
  photo,
  isOpen,
  onClose,
  onNext,
  onPrev,
  allPhotos,
  onSelectPhoto,
}: FullscreenLightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleNextPhoto = useCallback(() => {
    setIsZoomed(false);
    if (onNext) {
      onNext();
    } else if (allPhotos && onSelectPhoto && photo) {
      const currentIndex = allPhotos.findIndex((p) => p.id === photo.id || p.slug === photo.slug);
      if (currentIndex !== -1 && currentIndex < allPhotos.length - 1) {
        onSelectPhoto(allPhotos[currentIndex + 1]);
      } else if (currentIndex === allPhotos.length - 1) {
        onSelectPhoto(allPhotos[0]);
      } else if (currentIndex === -1 && allPhotos.length > 0) {
        onSelectPhoto(allPhotos[0]);
      }
    }
  }, [onNext, allPhotos, onSelectPhoto, photo]);

  const handlePrevPhoto = useCallback(() => {
    setIsZoomed(false);
    if (onPrev) {
      onPrev();
    } else if (allPhotos && onSelectPhoto && photo) {
      const currentIndex = allPhotos.findIndex((p) => p.id === photo.id || p.slug === photo.slug);
      if (currentIndex > 0) {
        onSelectPhoto(allPhotos[currentIndex - 1]);
      } else if (currentIndex === 0) {
        onSelectPhoto(allPhotos[allPhotos.length - 1]);
      } else if (currentIndex === -1 && allPhotos.length > 0) {
        onSelectPhoto(allPhotos[allPhotos.length - 1]);
      }
    }
  }, [onPrev, allPhotos, onSelectPhoto, photo]);

  // Touch Swipe for mobile gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNextPhoto();
      } else {
        handlePrevPhoto();
      }
    }
    setTouchStartX(null);
  };

  // Keyboard navigation & accessibility
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'i' || e.key === 'I') setShowInfo((prev) => !prev);
    },
    [isOpen, onClose, handleNextPhoto, handlePrevPhoto]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !photo) return null;

  const currentIndex = allPhotos
    ? allPhotos.findIndex((p) => p.id === photo.id || p.slug === photo.slug)
    : -1;
  const hasMultiple = Boolean(allPhotos && allPhotos.length > 1);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Fullscreen view of ${photo.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark/95 backdrop-blur-md text-white select-none animate-fadeIn"
    >
      {/* Top Floating Control Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex flex-col max-w-[65%] sm:max-w-none pr-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-white/60 font-sans truncate">
              {photo.category} • {photo.species}
            </span>
            {hasMultiple && currentIndex !== -1 && (
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-white/70 bg-white/10 px-2 py-0.5 rounded-none">
                {String(currentIndex + 1).padStart(2, '0')} /{' '}
                {String(allPhotos!.length).padStart(2, '0')}
              </span>
            )}
          </div>
          <h2 className="text-base sm:text-xl font-normal text-white truncate">{photo.title}</h2>
          <span className="text-xs text-white/60 font-sans">
            {photo.location} — {photo.captureYear}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsZoomed((prev) => !prev)}
            className="p-2 rounded-none hover:bg-white/10 text-white/80 transition-colors cursor-pointer"
            title={isZoomed ? 'Reset Zoom' : 'Zoom In'}
            aria-label={isZoomed ? 'Reset Zoom' : 'Zoom In'}
          >
            {isZoomed ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setShowInfo((prev) => !prev)}
            className={`p-2 rounded-none transition-colors cursor-pointer ${
              showInfo ? 'bg-white text-dark' : 'hover:bg-white/10 text-white/80'
            }`}
            title="Toggle Technical Details & Story (I)"
            aria-label="Toggle Technical Details"
          >
            <Info className="w-5 h-5" />
          </button>

          <button
            onClick={onClose}
            className="cursor-pointer p-2 rounded-none hover:bg-white/10 text-white transition-colors"
            title="Close Lightbox (Esc)"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      {(hasMultiple || Boolean(onPrev)) && (
        <button
          onClick={handlePrevPhoto}
          className="cursor-pointer absolute left-4 z-20 p-3 rounded-none bg-black/50 hover:bg-black/80 text-white transition-all hover:scale-105"
          aria-label="Previous photograph"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {(hasMultiple || Boolean(onNext)) && (
        <button
          onClick={handleNextPhoto}
          className="cursor-pointer absolute right-4 z-20 p-3 rounded-none bg-black/50 hover:bg-black/80 text-white transition-all hover:scale-105"
          aria-label="Next photograph"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Image Viewport with touch swipe support */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`relative w-full h-full flex items-center justify-center p-4 sm:p-12 overflow-hidden ${
          isZoomed ? 'cursor-zoom-out overflow-auto' : 'cursor-zoom-in'
        }`}
        onClick={() => setIsZoomed((prev) => !prev)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.imageUrl}
          alt={photo.altText || photo.title}
          className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
        />
      </div>

      {/* Bottom Floating Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-3 sm:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-xs font-sans">
        <span className="hidden sm:inline text-white/60">
          Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded-none">ESC</kbd> to exit,{' '}
          <kbd className="px-1.5 py-0.5 bg-white/10 rounded-none">I</kbd> for EXIF
        </span>

        <div className="flex items-center gap-4">
          <Link
            href={`/photographs/${photo.slug}`}
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors border-b border-white/40 pb-0.5 font-medium cursor-pointer"
            onClick={onClose}
          >
            <span>View Photograph Story</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={`/prints?photo=${photo.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-dark text-xs font-medium rounded-none transition-colors hover:bg-neutral-200 cursor-pointer"
            onClick={onClose}
          >
            Inquire Print
          </Link>
        </div>
      </div>

      {/* Slide-out Technical & Story Panel */}
      {showInfo && (
        <aside
          className="absolute top-0 right-0 bottom-0 z-40 w-full sm:w-96 bg-dark-surface border-l border-white/15 p-6 sm:p-8 overflow-y-auto text-white/80 animate-slideLeft"
          aria-label="Photograph details and technical specifications"
        >
          <div className="flex items-center justify-between pb-6 border-b border-white/15">
            <h3 className="text-xl text-white">Photograph Details</h3>
            <button
              onClick={() => setShowInfo(false)}
              className="p-1.5 hover:bg-white/10 rounded-none text-white/60 cursor-pointer"
              aria-label="Close information panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <span className="text-xs text-white/60 font-sans font-semibold uppercase tracking-wider">
                Title & Subject
              </span>
              <h4 className="text-2xl text-white mt-1">{photo.title}</h4>
              <p className="text-xs text-white/70 mt-0.5">
                {photo.species} {photo.scientificName && `— ${photo.scientificName}`}
              </p>
            </div>

            <div>
              <span className="text-xs text-white/60 font-sans font-semibold uppercase tracking-wider">
                Field Location
              </span>
              <p className="text-sm font-sans text-white mt-1">{photo.location}</p>
              <p className="text-xs text-white/60">{photo.region}</p>
            </div>

            {/* EXIF Details */}
            <div className="pt-4 border-t border-white/15">
              <span className="inline-flex items-center gap-1.5 text-xs text-white/80 font-sans font-semibold mb-3 uppercase tracking-wider">
                <Camera className="w-3.5 h-3.5" /> Technical Capture Specifications
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs font-sans bg-black/40 p-3.5 rounded-none border border-white/10">
                {photo.exif.camera && (
                  <div>
                    <span className="text-white/50 block text-xs">Camera</span>
                    <span className="text-white font-medium">{photo.exif.camera}</span>
                  </div>
                )}
                {photo.exif.lens && (
                  <div>
                    <span className="text-white/50 block text-xs">Lens</span>
                    <span className="text-white font-medium">{photo.exif.lens}</span>
                  </div>
                )}
                {photo.exif.focalLength && (
                  <div>
                    <span className="text-white/50 block text-xs">Focal Length</span>
                    <span className="text-white font-medium">{photo.exif.focalLength}</span>
                  </div>
                )}
                {photo.exif.aperture && (
                  <div>
                    <span className="text-white/50 block text-xs">Aperture</span>
                    <span className="text-white font-medium">{photo.exif.aperture}</span>
                  </div>
                )}
                {photo.exif.shutterSpeed && (
                  <div>
                    <span className="text-white/50 block text-xs">Shutter</span>
                    <span className="text-white font-medium">{photo.exif.shutterSpeed}</span>
                  </div>
                )}
                {photo.exif.iso && (
                  <div>
                    <span className="text-white/50 block text-xs">ISO</span>
                    <span className="text-white font-medium">{photo.exif.iso}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Behind the Photograph Excerpt */}
            <div className="pt-4 border-t border-white/15">
              <span className="text-xs text-white/60 font-sans font-semibold block mb-2 uppercase tracking-wider">
                Field Narrative Excerpt
              </span>
              <p className="text-xs text-white/80 font-sans leading-relaxed line-clamp-6">
                {photo.story[0]}
              </p>
            </div>

            <div className="pt-6 border-t border-white/15 flex flex-col gap-2.5">
              <Link
                href={`/photographs/${photo.slug}`}
                onClick={onClose}
                className="w-full text-center py-2.5 px-4 bg-white text-dark text-sm font-sans font-medium hover:bg-neutral-200 transition-colors rounded-none cursor-pointer"
              >
                Read Complete Story Page
              </Link>
              <Link
                href={`/prints?photo=${photo.slug}`}
                onClick={onClose}
                className="w-full text-center py-2.5 px-4 border border-white/30 text-white text-sm font-sans hover:bg-white/10 transition-colors rounded-none cursor-pointer"
              >
                Inquire Fine Art Print / License
              </Link>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
