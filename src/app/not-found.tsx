import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found — Emran Ali Photography',
  description: 'The requested page could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-32 text-center bg-background">
      <div className="max-w-md space-y-6">
        <Compass className="w-12 h-12 text-foreground mx-auto animate-pulse" />
        <span className="text-xs uppercase tracking-[0.3em] font-sans font-semibold text-muted">
          404 — UNCHARTED TERRITORY
        </span>
        <h1 className="text-4xl sm:text-5xl text-foreground font-normal">Lost in the Mist</h1>
        <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
          The trail you are following does not exist or may have shifted with the season. Return to
          the main gallery to explore selected works.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground text-xs uppercase tracking-widest font-sans font-medium hover:bg-neutral-800 transition-colors rounded-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Sanctuary</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
