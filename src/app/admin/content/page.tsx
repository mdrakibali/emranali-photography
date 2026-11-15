'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStudio } from '@/context/StudioContext';
import CustomConfirmDialog from '@/components/ui/CustomConfirmDialog';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { HeroSlide } from '@/types/hero';
import {
  Save,
  Check,
  ExternalLink,
  User,
  Compass,
  Camera,
  Share2,
  Sparkles,
  MapPin,
  RefreshCw,
  Plus,
  Trash2,
  Edit3,
  X,
  Layers,
} from 'lucide-react';

export default function AdminContentStudioPage() {
  const {
    profile,
    updateProfile,
    heroSlides,
    updateHeroSlide,
    addHeroSlide,
    deleteHeroSlide,
    resetToDefaults,
  } = useStudio();

  const [activeTab, setActiveTab] = useState<
    'profile' | 'philosophy' | 'gear' | 'social' | 'hero'
  >('profile');
  const [formData, setFormData] = useState(profile);
  const [isSaved, setIsSaved] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  // Hero Slides Studio State
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState<string | null>(null);
  const [slideFormData, setSlideFormData] = useState<Partial<HeroSlide>>({
    title: '',
    species: '',
    location: '',
    region: 'Northern Lowlands',
    category: 'Avian Fauna',
    imageUrl: '',
    altText: '',
    slug: '',
  });

  // Editorial Narrative HTML state for Tiptap
  const [editorialNarrativeHtml, setEditorialNarrativeHtml] = useState<string>(
    formData.philosophy?.quote
      ? `<p><strong>Guiding Ethos:</strong> "${formData.philosophy.quote}"</p><ul>${formData.philosophy.description
          .map((d) => `<li>${d}</li>`)
          .join('')}</ul>`
      : '<p>Documenting northern avian fauna with zero nesting disruption.</p>'
  );

  // Sync formData with profile if profile changes externally
  React.useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleEditorialBioChange = (index: number, value: string) => {
    const updatedBio = [...formData.editorialBio];
    updatedBio[index] = value;
    setFormData({ ...formData, editorialBio: updatedBio });
  };

  const handleOpenAddSlide = () => {
    setEditingSlide(null);
    setSlideFormData({
      title: '',
      species: '',
      location: '',
      region: 'Northern Bangladesh',
      category: 'Avian Fauna',
      imageUrl: '',
      altText: '',
      slug: '',
    });
    setIsSlideModalOpen(true);
  };

  const handleOpenEditSlide = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setSlideFormData({ ...slide });
    setIsSlideModalOpen(true);
  };

  const handleSlideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideFormData.title || !slideFormData.imageUrl) return;

    const slug =
      slideFormData.slug ||
      slideFormData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    if (editingSlide) {
      updateHeroSlide({
        ...editingSlide,
        ...(slideFormData as HeroSlide),
        slug,
      });
    } else {
      const newSlide: HeroSlide = {
        id: `hero-slide-${Date.now()}`,
        title: slideFormData.title || 'Untitled Wildlife Subject',
        species: slideFormData.species || 'Species Undocumented',
        location: slideFormData.location || 'Northern Bangladesh',
        region: slideFormData.region || 'Northern Plains',
        category: slideFormData.category || 'Wildlife',
        imageUrl: slideFormData.imageUrl || '',
        altText: slideFormData.altText || slideFormData.title || 'Wildlife photograph',
        slug,
      };
      addHeroSlide(newSlide);
    }
    setIsSlideModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-muted uppercase tracking-widest block">
              Pages &amp; Profile Studio
            </span>
            <span className="text-[9px] font-semibold px-2 py-0.5 bg-neutral-900 text-white rounded-none">
              Live Editable
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl text-foreground font-normal mt-1">
            Edit About &amp; Profile Content
          </h1>
          <p className="text-xs sm:text-sm text-muted font-light mt-1">
            All text, field narratives, ethics, images, and geographic specifications can be
            customized here without touching code.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/about"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-card border border-border text-foreground text-xs font-semibold uppercase tracking-wider hover:bg-secondary transition-colors cursor-pointer"
          >
            <span>Live About Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer shadow-xs"
          >
            {isSaved ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isSaved ? 'Saved Successfully!' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Tabbed Studio Interface */}
      <div className="flex items-center gap-2 border-b border-border overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-foreground text-foreground bg-card'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Profile &amp; Biography</span>
        </button>

        <button
          onClick={() => setActiveTab('philosophy')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'philosophy'
              ? 'border-foreground text-foreground bg-card'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Ethics &amp; Philosophy</span>
        </button>

        <button
          onClick={() => setActiveTab('gear')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'gear'
              ? 'border-foreground text-foreground bg-card'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Equipment &amp; Arsenal</span>
        </button>

        <button
          onClick={() => setActiveTab('social')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'social'
              ? 'border-foreground text-foreground bg-card'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Contact &amp; Social Links</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'hero'
              ? 'border-foreground text-foreground bg-card'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hero Slideshow ({heroSlides.length})</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* TAB 1: Profile & Biography */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-card border border-border p-6 rounded-none space-y-5">
              <h3 className="text-base font-semibold text-foreground border-b border-border pb-3">
                Core Identity &amp; Title
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                    Photographer Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                    Field Experience
                  </label>
                  <input
                    type="text"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none"
                    placeholder="e.g. 8+ Years in the Field"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                    Field Specialty
                  </label>
                  <input
                    type="text"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                  Hero Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                  Short Bio (Footer &amp; Meta Intro)
                </label>
                <textarea
                  rows={2}
                  value={formData.shortBio}
                  onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none leading-relaxed"
                />
              </div>
            </div>

            {/* Editorial Bio Paragraphs */}
            <div className="bg-card border border-border p-6 rounded-none space-y-4">
              <h3 className="text-base font-semibold text-foreground border-b border-border pb-3">
                Editorial Biography (About Page 3-Paragraph Story)
              </h3>

              <div className="space-y-4">
                {formData.editorialBio.map((paragraph, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                      Paragraph {idx + 1}
                    </label>
                    <textarea
                      rows={4}
                      value={paragraph}
                      onChange={(e) => handleEditorialBioChange(idx, e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tiptap Rich Text Field Narrative */}
            <div className="bg-card border border-border p-6 rounded-none space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    Field Philosophy &amp; Narrative Composition
                  </h3>
                  <p className="text-xs text-muted mt-0.5">
                    Compose with rich formatting (Bold, Italic, Headings, Lists, Hyperlinks) via Tiptap.
                  </p>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                  Tiptap Editor
                </span>
              </div>

              <RichTextEditor
                content={editorialNarrativeHtml}
                onChange={(html) => setEditorialNarrativeHtml(html)}
                placeholder="Write rich field essays, ethical notes, or bio narrative..."
                minHeight="min-h-[160px]"
              />
            </div>

            {/* Geographic Headquarters & Coordinates */}
            <div className="bg-card border border-border p-6 rounded-none space-y-5">
              <h3 className="text-base font-semibold text-foreground border-b border-border pb-3">
                Geographic Headquarters
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.location.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location, city: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                    District / Division
                  </label>
                  <input
                    type="text"
                    value={formData.location.district}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location, district: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.location.country}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location, country: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                    GPS Coordinates
                  </label>
                  <input
                    type="text"
                    value={formData.location.coordinates}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location, coordinates: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                  Regional Landscape Narrative
                </label>
                <textarea
                  rows={2}
                  value={formData.location.regionBio}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: { ...formData.location, regionBio: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none leading-relaxed"
                />
              </div>
            </div>

            {/* Profile Images */}
            <div className="bg-card border border-border p-6 rounded-none space-y-5">
              <h3 className="text-base font-semibold text-foreground border-b border-border pb-3">
                Photographer Imagery &amp; Portraits
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                    Portrait Image URL (About Page)
                  </label>
                  <input
                    type="text"
                    value={formData.portraitImage}
                    onChange={(e) => setFormData({ ...formData, portraitImage: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none"
                  />
                  {formData.portraitImage && (
                    <div className="relative aspect-3/4 overflow-hidden bg-secondary border border-border mt-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formData.portraitImage}
                        alt="Portrait Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                    Field Action Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.fieldActionImage}
                    onChange={(e) => setFormData({ ...formData, fieldActionImage: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none"
                  />
                  {formData.fieldActionImage && (
                    <div className="relative aspect-3/4 overflow-hidden bg-secondary border border-border mt-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formData.fieldActionImage}
                        alt="Field Action Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                    Avatar Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.avatarImage}
                    onChange={(e) => setFormData({ ...formData, avatarImage: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none"
                  />
                  {formData.avatarImage && (
                    <div className="relative aspect-square overflow-hidden bg-secondary border border-border mt-2 w-32">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formData.avatarImage}
                        alt="Avatar Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Ethics & Philosophy */}
        {activeTab === 'philosophy' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-card border border-border p-6 rounded-none space-y-5">
              <h3 className="text-base font-semibold text-foreground border-b border-border pb-3">
                Core Photographic Philosophy
              </h3>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                  Guiding Field Quote
                </label>
                <textarea
                  rows={3}
                  value={formData.philosophy.quote}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      philosophy: { ...formData.philosophy, quote: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none leading-relaxed font-serif text-base"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Key Principles &amp; Ethical Notes
                </label>
                {formData.philosophy.description.map((desc, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={desc}
                    onChange={(e) => {
                      const updated = [...formData.philosophy.description];
                      updated[idx] = e.target.value;
                      setFormData({
                        ...formData,
                        philosophy: { ...formData.philosophy, description: updated },
                      });
                    }}
                    className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none"
                  />
                ))}
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-none space-y-5">
              <h3 className="text-base font-semibold text-foreground border-b border-border pb-3">
                Field Journey Narrative
              </h3>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                  Journey Section Title
                </label>
                <input
                  type="text"
                  value={formData.fieldJourney.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fieldJourney: { ...formData.fieldJourney, title: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none"
                />
              </div>

              <div className="space-y-3">
                {formData.fieldJourney.narrative.map((text, idx) => (
                  <div key={idx} className="space-y-1">
                    <label className="block text-xs text-muted font-medium">
                      Paragraph {idx + 1}
                    </label>
                    <textarea
                      rows={3}
                      value={text}
                      onChange={(e) => {
                        const updated = [...formData.fieldJourney.narrative];
                        updated[idx] = e.target.value;
                        setFormData({
                          ...formData,
                          fieldJourney: { ...formData.fieldJourney, narrative: updated },
                        });
                      }}
                      className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Equipment & Gear */}
        {activeTab === 'gear' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-card border border-border p-6 rounded-none space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    Field Equipment &amp; Gear
                  </h3>
                  <span className="text-xs text-muted">Documented in About page specification</span>
                </div>
              </div>

              <div className="space-y-6">
                {formData.gear.map((category, catIdx) => (
                  <div key={catIdx} className="p-4 bg-background border border-border space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-foreground">
                      Category: {category.category}
                    </label>
                    <div className="space-y-2">
                      {category.items.map((item, itemIdx) => (
                        <input
                          key={itemIdx}
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const updatedGear = [...formData.gear];
                            updatedGear[catIdx].items[itemIdx] = e.target.value;
                            setFormData({ ...formData, gear: updatedGear });
                          }}
                          className="w-full px-3.5 py-2 bg-card border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Contact & Social Links */}
        {activeTab === 'social' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-card border border-border p-6 rounded-none space-y-5">
              <h3 className="text-base font-semibold text-foreground border-b border-border pb-3">
                Inquiries &amp; Social Channels
              </h3>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                  Official Public Inquiries Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-xs focus:outline-hidden focus:border-foreground rounded-none"
                  required
                />
              </div>

              <div className="space-y-4 pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Social Platforms &amp; Handles
                </label>
                {formData.socials.map((soc, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-background border border-border"
                  >
                    <div>
                      <span className="block text-[10px] text-muted uppercase font-semibold mb-1">
                        Platform
                      </span>
                      <input
                        type="text"
                        value={soc.platform}
                        onChange={(e) => {
                          const updated = [...formData.socials];
                          updated[idx].platform = e.target.value;
                          setFormData({ ...formData, socials: updated });
                        }}
                        className="w-full px-3 py-2 bg-card border border-border text-foreground text-xs rounded-none"
                      />
                    </div>
                    <div>
                      <span className="block text-[10px] text-muted uppercase font-semibold mb-1">
                        Handle
                      </span>
                      <input
                        type="text"
                        value={soc.handle}
                        onChange={(e) => {
                          const updated = [...formData.socials];
                          updated[idx].handle = e.target.value;
                          setFormData({ ...formData, socials: updated });
                        }}
                        className="w-full px-3 py-2 bg-card border border-border text-foreground text-xs rounded-none"
                      />
                    </div>
                    <div>
                      <span className="block text-[10px] text-muted uppercase font-semibold mb-1">
                        URL
                      </span>
                      <input
                        type="text"
                        value={soc.url}
                        onChange={(e) => {
                          const updated = [...formData.socials];
                          updated[idx].url = e.target.value;
                          setFormData({ ...formData, socials: updated });
                        }}
                        className="w-full px-3 py-2 bg-card border border-border text-foreground text-xs rounded-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Hero Slideshow (Home Backgrounds) */}
        {activeTab === 'hero' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-card border border-border p-6 rounded-none space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-foreground">
                      Homepage Hero Background Slideshow
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-none">
                      Live Sync
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-1 max-w-2xl">
                    These high-resolution full-screen slides rotate automatically with progress bars on the homepage hero section. You can add new slides, update photos, species, or locations, and delete slides.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <Link
                    href="/"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-secondary border border-border text-foreground text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <span>View Home</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={handleOpenAddSlide}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Slide</span>
                  </button>
                </div>
              </div>

              {/* Grid of Current Hero Slides */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {heroSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className="bg-background border border-border overflow-hidden rounded-none flex flex-col justify-between group hover:border-foreground transition-colors"
                  >
                    <div>
                      {/* Image Thumbnail with Overlay Badges */}
                      <div className="relative aspect-16/9 bg-secondary overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={slide.imageUrl}
                          alt={slide.altText}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono uppercase px-2 py-0.5 border border-white/20">
                          Slide 0{index + 1}
                        </div>
                        <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] uppercase font-semibold px-2 py-0.5 border border-white/20">
                          {slide.category}
                        </div>
                      </div>

                      {/* Slide Meta */}
                      <div className="p-4 space-y-2">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground">{slide.title}</h4>
                          <p className="text-xs text-muted font-normal italic">{slide.species}</p>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-muted">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">
                            {slide.location} {slide.region ? `(${slide.region})` : ''}
                          </span>
                        </div>

                        <div className="text-[10px] text-muted font-mono truncate bg-secondary/60 p-1.5 border border-border">
                          {slide.imageUrl}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-4 pt-0 border-t border-border mt-3 flex items-center justify-between">
                      <Link
                        href={`/photographs/${slide.slug}`}
                        target="_blank"
                        className="text-[11px] text-muted hover:text-foreground inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Linked Story</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditSlide(slide)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-foreground bg-secondary hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-border cursor-pointer transition-colors"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSlideToDelete(slide.id)}
                          className="p-1.5 text-muted hover:text-red-500 border border-border hover:border-red-300 transition-colors cursor-pointer"
                          title="Delete slide"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sticky Save Bar */}
        <div className="sticky bottom-4 z-30 p-4 bg-dark text-white border border-dark-border shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium">
              Changes persist instantly across your portfolio session.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsResetDialogOpen(true)}
              className="px-3.5 py-2 text-xs font-medium text-white/70 hover:text-white border border-white/20 hover:border-white transition-colors cursor-pointer"
            >
              Reset to Defaults
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 bg-white text-dark text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              {isSaved ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>{isSaved ? 'Saved!' : 'Save All Changes'}</span>
            </button>
          </div>
        </div>
      </form>

      {/* Custom Confirmation Dialog (No native alert/confirm) */}
      <CustomConfirmDialog
        isOpen={isResetDialogOpen}
        title="Reset Content to Defaults"
        message="Are you sure you want to revert all biography, philosophy, and equipment edits back to factory seed defaults?"
        confirmText="Yes, Revert to Defaults"
        cancelText="Cancel"
        type="warning"
        onConfirm={() => {
          resetToDefaults();
          setIsResetDialogOpen(false);
        }}
        onCancel={() => setIsResetDialogOpen(false)}
      />

      {/* Hero Slide Deletion Confirmation Dialog */}
      <CustomConfirmDialog
        isOpen={!!slideToDelete}
        title="Delete Hero Background Slide"
        message="Are you sure you want to remove this background slide from the homepage hero slideshow? This will take effect immediately."
        confirmText="Delete Slide"
        cancelText="Cancel"
        type="danger"
        onConfirm={() => {
          if (slideToDelete) {
            deleteHeroSlide(slideToDelete);
            setSlideToDelete(null);
          }
        }}
        onCancel={() => setSlideToDelete(null)}
      />

      {/* Add / Edit Hero Slide Modal */}
      {isSlideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-xl bg-card border border-border p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl rounded-none">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-xl font-normal text-foreground">
                {editingSlide ? 'Edit Hero Background Slide' : 'Add New Hero Background Slide'}
              </h3>
              <button
                type="button"
                onClick={() => setIsSlideModalOpen(false)}
                className="p-2 text-muted hover:text-foreground cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSlideSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                  Slide Title (Wildlife Subject) *
                </label>
                <input
                  type="text"
                  required
                  value={slideFormData.title || ''}
                  onChange={(e) => setSlideFormData({ ...slideFormData, title: e.target.value })}
                  placeholder="e.g. The Solitary King"
                  className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground rounded-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                    Species / Scientific Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={slideFormData.species || ''}
                    onChange={(e) =>
                      setSlideFormData({ ...slideFormData, species: e.target.value })
                    }
                    placeholder="e.g. Bengal Fox (Vulpes bengalensis)"
                    className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={slideFormData.category || ''}
                    onChange={(e) =>
                      setSlideFormData({ ...slideFormData, category: e.target.value })
                    }
                    placeholder="e.g. Mammals, Avian Fauna"
                    className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                    Field Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={slideFormData.location || ''}
                    onChange={(e) =>
                      setSlideFormData({ ...slideFormData, location: e.target.value })
                    }
                    placeholder="e.g. Panchagarh Border Plains"
                    className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                    Geographic Region
                  </label>
                  <input
                    type="text"
                    value={slideFormData.region || ''}
                    onChange={(e) => setSlideFormData({ ...slideFormData, region: e.target.value })}
                    placeholder="e.g. Northern Lowlands"
                    className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                  High-Resolution Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={slideFormData.imageUrl || ''}
                  onChange={(e) =>
                    setSlideFormData({ ...slideFormData, imageUrl: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground rounded-none"
                />
                {slideFormData.imageUrl && (
                  <div className="relative aspect-16/9 max-h-40 overflow-hidden bg-secondary border border-border mt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slideFormData.imageUrl}
                      alt="Slide Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                  Associated Story Slug (Optional)
                </label>
                <input
                  type="text"
                  value={slideFormData.slug || ''}
                  onChange={(e) => setSlideFormData({ ...slideFormData, slug: e.target.value })}
                  placeholder="e.g. bengal-fox-solitary-king"
                  className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground rounded-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsSlideModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted hover:text-foreground border border-border cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  {editingSlide ? 'Update Slide' : 'Add Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
