'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems } from '@/data/navigation';
import { Menu, X, ArrowUpRight, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md py-4 sm:py-5">
        <div className="site-container flex items-center justify-between">
          {/* Brand Wordmark with Bespoke Editorial Serif Logo */}
          <Link href="/" className="group flex flex-col">
            <span className="font-brand text-2xl sm:text-3xl font-medium tracking-[0.14em] uppercase text-foreground group-hover:text-foreground/80 transition-colors">
              Emran Ali
            </span>
            <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.24em] uppercase -mt-0.5 text-muted transition-colors">
              Wildlife & Nature Photography
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-normal tracking-normal transition-colors duration-200 relative py-2 group ${
                    isActive ? 'text-foreground' : 'text-muted hover:text-foreground'
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Bottom animated border: expands smoothly on hover, always visible when active */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-foreground transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Side: Social Media Links (Clean borderless) */}
          <div className="hidden lg:flex items-center space-x-3.5 pl-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-foreground/80 hover:text-foreground transition-all"
              aria-label="Instagram"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-foreground/80 hover:text-foreground transition-all"
              aria-label="Facebook"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-foreground/80 hover:text-foreground transition-all"
              aria-label="YouTube"
              title="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground hover:text-foreground/80 transition-colors rounded-none"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-background animate-fadeIn">
          <div className="flex items-center justify-between px-6 py-6 border-b border-border">
            <Link href="/" className="flex flex-col" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="font-brand text-2xl font-medium uppercase tracking-[0.14em] text-foreground">
                Emran Ali
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted -mt-0.5">
                Wildlife & Nature Photography
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-foreground"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 px-8 py-8 flex flex-col justify-center space-y-4 overflow-y-auto">
            {navigationItems.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-baseline justify-between py-2.5 border-b border-border"
                >
                  <span
                    className={`text-xl font-normal transition-colors ${
                      isActive
                        ? 'text-foreground font-medium'
                        : 'text-foreground/75 group-hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </nav>

          {/* Mobile Drawer Social Links & Info */}
          <div className="px-8 py-6 border-t border-border space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Follow:
              </span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-foreground hover:text-foreground/80 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-foreground hover:text-foreground/80 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-foreground hover:text-foreground/80 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="text-xs text-muted">
              <p>Thakurgaon, Bangladesh</p>
              <p className="mt-0.5">inquiry@emranaliphotography.com</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
