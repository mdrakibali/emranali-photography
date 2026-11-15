import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getJournalArticles, getFeaturedJournalArticle } from '@/lib/data-access';
import { constructMetadata } from '@/lib/seo';
import { ArrowUpRight, Clock, Compass, MapPin } from 'lucide-react';
import JournalGridWithFilter from '@/components/journal/JournalGridWithFilter';

export const metadata: Metadata = constructMetadata({
  title: 'Journal & Field Notes — Wildlife Essays & Expeditions',
  description:
    'Read field journals, avian tracking chronicles, and photography essays by Emran Ali from northern Bangladesh and beyond.',
  slug: 'journal',
});

export default async function JournalPage() {
  const articles = await getJournalArticles();
  const featured = await getFeaturedJournalArticle();

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-background min-h-screen">
      <div className="site-container">
        {/* Magazine Editorial Masthead */}
        <div className="border-b border-border pb-8 mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-muted pb-4 border-b border-border/60">
            <span className="uppercase tracking-[0.25em] text-foreground font-semibold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>THE NATURALIST&apos;S CHRONICLE • VOL. IV</span>
            </span>
            <span className="hidden sm:inline-block tracking-wider">
              Field Notes from Thakurgaon, Panchagarh & Sundarbans
            </span>
          </div>

          <div className="pt-8 max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-6xl text-foreground font-normal leading-tight">
              Field Notes & Dispatches
            </h1>
            <p className="italic text-lg sm:text-xl text-muted font-light leading-relaxed">
              &ldquo;Beyond the frame lies the slow, meditative process of being present in the wild
              — the sounds of river fog, the patience of tracking footprints, and the lessons of
              nature.&rdquo;
            </p>
          </div>
        </div>

        {/* Featured Magazine Cover Story */}
        <div className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-muted block mb-4">
            FEATURED DISPATCH
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-card border border-border rounded-none overflow-hidden transition-all duration-500">
            <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto overflow-hidden bg-secondary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.coverImage}
                alt={featured.altText}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-dark/75 backdrop-blur-md px-3 py-1 text-[11px] text-white font-sans tracking-widest uppercase rounded-none flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{featured.location}</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-sans text-muted">
                  <span className="text-foreground font-semibold uppercase tracking-wider">
                    {featured.category}
                  </span>
                  <span>•</span>
                  <span>{featured.publishedDate}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl text-foreground leading-tight">
                  <Link
                    href={`/journal/${featured.slug}`}
                    className="hover:text-muted transition-colors"
                  >
                    {featured.title}
                  </Link>
                </h2>

                <p className="italic text-base text-muted font-light">{featured.subtitle}</p>

                <p className="text-xs sm:text-sm text-foreground/80 font-sans leading-relaxed">
                  {featured.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-sans">
                <span className="flex items-center gap-1.5 text-muted">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{featured.readTime}</span>
                </span>

                <Link
                  href={`/journal/${featured.slug}`}
                  className="inline-flex items-center gap-1.5 uppercase tracking-widest font-semibold text-foreground hover:text-muted transition-colors"
                >
                  <span>Read Field Essay</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Category Filter & Articles Grid matching exact design spec */}
        <div className="space-y-8">
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-muted block">
            EXPLORE CHRONICLES BY THEME
          </span>

          <JournalGridWithFilter articles={articles} />
        </div>
      </div>
    </div>
  );
}
