import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJournalBySlug, getJournalArticles } from '@/lib/data-access';
import { constructMetadata } from '@/lib/seo';
import { ChevronLeft, Calendar, Clock, MapPin, ArrowUpRight } from 'lucide-react';

interface JournalDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const articles = await getJournalArticles();
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: JournalDetailPageProps): Promise<Metadata> {
  const article = await getJournalBySlug(params.slug);
  if (!article) return {};

  return constructMetadata({
    title: `${article.title} — Journal`,
    description: article.excerpt,
    image: article.coverImage,
    slug: `journal/${article.slug}`,
  });
}

export default async function JournalDetailPage({ params }: JournalDetailPageProps) {
  const article = await getJournalBySlug(params.slug);
  if (!article) notFound();

  const allArticles = await getJournalArticles();
  const relatedArticles = allArticles.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <article className="pt-28 pb-24 sm:pb-32 bg-background min-h-screen">
      {/* Top Breadcrumb */}
      <div className="site-container max-w-4xl mx-auto mb-8">
        <Link
          href="/journal"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back to Field Notes</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="site-container max-w-4xl mx-auto mb-12 space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-sans text-muted">
          <span className="text-foreground font-semibold uppercase tracking-wider">
            {article.category}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {article.publishedDate}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-muted" />
            {article.location}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl text-foreground font-normal leading-[1.1]">
          {article.title}
        </h1>

        <p className="italic text-xl sm:text-2xl text-muted font-light leading-relaxed">
          {article.subtitle}
        </p>
      </header>

      {/* Hero Image */}
      <div className="site-container mb-16">
        <div className="relative aspect-[16/9] bg-secondary overflow-hidden rounded-none border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.coverImage}
            alt={article.altText}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Long-Form Content Body */}
      <div className="site-container max-w-3xl mx-auto space-y-8 font-sans text-foreground/90 leading-relaxed text-base sm:text-lg">
        {article.content.map((block, idx) => {
          if (block.type === 'paragraph') {
            if (block.content && block.content.includes('<')) {
              return (
                <div
                  key={idx}
                  className="prose prose-neutral max-w-none dark:prose-invert leading-relaxed text-base sm:text-lg"
                  dangerouslySetInnerHTML={{ __html: block.content }}
                />
              );
            }
            return (
              <p key={idx} className="leading-relaxed">
                {block.content}
              </p>
            );
          }
          if (block.type === 'heading') {
            return (
              <h2 key={idx} className="text-2xl sm:text-3xl text-foreground font-normal pt-6">
                {block.content}
              </h2>
            );
          }
          if (block.type === 'quote') {
            return (
              <blockquote
                key={idx}
                className="my-8 py-4 px-6 border-l-2 border-primary bg-secondary/60 italic text-xl sm:text-2xl text-foreground"
              >
                &ldquo;{block.content}&rdquo;
                {block.author && (
                  <cite className="block text-xs uppercase tracking-widest font-sans font-normal text-muted mt-2 not-italic">
                    — {block.author}
                  </cite>
                )}
              </blockquote>
            );
          }
          if (block.type === 'image' && block.imageUrl) {
            return (
              <figure key={idx} className="my-10 space-y-2">
                <div className="relative aspect-[16/10] overflow-hidden rounded-none bg-secondary border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.imageUrl}
                    alt={block.altText || ''}
                    className="w-full h-full object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="text-xs text-muted font-sans text-center italic">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }
          if (block.type === 'callout') {
            return (
              <div
                key={idx}
                className="p-5 my-8 bg-secondary border-l-4 border-primary text-xs sm:text-sm font-sans text-foreground"
              >
                {block.content}
              </div>
            );
          }
          return null;
        })}

        {/* Article Author Footer Card */}
        <div className="mt-16 pt-8 border-t border-border flex items-center gap-4 text-xs font-sans text-muted">
          <div className="w-12 h-12 rounded-none -full overflow-hidden bg-secondary flex-shrink-0 border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80"
              alt="Emran Ali"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-foreground">Documented by Emran Ali</p>
            <p className="text-[11px] text-muted">
              Wildlife & Nature Photographer — Thakurgaon, Bangladesh
            </p>
          </div>
        </div>
      </div>

      {/* Related Journal Stories */}
      {relatedArticles.length > 0 && (
        <section className="site-container mt-24 pt-16 border-t border-border">
          <h3 className="text-2xl text-foreground mb-8">Continue Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/journal/${rel.slug}`}
                className="group flex gap-4 bg-card p-4 border border-border rounded-none transition-all"
              >
                <div className="w-28 h-24 relative overflow-hidden flex-shrink-0 bg-secondary border border-border/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rel.coverImage}
                    alt={rel.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-muted font-sans font-semibold">
                      {rel.category}
                    </span>
                    <h4 className="text-lg text-foreground group-hover:text-muted transition-colors leading-snug mt-0.5">
                      {rel.title}
                    </h4>
                  </div>
                  <span className="text-xs text-muted font-sans flex items-center gap-1">
                    <span>Read Story</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
