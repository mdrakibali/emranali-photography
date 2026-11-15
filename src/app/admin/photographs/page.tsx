'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCms } from '@/context/CmsContext';
import { Photograph, PhotographyCategory, AspectRatioType } from '@/types/photograph';
import {
  Plus,
  Search,
  Star,
  Edit2,
  Trash2,
  X,
  ExternalLink,
  Camera,
  Check,
  Filter,
} from 'lucide-react';

export default function AdminPhotographsPage() {
  const { photographs, addPhotograph, updatePhotograph, deletePhotograph, toggleFeaturedPhotograph } =
    useCms();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photograph | null>(null);

  // Form State
  const emptyPhoto: Omit<Photograph, 'id'> = {
    slug: '',
    title: '',
    species: '',
    scientificName: '',
    category: 'birds',
    imageUrl: '',
    altText: '',
    aspectRatio: 'landscape',
    location: 'Thakurgaon, Bangladesh',
    region: 'Northern Plains',
    captureYear: '2026',
    captureDate: 'Early Spring 2026',
    description: '',
    story: [''],
    fieldNotes: '',
    isFeatured: false,
    isAvailableForPrint: true,
    isAvailableForLicense: true,
    exif: {
      camera: 'Sony Alpha 1',
      lens: 'FE 600mm f/4 GM OSS',
      focalLength: '600mm',
      aperture: 'f/4.0',
      shutterSpeed: '1/2500s',
      iso: '400',
    },
    tags: ['wildlife', 'fine-art'],
  };

  const [formData, setFormData] = useState<Omit<Photograph, 'id'>>(emptyPhoto);

  const handleOpenAddModal = () => {
    setEditingPhoto(null);
    setFormData(emptyPhoto);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (photo: Photograph) => {
    setEditingPhoto(photo);
    setFormData({ ...photo });
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

    const photoToSave: Photograph = {
      ...formData,
      id: editingPhoto ? editingPhoto.id : `photo-${Date.now()}`,
      slug,
      altText: formData.altText || formData.title,
    };

    if (editingPhoto) {
      updatePhotograph(photoToSave);
    } else {
      addPhotograph(photoToSave);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}" from your photography catalog?`)) {
      deletePhotograph(id);
    }
  };

  // Filtered Photos List
  const filteredPhotos = useMemo(() => {
    return photographs.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [photographs, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-[11px] font-semibold text-muted uppercase tracking-widest block">
            Media Archive
          </span>
          <h1 className="text-3xl sm:text-4xl text-foreground font-normal mt-1">
            Photographs Catalog
          </h1>
          <p className="text-xs sm:text-sm text-muted font-light mt-1">
            Manage fine-art frames, assign categories, update technical EXIF specifications, and
            control featured curation.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload / Add Photograph</span>
        </button>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-card border border-border">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search by title, species, or field location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-background border border-border text-foreground focus:outline-hidden focus:border-foreground rounded-none"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'birds', 'wildlife', 'nature', 'macro'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider rounded-none cursor-pointer whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'bg-background text-foreground border border-border hover:border-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Photographs Table */}
      <div className="bg-card border border-border overflow-x-auto rounded-none">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-secondary/60 text-muted border-b border-border text-[10px] uppercase font-semibold tracking-wider">
            <tr>
              <th className="py-3 px-4 w-12 text-center">Featured</th>
              <th className="py-3 px-4 w-20">Preview</th>
              <th className="py-3 px-4">Title &amp; Subject</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Location &amp; Year</th>
              <th className="py-3 px-4">Camera &amp; Lens</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredPhotos.map((photo) => (
              <tr key={photo.id} className="hover:bg-secondary/30 transition-colors">
                {/* Featured Toggle */}
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => toggleFeaturedPhotograph(photo.id)}
                    className="p-1 hover:scale-110 transition-transform cursor-pointer"
                    title={photo.isFeatured ? 'Featured on Homepage' : 'Mark as Featured'}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        photo.isFeatured ? 'fill-amber-500 text-amber-500' : 'text-muted/40'
                      }`}
                    />
                  </button>
                </td>

                {/* Thumbnail Preview */}
                <td className="py-3 px-4">
                  <div className="w-16 h-12 bg-secondary border border-border overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>

                {/* Title & Subject */}
                <td className="py-3 px-4 max-w-xs">
                  <Link
                    href={`/photographs/${photo.slug}`}
                    target="_blank"
                    className="font-medium text-foreground hover:underline inline-flex items-center gap-1 group block truncate"
                  >
                    <span className="truncate">{photo.title}</span>
                    <ExternalLink className="w-3 h-3 text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </Link>
                  <span className="text-[11px] text-muted italic block truncate">
                    {photo.species}
                  </span>
                </td>

                {/* Category */}
                <td className="py-3 px-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-secondary text-foreground">
                    {photo.category}
                  </span>
                </td>

                {/* Location & Year */}
                <td className="py-3 px-4 text-muted">
                  <span className="text-foreground block">{photo.location}</span>
                  <span className="text-[11px]">{photo.captureYear}</span>
                </td>

                {/* Camera & Lens */}
                <td className="py-3 px-4 text-muted max-w-[180px]">
                  <span className="text-foreground block truncate">
                    {photo.exif.camera || 'Pro Camera'}
                  </span>
                  <span className="text-[11px] truncate block">
                    {photo.exif.lens || 'Telephoto'}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditModal(photo)}
                      className="p-1.5 hover:bg-secondary text-muted hover:text-foreground transition-colors cursor-pointer"
                      title="Edit Photograph"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(photo.id, photo.title)}
                      className="p-1.5 hover:bg-red-50 text-muted hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete Photograph"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredPhotos.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-muted">
                  <Camera className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No photographs matched your filter criteria.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Photograph Slide-Over / Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-card border border-border p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl rounded-none">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <h3 className="text-xl font-normal text-foreground">
                  {editingPhoto ? 'Edit Photograph Specifications' : 'Upload / Add New Photograph'}
                </h3>
                <span className="text-xs text-muted">
                  Configure high-resolution frame details, taxonomy, and EXIF specifications
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-muted hover:text-foreground cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {/* Image URL & Instant Preview */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Image URL (High-Resolution CDN or Unsplash) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground focus:outline-hidden focus:border-foreground rounded-none"
                />
                {formData.imageUrl && (
                  <div className="relative aspect-video max-h-48 overflow-hidden bg-secondary border border-border mt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Title & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                    Photograph Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground focus:outline-hidden focus:border-foreground rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                    Subject / Species Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.species}
                    onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground focus:outline-hidden focus:border-foreground rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as PhotographyCategory })
                    }
                    className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground focus:outline-hidden focus:border-foreground rounded-none capitalize"
                  >
                    <option value="birds">Birds</option>
                    <option value="wildlife">Wildlife</option>
                    <option value="nature">Nature &amp; Landscapes</option>
                    <option value="macro">Macro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                    Aspect Ratio *
                  </label>
                  <select
                    value={formData.aspectRatio}
                    onChange={(e) =>
                      setFormData({ ...formData, aspectRatio: e.target.value as AspectRatioType })
                    }
                    className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground focus:outline-hidden focus:border-foreground rounded-none capitalize"
                  >
                    <option value="landscape">Landscape (3:2)</option>
                    <option value="portrait">Portrait (3:4)</option>
                    <option value="panoramic">Panoramic (16:9)</option>
                    <option value="square">Square (1:1)</option>
                  </select>
                </div>
              </div>

              {/* Location & Capture Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                    Field Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground focus:outline-hidden focus:border-foreground rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                    Region
                  </label>
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground focus:outline-hidden focus:border-foreground rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                    Capture Year
                  </label>
                  <input
                    type="text"
                    value={formData.captureYear}
                    onChange={(e) => setFormData({ ...formData, captureYear: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground focus:outline-hidden focus:border-foreground rounded-none"
                  />
                </div>
              </div>

              {/* EXIF Metadata Block */}
              <div className="p-4 bg-background border border-border space-y-3">
                <span className="block text-xs font-semibold uppercase tracking-wider text-foreground">
                  Technical EXIF Data
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-[10px] text-muted block mb-0.5">Camera Body</span>
                    <input
                      type="text"
                      value={formData.exif.camera || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          exif: { ...formData.exif, camera: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-card border border-border text-foreground rounded-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted block mb-0.5">Lens</span>
                    <input
                      type="text"
                      value={formData.exif.lens || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          exif: { ...formData.exif, lens: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-card border border-border text-foreground rounded-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted block mb-0.5">Aperture</span>
                    <input
                      type="text"
                      value={formData.exif.aperture || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          exif: { ...formData.exif, aperture: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-card border border-border text-foreground rounded-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted block mb-0.5">Shutter Speed</span>
                    <input
                      type="text"
                      value={formData.exif.shutterSpeed || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          exif: { ...formData.exif, shutterSpeed: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-card border border-border text-foreground rounded-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted block mb-0.5">ISO</span>
                    <input
                      type="text"
                      value={formData.exif.iso || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          exif: { ...formData.exif, iso: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-card border border-border text-foreground rounded-none"
                    />
                  </div>
                </div>
              </div>

              {/* Story Narrative */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                  Behind the Photograph Narrative
                </label>
                <textarea
                  rows={4}
                  value={formData.story[0] || ''}
                  onChange={(e) => setFormData({ ...formData, story: [e.target.value] })}
                  className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground focus:outline-hidden focus:border-foreground rounded-none leading-relaxed"
                  placeholder="The field conditions, lighting, and observations during capture..."
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded-none cursor-pointer"
                  />
                  <span>Feature on Homepage Selected Works</span>
                </label>
              </div>

              {/* Modal Buttons */}
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
                  {editingPhoto ? 'Save Changes' : 'Publish Photograph'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
