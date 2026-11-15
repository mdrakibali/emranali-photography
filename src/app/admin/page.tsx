'use client';

import React from 'react';
import Link from 'next/link';
import { useCms } from '@/context/CmsContext';
import {
  Camera,
  BookOpen,
  Mail,
  Users,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export default function AdminOverviewPage() {
  const { photographs, journal, inquiries, subscribers, profile } = useCms();

  const pendingInquiries = inquiries.filter((i) => i.status === 'pending');
  const featuredPhotosCount = photographs.filter((p) => p.isFeatured).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-[11px] font-semibold text-muted uppercase tracking-widest block">
            Administrative Control Panel
          </span>
          <h1 className="text-3xl sm:text-4xl text-foreground font-normal mt-1">
            Welcome back, {profile.name}
          </h1>
          <p className="text-xs sm:text-sm text-muted font-light mt-1">
            Manage your fine-art photographs, field journal essays, client licensing inquiries, and
            public page content.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/photographs"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Photograph</span>
          </Link>
          <Link
            href="/admin/content"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-card border border-border text-foreground text-xs font-semibold uppercase tracking-wider hover:bg-secondary transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Edit About &amp; Bio</span>
          </Link>
        </div>
      </div>

      {/* 4 Key Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Photographs */}
        <div className="p-5 bg-card border border-border rounded-none space-y-2">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs uppercase tracking-wider font-semibold">Photographs</span>
            <Camera className="w-4 h-4 text-foreground" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-normal text-foreground font-serif">
              {photographs.length}
            </span>
            <span className="text-xs text-muted">({featuredPhotosCount} featured)</span>
          </div>
          <p className="text-[11px] text-muted pt-1">
            Birds, wildlife, landscapes &amp; macro works in archive.
          </p>
        </div>

        {/* Metric 2: Journal Essays */}
        <div className="p-5 bg-card border border-border rounded-none space-y-2">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs uppercase tracking-wider font-semibold">Field Essays</span>
            <BookOpen className="w-4 h-4 text-foreground" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-normal text-foreground font-serif">{journal.length}</span>
            <span className="text-xs text-muted">Published</span>
          </div>
          <p className="text-[11px] text-muted pt-1">
            Avian migration, fox observations &amp; conservation essays.
          </p>
        </div>

        {/* Metric 3: Client Inquiries */}
        <div className="p-5 bg-card border border-border rounded-none space-y-2">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs uppercase tracking-wider font-semibold">Client Inquiries</span>
            <Mail className="w-4 h-4 text-foreground" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-normal text-foreground font-serif">
              {inquiries.length}
            </span>
            {pendingInquiries.length > 0 ? (
              <span className="text-xs font-semibold px-2 py-0.5 bg-neutral-900 text-white rounded-none">
                {pendingInquiries.length} Pending
              </span>
            ) : (
              <span className="text-xs text-muted">All answered</span>
            )}
          </div>
          <p className="text-[11px] text-muted pt-1">
            Print acquisitions, licensing &amp; contact leads.
          </p>
        </div>

        {/* Metric 4: Newsletter Subscribers */}
        <div className="p-5 bg-card border border-border rounded-none space-y-2">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs uppercase tracking-wider font-semibold">Subscribers</span>
            <Users className="w-4 h-4 text-foreground" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-normal text-foreground font-serif">
              {subscribers.length}
            </span>
            <span className="text-xs text-muted">Readers</span>
          </div>
          <p className="text-[11px] text-muted pt-1">Subscribed to seasonal field essays &amp; prints.</p>
        </div>
      </div>

      {/* Quick Action Navigation Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/photographs"
          className="group p-6 bg-card border border-border hover:border-foreground transition-all rounded-none block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="p-2.5 bg-secondary text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Camera className="w-5 h-5" />
            </span>
            <ArrowRight className="w-4 h-4 text-muted group-hover:text-foreground group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-lg font-medium text-foreground">Manage Photographs</h3>
          <p className="text-xs text-muted mt-1.5 leading-relaxed">
            Upload new high-res frames, edit EXIF metadata, toggle homepage sliders, or update
            stories.
          </p>
        </Link>

        <Link
          href="/admin/content"
          className="group p-6 bg-card border border-border hover:border-foreground transition-all rounded-none block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="p-2.5 bg-secondary text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <FileText className="w-5 h-5" />
            </span>
            <ArrowRight className="w-4 h-4 text-muted group-hover:text-foreground group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-lg font-medium text-foreground">Edit About &amp; Bio (CMS)</h3>
          <p className="text-xs text-muted mt-1.5 leading-relaxed">
            Update your biography, camera gear, field philosophy, coordinates, and social handles.
          </p>
        </Link>

        <Link
          href="/admin/inquiries"
          className="group p-6 bg-card border border-border hover:border-foreground transition-all rounded-none block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="p-2.5 bg-secondary text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Mail className="w-5 h-5" />
            </span>
            <ArrowRight className="w-4 h-4 text-muted group-hover:text-foreground group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-lg font-medium text-foreground">Client Inquiries &amp; Orders</h3>
          <p className="text-xs text-muted mt-1.5 leading-relaxed">
            Respond to collectors, commercial art directors, and print acquisition inquiries.
          </p>
        </Link>
      </div>

      {/* Two Column Section: Recent Inquiries & Recent Photographs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Recent Inquiries (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-card border border-border rounded-none p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h2 className="text-base font-semibold text-foreground">Recent Client Inquiries</h2>
              <span className="text-xs text-muted">Latest print &amp; licensing requests</span>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-muted hover:text-foreground transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({inquiries.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-border">
            {inquiries.slice(0, 4).map((inq) => (
              <div key={inq.id} className="py-3.5 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-foreground">{inq.name}</span>
                    <span className="text-[10px] text-muted">• {inq.date}</span>
                    <span
                      className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-none font-semibold ${
                        inq.type === 'licensing'
                          ? 'bg-neutral-900 text-white'
                          : inq.type === 'print'
                          ? 'bg-neutral-200 text-neutral-800'
                          : 'bg-secondary text-foreground'
                      }`}
                    >
                      {inq.type}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-foreground">{inq.subject}</p>
                  <p className="text-xs text-muted line-clamp-1">{inq.message}</p>
                </div>

                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-none shrink-0 ${
                    inq.status === 'pending'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : inq.status === 'replied'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-secondary text-muted'
                  }`}
                >
                  {inq.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Photograph Showcase (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-card border border-border rounded-none p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h2 className="text-base font-semibold text-foreground">Archive Highlights</h2>
              <span className="text-xs text-muted">Currently in catalog</span>
            </div>
            <Link
              href="/admin/photographs"
              className="text-xs font-semibold text-muted hover:text-foreground transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Manage All ({photographs.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {photographs.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="group relative aspect-square overflow-hidden bg-secondary border border-border"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] uppercase tracking-wider text-white/70 block truncate">
                    {p.category}
                  </span>
                  <span className="text-xs font-medium text-white truncate block">{p.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/portfolio"
              target="_blank"
              className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-foreground border border-border hover:bg-secondary transition-colors block cursor-pointer"
            >
              Preview Live Portfolio Archive &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
