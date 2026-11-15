import React from 'react';
import Link from 'next/link';
import {
  getFeaturedPhotographs,
  getCategories,
  getFeaturedJournalArticle,
  getConservationStories,
  getAwardsAndRecognition,
  getPhotographerProfile,
  getVideos,
} from '@/lib/data-access';
import HeroSlideshow from '@/components/photography/HeroSlideshow';
import FeaturedPhotoSlider from '@/components/gallery/FeaturedPhotoSlider';
import VideoSection from '@/components/video/VideoSection';
import NewsletterForm from '@/components/forms/NewsletterForm';
import { ArrowUpRight, Award } from 'lucide-react';

export default async function HomePage() {
  const featuredPhotos = await getFeaturedPhotographs();
  const categories = await getCategories();
  const featuredJournal = await getFeaturedJournalArticle();
  const conservationStories = await getConservationStories();
  const recognition = await getAwardsAndRecognition();
  const photographer = await getPhotographerProfile();
  const videos = await getVideos();

  const primaryConservation = conservationStories[0];

  return (
    <div className="w-full">
      {/* SECTION 02: DYNAMIC AUTO-SLIDING CINEMATIC HERO (Dark Photographic) */}
      <HeroSlideshow />

      {/* SECTION 03: PHOTOGRAPHER INTRODUCTION (Light) */}
      <section className="py-24 sm:py-32 bg-background border-b border-border">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Real Professional Photographer Portrait with Camera */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] bg-secondary overflow-hidden rounded-none border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photographer.portraitImage}
                  alt="Emran Ali — Wildlife and Nature Photographer with camera in the field"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-xs text-white/80 font-medium block font-sans uppercase tracking-wider">
                    Naturalist & Field Lead
                  </span>
                  <h3 className="text-3xl text-white mt-0.5">Emran Ali</h3>
                  <p className="text-xs text-white/70 font-sans">
                    Wildlife & Nature Photographer — Thakurgaon
                  </p>
                </div>
              </div>
            </div>

            {/* Editorial Biography Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-sans text-muted font-medium tracking-wider uppercase">
                Behind the Lens
              </span>

              <div className="space-y-1">
                <h2 className="text-3xl sm:text-5xl text-foreground font-normal leading-tight">
                  A Life Dedicated to the Natural World
                </h2>
                <p className="text-sm font-sans text-muted font-medium pt-1">
                  Emran Ali • Wildlife & Nature Photographer
                </p>
              </div>

              <p className="italic text-xl text-muted font-light leading-relaxed">
                &ldquo;Nature does not reveal her secrets to the hurried. She demands surrender,
                patience, and a quiet reverence.&rdquo;
              </p>

              <div className="space-y-4 text-sm text-foreground/85 font-sans leading-relaxed">
                <p>
                  Based in Thakurgaon, northern Bangladesh, <strong>Emran Ali</strong> documents the
                  region&apos;s wildlife, seasonal bird migrations, and northern landscapes.
                </p>
                <p>
                  From the scrublands where Bengal foxes roam to the seasonal dawn views of Mount
                  Kanchenjunga across northern tea gardens, his work focuses on quiet, patient
                  observations of the natural world.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-foreground border-b-2 border-foreground pb-1 hover:text-foreground/75 transition-colors"
                >
                  <span>Explore Emran&apos;s Story & Field Philosophy</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: FEATURED PHOTOGRAPHY AUTO-SLIDER (Dark #181916) */}
      <div id="selected-works">
        <FeaturedPhotoSlider photographs={featuredPhotos} />
      </div>

      {/* SECTION 05: PHOTOGRAPHY CATEGORIES (Light) */}
      <section className="py-24 sm:py-32 bg-secondary border-b border-border">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-sans text-muted font-medium tracking-wider uppercase">
              Curated Collections
            </span>
            <h2 className="text-3xl sm:text-5xl text-foreground font-normal">
              A World Beyond The Ordinary
            </h2>
            <p className="text-sm text-muted font-sans leading-relaxed">
              Explore four foundational dimensions of biodiversity and landscape across the northern
              plains and wetlands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/portfolio?category=${cat.id}`}
                className="group relative flex flex-col bg-card overflow-hidden transition-all duration-500 rounded-none border border-border"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.coverImage}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-transparent to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-sans text-white/80">{cat.subtitle}</span>
                    <h3 className="text-2xl text-white mt-0.5">{cat.title}</h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-muted font-sans leading-relaxed">{cat.description}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-border text-xs font-sans font-medium text-foreground group-hover:text-foreground/75 transition-colors">
                    <span>{cat.count} Photographs</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 06: VIDEO & MOTION FIELD RECORDINGS (Dark #181916) */}
      <VideoSection videos={videos} />

      {/* SECTION 07: FEATURED JOURNAL STORY (Light) */}
      <section className="py-24 sm:py-32 bg-background text-foreground border-b border-border">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-sans text-muted font-medium tracking-wider uppercase">
                Field Notes
              </span>

              <h2 className="text-3xl sm:text-5xl text-foreground font-normal leading-tight">
                Every Photograph Has a Story
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-muted font-sans">
                  <span>{featuredJournal.location}</span>
                  <span>•</span>
                  <span>{featuredJournal.publishedDate}</span>
                  <span>•</span>
                  <span>{featuredJournal.readTime}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl text-foreground font-semibold">
                  {featuredJournal.title}
                </h3>

                <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                  {featuredJournal.excerpt}
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href={`/journal/${featuredJournal.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground text-sm font-sans font-medium hover:bg-neutral-800 transition-colors rounded-none"
                >
                  <span>Read Field Essay</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <Link
                href={`/journal/${featuredJournal.slug}`}
                className="group block relative aspect-[4/3] bg-secondary overflow-hidden rounded-none border border-border"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredJournal.coverImage}
                  alt={featuredJournal.altText}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 08: CONSERVATION PREVIEW (Light) */}
      <section className="py-24 sm:py-32 bg-secondary border-b border-border">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative aspect-[3/2] bg-background overflow-hidden rounded-none border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={primaryConservation.coverImage}
                  alt={primaryConservation.altText}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <span className="text-xs font-sans text-muted font-medium tracking-wider uppercase">
                Beyond Photography
              </span>

              <h2 className="text-3xl sm:text-5xl text-foreground font-normal leading-tight">
                Protecting the Beauty We Capture
              </h2>

              <p className="italic text-lg text-muted font-light leading-relaxed">
                {primaryConservation.subtitle}
              </p>

              <p className="text-sm text-foreground/80 font-sans leading-relaxed">
                {primaryConservation.summary}
              </p>

              <div className="pt-2">
                <Link
                  href="/conservation"
                  className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-foreground border-b-2 border-foreground pb-1 hover:text-foreground/75 transition-colors"
                >
                  <span>Explore Conservation Stories</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 09: ARTISTIC PHILOSOPHY / ABOUT PREVIEW (Light) */}
      <section className="py-24 sm:py-32 bg-background border-b border-border">
        <div className="site-container text-center space-y-8">
          <span className="text-xs font-sans text-muted font-medium tracking-wider uppercase">
            Artistic Philosophy
          </span>

          <h2 className="text-3xl sm:text-5xl text-foreground font-normal max-w-3xl mx-auto leading-tight">
            Behind Every Frame, There Is a Story.
          </h2>

          <p className="italic text-xl sm:text-2xl text-muted max-w-2xl mx-auto font-light leading-relaxed">
            &ldquo;{photographer.philosophy.quote}&rdquo;
          </p>

          <p className="text-sm text-foreground/80 font-sans leading-relaxed max-w-2xl mx-auto">
            Every photograph is made with patience and a quiet respect for natural habitats —
            observing wildlife from a natural distance without baiting or disturbance.
          </p>

          <div className="pt-4">
            <Link
              href="/about"
              className="inline-block px-7 py-3.5 bg-primary text-primary-foreground text-sm font-sans font-medium hover:bg-neutral-800 transition-colors rounded-none"
            >
              Read The Full Biography
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 10: RECOGNITION (Light) */}
      <section className="py-20 bg-secondary border-b border-border">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-sans text-muted font-medium tracking-wider uppercase">
              Recognition & Honors
            </span>
            <h2 className="text-3xl text-foreground font-normal">Exhibitions & Accolades</h2>
            <p className="text-xs text-muted font-sans italic">{recognition.disclaimer}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recognition.items.map((item) => (
              <div
                key={item.id}
                className="p-6 bg-card border border-border rounded-none space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-foreground font-sans">
                  <span className="font-semibold">{item.year}</span>
                  <Award className="w-4 h-4 opacity-70" />
                </div>
                <h3 className="text-lg text-foreground leading-snug">{item.title}</h3>
                <p className="text-xs text-muted font-sans">{item.organization}</p>
                <span className="inline-block text-xs text-muted bg-secondary px-2 py-0.5 rounded-none border border-border/60">
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: PRINTS & LICENSING CTA (Dark #181916) */}
      <section className="py-24 sm:py-32 bg-dark text-white text-center border-b border-dark-border">
        <div className="site-container space-y-6">
          <span className="text-xs font-sans text-white/60 font-medium tracking-wider uppercase">
            Fine Art & Licensing
          </span>

          <h2 className="text-3xl sm:text-5xl text-white font-normal leading-tight max-w-3xl mx-auto">
            Bring the Beauty of the Wild Into Your World.
          </h2>

          <p className="text-sm text-white/70 font-sans leading-relaxed max-w-xl mx-auto">
            Limited-edition archival pigment prints on 100% cotton rag paper, hand-signed and
            numbered. High-resolution image licensing available for editorial, book publishing, and
            commercial campaigns.
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-sm font-sans">
            <Link
              href="/prints"
              className="px-8 py-4 bg-white text-dark font-semibold hover:bg-neutral-200 transition-colors rounded-none"
            >
              Explore Prints & Licensing
            </Link>
            <Link
              href="/contact?type=licensing"
              className="px-8 py-4 border border-white/40 text-white hover:bg-white/10 transition-colors rounded-none"
            >
              Inquire Image Rights
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 12: NEWSLETTER (Light) */}
      <section className="py-24 bg-background">
        <div className="site-container">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="text-xs font-sans text-muted font-medium tracking-wider uppercase">
              Letters from the Wild
            </span>

            <h2 className="text-3xl sm:text-4xl text-foreground font-normal">
              Subscribe to Field Dispatches
            </h2>

            <p className="text-sm text-muted font-sans max-w-md mx-auto">
              Occasional essays on avian biology, behind-the-lens anecdotes, and early notification
              of limited fine-art print releases.
            </p>

            <div className="pt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
