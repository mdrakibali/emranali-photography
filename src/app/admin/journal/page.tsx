'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStudio } from '@/context/StudioContext';
import { JournalArticle, JournalCategory } from '@/types/journal';
import CustomSelect from '@/components/ui/CustomSelect';
import CustomConfirmDialog from '@/components/ui/CustomConfirmDialog';
import { journalCategoryOptions } from '@/data/studio';
import { Plus, Search, Edit2, Trash2, X, ExternalLink, BookOpen, Clock, MapPin } from 'lucide-react';

export default function AdminJournalPage() {
  const { journal, addJournal, updateJournal, deleteJournal } = useStudio();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<JournalArticle | null>(null);
  const [articleToDelete, setArticleToDelete] = useState<{ id: string; title: string } | null>(null);

  const emptyArticle: Omit<JournalArticle, 'id'> = {
    slug: '',
    title: '',
    subtitle: '',
    category: 'Field Notes',
    coverImage:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    altText: '',
    location: 'Thakurgaon, Bangladesh',
    publishedDate: 'November 2026',
    readTime: '5 min read',
    excerpt: '',
    content: [
      {
        type: 'paragraph',
        content: '',
      },
    ],
    tags: ['wildlife', 'conservation'],
  };

  const [formData, setFormData] = useState<Omit<JournalArticle, 'id'>>(emptyArticle);

  const handleOpenAddModal = () => {
    setEditingArticle(null);
    setFormData(emptyArticle);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (article: JournalArticle) => {
    setEditingArticle(article);
    setFormData({ ...article });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const slug =
      formData.slug ||
      formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const articleToSave: JournalArticle = {
      ...formData,
      id: editingArticle ? editingArticle.id : `journal-${Date.now()}`,
      slug,
      altText: formData.altText || formData.title,
    };

    if (editingArticle) {
      updateJournal(articleToSave);
    } else {
      addJournal(articleToSave);
    }

    setIsModalOpen(false);
  };

  const filteredArticles = journal.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-[11px] font-semibold text-muted uppercase tracking-widest block">
            Publications &amp; Notes
          </span>
          <h1 className="text-3xl sm:text-4xl text-foreground font-normal mt-1">
            Field Journal &amp; Essays
          </h1>
          <p className="text-xs sm:text-sm text-muted font-light mt-1">
            Publish quiet seasonal essays, natural history observations, and field expeditions.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Draft Field Essay</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-card border border-border">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search essays by title, category, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-background border border-border text-foreground focus:outline-hidden focus:border-foreground rounded-none"
          />
        </div>
      </div>

      {/* Articles Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="group bg-card border border-border overflow-hidden rounded-none flex flex-col justify-between"
          >
            <div>
              {/* Cover Preview */}
              <div className="relative aspect-16/9 overflow-hidden bg-secondary border-b border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 text-white text-[10px] font-semibold uppercase tracking-wider">
                  {article.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {article.readTime}
                  </span>
                  <span>•</span>
                  <span>{article.publishedDate}</span>
                </div>

                <Link
                  href={`/journal/${article.slug}`}
                  target="_blank"
                  className="font-normal text-xl text-foreground hover:underline block leading-snug"
                >
                  {article.title}
                </Link>

                <p className="text-xs text-muted line-clamp-2 leading-relaxed">{article.excerpt}</p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 bg-secondary/30 border-t border-border flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-muted text-[11px]">
                <MapPin className="w-3 h-3" /> {article.location}
              </span>

              <div className="flex items-center gap-2">
                <Link
                  href={`/journal/${article.slug}`}
                  target="_blank"
                  className="p-1.5 text-muted hover:text-foreground"
                  title="View Live Article"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleOpenEditModal(article)}
                  className="p-1.5 text-muted hover:text-foreground cursor-pointer"
                  title="Edit Essay"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setArticleToDelete({ id: article.id, title: article.title })}
                  className="p-1.5 text-muted hover:text-red-600 cursor-pointer"
                  title="Delete Essay"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredArticles.length === 0 && (
          <div className="col-span-full py-16 text-center text-muted bg-card border border-border">
            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No journal essays found.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-card border border-border p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl rounded-none">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-xl font-normal text-foreground">
                {editingArticle ? 'Edit Field Essay' : 'Draft New Field Essay'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-muted hover:text-foreground cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                  Essay Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground rounded-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Custom Category Dropdown */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                    Category *
                  </label>
                  <CustomSelect
                    options={journalCategoryOptions}
                    value={formData.category}
                    onChange={(val) =>
                      setFormData({ ...formData, category: val as JournalCategory })
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground rounded-none"
                    placeholder="e.g. 5 min read"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground rounded-none"
                />
                {formData.coverImage && (
                  <div className="relative aspect-16/9 max-h-36 overflow-hidden bg-secondary border border-border mt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={formData.coverImage}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                  Field Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                  Excerpt / Lead Paragraph *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground rounded-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted hover:text-foreground border border-border cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  {editingArticle ? 'Save Changes' : 'Publish Essay'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Confirmation Dialog for Delete */}
      <CustomConfirmDialog
        isOpen={Boolean(articleToDelete)}
        title="Delete Field Essay"
        message={`Are you sure you want to remove "${articleToDelete?.title}"? This essay will be unpublished from the journal.`}
        confirmText="Yes, Delete Essay"
        cancelText="Cancel"
        type="danger"
        onConfirm={() => {
          if (articleToDelete) {
            deleteJournal(articleToDelete.id);
            setArticleToDelete(null);
          }
        }}
        onCancel={() => setArticleToDelete(null)}
      />
    </div>
  );
}
