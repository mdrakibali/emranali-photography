import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getPhotographBySlug,
  getPhotographs,
  getAdjacentPhotographs,
  getRelatedPhotographs,
} from '@/lib/data-access';
import { constructMetadata, generatePhotographSchema } from '@/lib/seo';
import PhotographViewer from '@/components/photography/PhotographViewer';
import { ArrowUpRight } from 'lucide-react';

interface PhotographPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const photos = await getPhotographs();
  return photos.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PhotographPageProps): Promise<Metadata> {
  const photo = await getPhotographBySlug(params.slug);
  if (!photo) return {};

  return constructMetadata({
    title: `${photo.title} — ${photo.species}`,
    description: photo.description,
    image: photo.imageUrl,
    slug: `photographs/${photo.slug}`,
  });
}

export default async function PhotographDetailPage({ params }: PhotographPageProps) {
  const photo = await getPhotographBySlug(params.slug);
  if (!photo) notFound();

  const allPhotos = await getPhotographs();
  const { prev, next } = await getAdjacentPhotographs(params.slug);
  const relatedPhotos = await getRelatedPhotographs(params.slug, 3);

  const jsonLd = generatePhotographSchema(photo);

  return (
    <article className="bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2-Column Fine-Art Editorial Layout matching the reference spec */}
      <PhotographViewer photo={photo} allPhotos={allPhotos} prev={prev} next={next} />

      {/* Related Works Continuation */}
      {relatedPhotos.length > 0 && (
        <section className="site-container pb-24 sm:pb-32">
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-border">
            <div>
              <span className="text-[11px] font-semibold text-foreground tracking-wider uppercase block">
                Curated Continuation
              </span>
              <h2 className="text-2xl sm:text-3xl text-foreground mt-1">Related Photographs</h2>
            </div>
            <Link
              href="/portfolio"
              className="text-xs sm:text-sm font-medium text-muted hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <span>View Full Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPhotos.map((rel) => (
              <Link
                key={rel.id}
                href={`/photographs/${rel.slug}`}
                className="group block bg-card border border-border overflow-hidden rounded-none transition-all"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rel.imageUrl}
                    alt={rel.altText || rel.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[10px] text-foreground font-semibold uppercase tracking-wider block">
                    {rel.category}
                  </span>
                  <h3 className="text-base text-foreground group-hover:text-muted transition-colors font-medium">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-muted">{rel.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
