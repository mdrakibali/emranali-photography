'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { StudioProvider, useStudio } from '@/context/StudioContext';
import { studioNavItems } from '@/data/studio';
import { ExternalLink, Menu, X, Plus, Sparkles, LogOut, ShieldCheck } from 'lucide-react';

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { inquiries, isAuthenticated, isLoaded, logout, adminUser } = useStudio();

  // If on login route, render without sidebar shell
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoaded && !isAuthenticated && !isLoginPage) {
      router.replace('/admin/login');
    }
  }, [isAuthenticated, isLoaded, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Prevent flicker before auth check
  if (!isLoaded || (!isAuthenticated && !isLoginPage)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <span className="font-brand text-2xl uppercase tracking-widest text-foreground block">
            Emran Ali
          </span>
          <span className="text-xs text-muted">Verifying studio session...</span>
        </div>
      </div>
    );
  }

  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'pending').length;

  return (
    <div className="h-screen w-full overflow-hidden bg-background text-foreground flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-dark text-white border-b border-dark-border shrink-0">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-brand text-xl font-medium tracking-[0.14em] uppercase text-white">
            Emran Ali
          </span>
          <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 bg-white/10 text-white/70">
            Studio
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

      {/* Admin Sidebar Navigation (Fixed on Desktop, independent scrolling) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 h-full bg-dark text-white border-r border-dark-border flex flex-col justify-between transition-transform duration-300 md:translate-x-0 md:static md:h-screen md:shrink-0 overflow-y-auto ${
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
                  Studio Workspace
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {studioNavItems.map((item) => {
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
                        isActive ? 'bg-dark text-white' : 'bg-white/15 text-white/90'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {item.hasCount && pendingInquiriesCount > 0 && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-none font-semibold ${
                        isActive ? 'bg-dark text-white' : 'bg-white text-dark'
                      }`}
                    >
                      {pendingInquiriesCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Live Site Preview, User Info & Logout */}
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

          <div className="px-3.5 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-none bg-white text-dark font-serif font-bold flex items-center justify-center text-sm shrink-0">
                EA
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-medium text-white block truncate">
                  {adminUser?.name || 'Emran Ali'}
                </span>
                <span className="text-[10px] text-white/50 block truncate">Administrator</span>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Workspace (Scrolls independently while sidebar is fixed) */}
      <div className="flex-1 h-screen overflow-y-auto flex flex-col min-w-0">
        {/* Top Header Bar for Desktop (Sticky) */}
        <header className="sticky top-0 z-30 hidden md:flex items-center justify-between h-16 px-8 bg-card/95 backdrop-blur-xs border-b border-border shrink-0">
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="font-semibold text-foreground uppercase tracking-wider">
              Studio Workspace
            </span>
            <span>/</span>
            <span className="capitalize">
              {pathname === '/admin'
                ? 'Overview'
                : pathname.replace('/admin/', '').replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[11px] text-muted bg-secondary px-3 py-1.5 border border-border">
              <ShieldCheck className="w-3.5 h-3.5 text-foreground" />
              <span>Session Authenticated</span>
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
  return <AdminShell>{children}</AdminShell>;
}
