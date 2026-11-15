import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getConservationStories } from '@/lib/data-access';
import { constructMetadata } from '@/lib/seo';
import { ShieldCheck, Feather, Droplets, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Conservation & Environmental Awareness — Emran Ali',
  description:
    'Wildlife conservation initiatives, grassland predator preservation, and ancient tree canopy protection across northern Bangladesh.',
  slug: 'conservation',
});

export default async function ConservationPage() {
  const stories = await getConservationStories();

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-background min-h-screen">
      <div className="site-container">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-sans text-muted font-semibold tracking-wide uppercase">
            Environmental Advocacy
          </span>
          <h1 className="text-4xl sm:text-6xl text-foreground font-normal">
            Beyond the Frame: Conservation
          </h1>
          <p className="italic text-lg sm:text-xl text-muted font-light leading-relaxed">
            &ldquo;Photography without ecological consciousness is merely decoration. To document
            the wild is to accept the responsibility of defending it.&rdquo;
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-8 bg-card border border-border rounded-none space-y-4">
            <Feather className="w-6 h-6 text-foreground" />
            <h3 className="text-2xl text-foreground">Avian Corridors</h3>
            <p className="text-xs sm:text-sm text-foreground/80 font-sans leading-relaxed">
              Monitoring critical flyway resting waypoints for trans-Himalayan migratory waterfowl
              and protecting resident nesting trees from premature felling.
            </p>
          </div>

          <div className="p-8 bg-card border border-border rounded-none space-y-4">
            <ShieldCheck className="w-6 h-6 text-foreground" />
            <h3 className="text-2xl text-foreground">Grassland Carnivores</h3>
            <p className="text-xs sm:text-sm text-foreground/80 font-sans leading-relaxed">
              Advocating for the Bengal fox and small felines coexisting on the periphery of
              agricultural fields, dispelling folklore myths that endanger their dens.
            </p>
          </div>

          <div className="p-8 bg-card border border-border rounded-none space-y-4">
            <Droplets className="w-6 h-6 text-foreground" />
            <h3 className="text-2xl text-foreground">Living Watersheds</h3>
            <p className="text-xs sm:text-sm text-foreground/80 font-sans leading-relaxed">
              Documenting the ecological balance of the Kulik, Tangon, and Teesta river systems
              against unchecked sand-mining and agricultural runoff.
            </p>
          </div>
        </div>

        {/* In-Depth Conservation Focus Stories */}
        <div className="space-y-16 mb-24">
          <div className="border-b border-border pb-4">
            <h2 className="text-3xl sm:text-4xl text-foreground font-normal">
              Field Focus Case Studies
            </h2>
          </div>

          <div className="space-y-16">
            {stories.map((story, idx) => (
              <div
                key={story.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-card border border-border rounded-none overflow-hidden p-6 sm:p-10"
              >
                <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[4/3] bg-secondary overflow-hidden rounded-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={story.coverImage}
                      alt={story.altText}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className={`lg:col-span-6 space-y-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <span className="text-xs font-sans font-semibold text-foreground bg-secondary px-3 py-1 rounded-none inline-block uppercase tracking-wider">
                    {story.focusArea}
                  </span>

                  <h3 className="text-2xl sm:text-3xl text-foreground leading-tight">
                    {story.title}
                  </h3>

                  <p className="italic text-base text-muted font-light">{story.subtitle}</p>

                  <p className="text-sm text-foreground/80 font-sans leading-relaxed">
                    {story.summary}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/conservation/${story.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-foreground border-b-2 border-primary pb-1 hover:text-muted hover:border-muted transition-colors uppercase tracking-wider"
                    >
                      <span>Explore Story</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ethical Field Manifesto */}
        <div className="p-8 sm:p-12 bg-secondary border border-border rounded-none text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-sans text-muted font-semibold tracking-wider uppercase">
            Field Ethics Code
          </span>
          <h2 className="text-2xl sm:text-3xl text-foreground">
            &ldquo;The welfare of the subject is always greater than the photograph.&rdquo;
          </h2>
          <p className="text-xs sm:text-sm text-foreground/80 font-sans leading-relaxed">
            I do not use live baiting, digital playback to lure breeding birds, nest intrusion, or
            drone harassment. Every photograph on this website was made through camouflage,
            stillness, and adherence to IUCN conservation ethics.
          </p>
        </div>
      </div>
    </div>
  );
}
