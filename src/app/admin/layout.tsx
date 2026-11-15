'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CmsProvider, useCms } from '@/context/CmsContext';
import {
  LayoutDashboard,
  Camera,
  BookOpen,
  FileText,
  Mail,
  Settings,
  ExternalLink,
  Menu,
  X,
  Plus,
  Sparkles,
} from 'lucide-react';

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { inquiries } = useCms();

  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'pending').length;

  const navItems = [
    {
      href: '/admin',
      label: 'Overview',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: '/admin/photographs',
      label: 'Photographs',
      icon: Camera,
    },
    {
      href: '/admin/journal',
      label: 'Journal & Essays',
      icon: BookOpen,
    },
    {
      href: '/admin/content',
      label: 'Pages & Bio (CMS)',
      icon: FileText,
      badge: 'WordPress-like',
    },
    {
      href: '/admin/inquiries',
      label: 'Client Inquiries',
      icon: Mail,
      count: pendingInquiriesCount,
    },
    {
      href: '/admin/settings',
      label: 'Site Settings',
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-dark text-white border-b border-dark-border">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-brand text-xl font-medium tracking-[0.14em] uppercase text-white">
            Emran Ali
          </span>
          <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 bg-white/10 text-white/70">
            CMS
          </span>
        </Link>
        <button
          onClick={() => setIsMobileSidebarOpen((prev) => !prev)}
          className="p-2 text-white hover:bg-white/10 rounded-none cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Admin Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-dark text-white border-r border-dark-border flex flex-col justify-between transition-transform duration-300 md:translate-x-0 md:static ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Wordmark & Studio Tag */}
          <div className="p-6 border-b border-dark-border">
            <Link href="/admin" className="block group">
              <span className="font-brand text-2xl font-medium tracking-[0.14em] uppercase text-white block group-hover:text-white/80 transition-colors">
                Emran Ali
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] tracking-widest uppercase text-white/50">
                  Editorial CMS Studio
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname?.startsWith(item.href);

              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-medium tracking-wide transition-all rounded-none cursor-pointer ${
                    isActive
                      ? 'bg-white text-dark font-semibold shadow-xs'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-none font-sans ${
                        isActive
                          ? 'bg-dark text-white'
                          : 'bg-white/15 text-white/90'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {typeof item.count === 'number' && item.count > 0 && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-none font-semibold ${
                        isActive
                          ? 'bg-dark text-white'
                          : 'bg-white text-dark'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Live Site Preview & User Status */}
        <div className="p-4 border-t border-dark-border space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3.5 py-2.5 text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors rounded-none cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </span>
            <span className="text-[10px] text-white/50">Visit &rarr;</span>
          </Link>

          <div className="px-3.5 py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-none bg-white text-dark font-serif font-bold flex items-center justify-center text-sm shrink-0">
              EA
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-medium text-white block truncate">Emran Ali</span>
              <span className="text-[10px] text-white/50 block truncate">Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar for Desktop */}
        <header className="hidden md:flex items-center justify-between h-16 px-8 bg-card border-b border-border">
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="font-semibold text-foreground uppercase tracking-wider">
              Studio Workspace
            </span>
            <span>/</span>
            <span className="capitalize">
              {pathname === '/admin' ? 'Overview' : pathname.replace('/admin/', '').replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[11px] text-muted bg-secondary px-3 py-1.5 border border-border">
              <Sparkles className="w-3.5 h-3.5 text-foreground" />
              <span>CMS Mode: Realtime UI State (Database-Ready)</span>
            </div>

            <Link
              href="/admin/photographs"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Photograph</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Admin Page Body */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <CmsProvider>
      <AdminShell>{children}</AdminShell>
    </CmsProvider>
  );
}
