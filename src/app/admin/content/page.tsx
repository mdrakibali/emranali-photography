'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStudio } from '@/context/StudioContext';
import CustomConfirmDialog from '@/components/ui/CustomConfirmDialog';
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
} from 'lucide-react';

export default function AdminContentStudioPage() {
  const { profile, updateProfile, resetToDefaults } = useStudio();

  const [activeTab, setActiveTab] = useState<'profile' | 'philosophy' | 'gear' | 'social'>('profile');
  const [formData, setFormData] = useState(profile);
  const [isSaved, setIsSaved] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

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
            All text, field narratives, ethics, images, and geographic specifications can be customized
            here without touching code.
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
            {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? 'Saved to CMS!' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* WordPress-like Tabbed Interface */}
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
                    <label className="block text-xs text-muted font-medium">Paragraph {idx + 1}</label>
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
                  <h3 className="text-base font-semibold text-foreground">Field Equipment &amp; Gear</h3>
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
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-background border border-border">
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
              onClick={resetToDefaults}
              className="px-3.5 py-2 text-xs font-medium text-white/70 hover:text-white border border-white/20 hover:border-white transition-colors cursor-pointer"
            >
              Reset to Defaults
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 bg-white text-dark text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Save className="w-3.5 h-3.5" />}
              <span>{isSaved ? 'Saved!' : 'Save All Changes'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

