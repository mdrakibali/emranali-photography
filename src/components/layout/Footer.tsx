'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { footerNavigation } from '@/data/navigation';
import { photographerData } from '@/data/photographer';
import { siteSettings } from '@/data/site-settings';
import { MapPin, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }
  return (
    <footer className="bg-dark text-white border-t border-dark-border pt-16 pb-12 font-sans">
      <div className="site-container">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-14 border-b border-dark-border">
          {/* Brand & Editorial Mission */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block group">
              <span className="font-brand text-3xl font-medium tracking-[0.14em] uppercase text-white block transition-colors group-hover:text-white/80">
                Emran Ali
              </span>
              <span className="text-[10px] font-medium tracking-[0.24em] uppercase text-white/50 block -mt-0.5">
                Wildlife & Nature Photographer
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-md">
              {photographerData.shortBio}
            </p>

            <div className="pt-2 space-y-2 text-xs sm:text-sm text-white/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-white/50" />
                <span>Thakurgaon, Rangpur Division, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white/50" />
                <a
                  href={`mailto:${siteSettings.contact.email}`}
                  className="hover:text-white transition-colors underline decoration-white/20"
                >
                  {siteSettings.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-white/60 tracking-wider uppercase">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {footerNavigation.main.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio Collections */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold text-white/60 tracking-wider uppercase">
              Collections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {footerNavigation.categories.map((cat) => (
                <li key={cat.label}>
                  <Link
                    href={cat.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Social Media */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold text-white/60 tracking-wider uppercase">
              Connect
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {photographerData.socials.map((soc) => (
                <li key={soc.platform}>
                  <a
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{soc.platform}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Ethos Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            © {siteSettings.copyrightYear} {photographerData.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Thakurgaon, Bangladesh</span>
            <span>•</span>
            <Link
              href="/admin"
              className="text-white/40 hover:text-white transition-colors uppercase tracking-widest text-[10px]"
            >
              Admin Studio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
