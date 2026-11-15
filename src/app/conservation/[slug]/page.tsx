import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getConservationBySlug, getConservationStories } from '@/lib/data-access';
import { constructMetadata } from '@/lib/seo';
import { ChevronLeft, ShieldAlert, CheckCircle, MapPin } from 'lucide-react';

interface ConservationDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const stories = await getConservationStories();
  return stories.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: ConservationDetailPageProps): Promise<Metadata> {
  const story = await getConservationBySlug(params.slug);
  if (!story) return {};

  return constructMetadata({
    title: `${story.title} — Conservation`,
    description: story.summary,
    image: story.coverImage,
    slug: `conservation/${story.slug}`,
  });
}

export default async function ConservationDetailPage({ params }: ConservationDetailPageProps) {
  const story = await getConservationBySlug(params.slug);
  if (!story) notFound();

  return (
    <article className="pt-28 pb-24 sm:pb-32 bg-background min-h-screen">
      {/* Top Breadcrumb */}
      <div className="site-container max-w-4xl mx-auto mb-8">
        <Link
          href="/conservation"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back to Conservation Hub</span>
        </Link>
      </div>

      {/* Header */}
      <header className="site-container max-w-4xl mx-auto mb-12 space-y-5">
        <div className="flex items-center gap-3 text-xs font-sans text-muted">
          <span className="text-foreground font-semibold uppercase tracking-wider">
            {story.focusArea}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-muted" />
            {story.location}
          </span>
          <span>•</span>
          <span>{story.publishedDate}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl text-foreground font-normal leading-[1.1]">
          {story.title}
        </h1>

        <p className="italic text-xl sm:text-2xl text-muted font-light leading-relaxed">
          {story.subtitle}
        </p>
      </header>

      {/* Cover Image */}
      <div className="site-container mb-16">
        <div className="relative aspect-[16/9] bg-secondary overflow-hidden rounded-none border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={story.coverImage} alt={story.altText} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Structured Content Sections */}
      <div className="site-container max-w-3xl mx-auto space-y-12 font-sans text-foreground/90 leading-relaxed text-sm sm:text-base">
        {/* Executive Summary */}
        <div className="p-6 bg-secondary border-l-2 border-primary rounded-none space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-foreground block">
            Executive Summary
          </span>
          <p className="italic text-lg sm:text-xl text-foreground leading-relaxed">
            {story.summary}
          </p>
        </div>

        {/* The Ecological Challenge */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl text-foreground flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-foreground" />
            <span>The Ecological Challenge</span>
          </h2>
          <p className="text-foreground/80">{story.challenge}</p>
        </section>

        {/* The Photographic Role */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl text-foreground">The Role of Visual Evidence</h2>
          <p className="text-foreground/80">{story.photographicRole}</p>
        </section>

        {/* Supporting Image Grid */}
        {story.supportingImages && story.supportingImages.length > 0 && (
          <div className="my-10 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {story.supportingImages.map((img, i) => (
                <div key={i} className="space-y-2">
                  <div className="relative aspect-[4/3] bg-secondary overflow-hidden rounded-none border border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={img.altText} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-muted italic font-sans">{img.caption}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Field Observations */}
        <section className="p-6 bg-card border border-border rounded-none space-y-4">
          <h3 className="text-xl text-foreground">Direct Field Observations</h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/85">
            {story.fieldObservations.map((obs, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5" />
                <span>{obs}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Call to Action */}
        <section className="pt-6 border-t border-border space-y-4">
          <h3 className="text-2xl text-foreground">What Can Be Done</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">{story.callToAction}</p>
        </section>
      </div>
    </article>
  );
}
