'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { JournalArticle, JournalCategory } from '@/types/journal';
import { journalFilterCategories } from '@/data/journal';
import { ArrowUpRight, Clock, MapPin } from 'lucide-react';

interface JournalGridWithFilterProps {
  articles: JournalArticle[];
}

const CATEGORIES = journalFilterCategories;

export default function JournalGridWithFilter({ articles }: JournalGridWithFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') return articles;
    return articles.filter((article) => article.category === selectedCategory);
  }, [articles, selectedCategory]);

  return (
    <div className="space-y-12">
      {/* Category Filter Tabs matching exact design specification */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 py-6 border-b border-border">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`cursor-pointer px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.08em] transition-all duration-200 rounded-none ${
                isActive
                  ? 'bg-primary text-primary-foreground border border-primary '
                  : 'bg-card text-foreground border border-border hover:border-foreground'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Filtered Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-secondary/50 rounded-none border border-border">
          <p className="text-lg text-foreground font-normal">No articles found in this category.</p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-xs uppercase tracking-wider font-semibold text-foreground underline hover:text-muted"
          >
            Show All Articles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col bg-card border border-border rounded-none overflow-hidden transition-all duration-300"
            >
              <Link
                href={`/journal/${article.slug}`}
                className="relative aspect-[16/10] overflow-hidden bg-secondary block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.coverImage}
                  alt={article.altText}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-dark/75 backdrop-blur-sm px-2.5 py-1 text-[10px] text-white font-sans uppercase tracking-wider rounded-none flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{article.location}</span>
                </div>
              </Link>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-sans text-muted">
                    <span className="text-foreground font-semibold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span>•</span>
                    <span>{article.publishedDate}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl text-foreground font-normal leading-snug group-hover:text-muted transition-colors">
                    <Link href={`/journal/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-muted font-sans line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-sans">
                  <span className="flex items-center gap-1.5 text-muted">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </span>

                  <Link
                    href={`/journal/${article.slug}`}
                    className="inline-flex items-center gap-1 uppercase tracking-wider text-xs font-semibold text-foreground group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Essay</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
