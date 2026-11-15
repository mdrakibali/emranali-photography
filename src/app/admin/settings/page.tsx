'use client';

import React, { useState } from 'react';
import { useStudio } from '@/context/StudioContext';
import CustomConfirmDialog from '@/components/ui/CustomConfirmDialog';
import { Save, Check, RefreshCw, Database, ShieldCheck } from 'lucide-react';

export default function AdminSettingsPage() {
  const { siteSettings, updateSiteSettings, resetToDefaults } = useStudio();
  const [formData, setFormData] = useState(siteSettings);
  const [isSaved, setIsSaved] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleConfirmReset = () => {
    resetToDefaults();
    setIsResetDialogOpen(false);
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-[11px] font-semibold text-muted uppercase tracking-widest block">
            System Configuration
          </span>
          <h1 className="text-3xl sm:text-4xl text-foreground font-normal mt-1">
            Global Site Settings
          </h1>
          <p className="text-xs sm:text-sm text-muted font-light mt-1">
            Configure SEO metadata, brand labels, and view database connection parameters.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer self-start sm:self-auto"
        >
          {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? 'Saved!' : 'Save Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Metadata Block */}
        <div className="p-6 bg-card border border-border rounded-none space-y-4">
          <h3 className="text-base font-semibold text-foreground border-b border-border pb-3">
            Search Engine &amp; Brand Metadata
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Site Brand Title
              </label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground rounded-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Photographer Name
              </label>
              <input
                type="text"
                value={formData.photographerName}
                onChange={(e) => setFormData({ ...formData, photographerName: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground rounded-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Production Canonical URL
              </label>
              <input
                type="url"
                value={formData.siteUrl}
                onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground rounded-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Copyright Year
              </label>
              <input
                type="number"
                value={formData.copyrightYear}
                onChange={(e) =>
                  setFormData({ ...formData, copyrightYear: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground rounded-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
              Default SEO Meta Description
            </label>
            <textarea
              rows={3}
              value={formData.defaultDescription}
              onChange={(e) => setFormData({ ...formData, defaultDescription: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-background border border-border text-foreground rounded-none leading-relaxed"
            />
          </div>
        </div>

        {/* Database Bridge Information */}
        <div className="p-6 bg-secondary/50 border border-border rounded-none space-y-3">
          <div className="flex items-center gap-2 text-foreground">
            <Database className="w-4 h-4" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Backend Database Bridge Status
            </h3>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            The studio is currently operating on the <strong>Realtime Studio Context Engine</strong>,
            persisting all modifications in local browser storage. It is structured to connect
            seamlessly with:
          </p>
          <ul className="list-disc list-inside text-xs text-foreground/80 space-y-1">
            <li>PostgreSQL with Prisma / Drizzle ORM</li>
            <li>Supabase Database &amp; Storage CDN</li>
            <li>MongoDB / Firebase Firestore</li>
          </ul>
        </div>

        {/* Danger Zone: Reset Data */}
        <div className="p-6 bg-card border border-red-200 rounded-none space-y-4">
          <h3 className="text-sm font-semibold text-red-700 uppercase tracking-wider">
            Reset Studio Factory Data
          </h3>
          <p className="text-xs text-muted leading-relaxed">
            If you ever wish to clear all edits and restore the original fine-art photographs,
            journal stories, and default photographer profile:
          </p>
          <button
            type="button"
            onClick={() => setIsResetDialogOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-xs font-semibold uppercase tracking-wider hover:bg-red-700 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All State to Seed Defaults</span>
          </button>
        </div>
      </form>

      {/* Custom Confirmation Dialog (No native alert/confirm) */}
      <CustomConfirmDialog
        isOpen={isResetDialogOpen}
        title="Reset All Studio Data"
        message="Warning: This will reset all your photographs, about biography, and inquiries back to the original factory seed data. Are you sure?"
        confirmText="Yes, Reset Everything"
        cancelText="Cancel"
        type="danger"
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetDialogOpen(false)}
      />
    </div>
  );
}
