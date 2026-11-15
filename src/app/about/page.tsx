import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPhotographerProfile, getAwardsAndRecognition } from '@/lib/data-access';
import { constructMetadata } from '@/lib/seo';
import { Camera, MapPin, Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'About Emran Ali — Wildlife & Nature Photographer',
  description:
    'Read the biography, artistic philosophy, and conservation field journey of Emran Ali, wildlife photographer based in Thakurgaon, Bangladesh.',
  slug: 'about',
});

export default async function AboutPage() {
  const profile = await getPhotographerProfile();
  const recognition = await getAwardsAndRecognition();

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-background min-h-screen">
      {/* Editorial Header */}
      <section className="mb-16">
        <div className="site-container">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs tracking-[0.3em] uppercase font-sans text-muted font-semibold">
              BIOGRAPHY & PHILOSOPHY
            </span>
            <h1 className="text-4xl sm:text-6xl text-foreground font-normal leading-tight">
              A Devotion to the Quiet Wilderness
            </h1>
            <p className="italic text-xl sm:text-2xl text-muted font-light leading-relaxed">
              &ldquo;{profile.tagline}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Main Split Biography Section with Real Photographer Portrait */}
      <section className="mb-24">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Real Photographer Portrait & Field Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative aspect-[4/5] bg-secondary overflow-hidden rounded-none border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.portraitImage}
                  alt="Emran Ali — Wildlife and Nature Photographer with telephoto camera gear"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-white/80 font-semibold block font-sans">
                    The Naturalist
                  </span>
                  <h3 className="text-3xl text-white mt-0.5">{profile.name}</h3>
                  <p className="text-xs text-white/70 font-sans">{profile.title}</p>
                </div>
              </div>

              {/* Geographical Context & Experience Box */}
              <div className="p-6 bg-card border border-border rounded-none space-y-4">
                <div className="flex items-center justify-between text-xs font-sans pb-3 border-b border-border">
                  <span className="text-muted">Field Experience</span>
                  <span className="font-semibold text-foreground">{profile.experienceYears}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground font-semibold font-sans">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Station & Coordinates</span>
                  </div>
                  <p className="text-lg text-foreground">
                    {profile.location.city}, {profile.location.district}, {profile.location.country}
                  </p>
                  <p className="text-xs text-muted font-sans">
                    Coordinates: {profile.location.coordinates}
                  </p>
                  <p className="text-xs text-muted font-sans leading-relaxed pt-1">
                    {profile.location.regionBio}
                  </p>
                </div>

                <div className="pt-3 border-t border-border text-xs font-sans">
                  <span className="text-muted block text-[11px] uppercase tracking-wider mb-1">
                    Primary Specialization:
                  </span>
                  <span className="font-medium text-foreground">{profile.specialty}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Narrative */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4 text-sm sm:text-base text-foreground/85 font-sans leading-relaxed">
                <div className="border-b border-border pb-3">
                  <h2 className="text-2xl sm:text-3xl text-foreground font-normal">
                    The Journey Behind the Lens
                  </h2>
                  <p className="text-xs text-muted uppercase tracking-widest font-sans font-medium mt-1">
                    Emran Ali • Naturalist & Fine-Art Wildlife Photographer
                  </p>
                </div>

                {profile.editorialBio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Why Wildlife Photography */}
              <div className="pt-6 border-t border-border space-y-3">
                <h3 className="text-2xl text-foreground font-normal">
                  Why Wildlife & Nature Photography?
                </h3>
                <p className="text-sm text-foreground/80 font-sans leading-relaxed">
                  In an era dominated by rapid urbanization and synthetic distractions, the natural
                  world remains our most essential anchor. Wildlife photography is an act of bearing
                  witness. It is not about conquering nature to capture a dramatic trophy, but
                  submitting to the quiet rhythms of the ecosystem until the animal acknowledges you
                  as an unthreatening presence.
                </p>
              </div>

              {/* Photography Philosophy */}
              <div className="p-6 bg-secondary border-l-2 border-primary rounded-none space-y-3">
                <h4 className="text-xs uppercase tracking-widest font-sans font-semibold text-foreground">
                  Artistic Philosophy & Ethics
                </h4>
                <p className="italic text-lg text-foreground leading-snug">
                  &ldquo;{profile.philosophy.quote}&rdquo;
                </p>
                <ul className="space-y-1.5 text-xs text-foreground/80 font-sans pt-1">
                  {profile.philosophy.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-foreground flex-shrink-0 mt-0.5" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Favorite Subjects Section (Light Secondary #E9E6DE) */}
      <section className="py-20 sm:py-28 bg-secondary border-y border-border mb-24">
        <div className="site-container">
          <div className="max-w-2xl mb-12 space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] font-sans text-muted font-semibold">
              FIELD EMPHASES
            </span>
            <h2 className="text-3xl sm:text-4xl text-foreground">Primary Subjects & Ecosystems</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.favoriteSubjects.map((sub, idx) => (
              <div key={idx} className="p-6 bg-card border border-border rounded-none space-y-3">
                <span className="text-xs italic text-muted font-medium">0{idx + 1}</span>
                <h3 className="text-xl text-foreground leading-snug">{sub.title}</h3>
                <p className="text-xs text-muted font-sans leading-relaxed">{sub.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Field Equipment Section */}
      <section className="mb-24">
        <div className="site-container">
          <div className="p-8 sm:p-12 bg-card border border-border rounded-none">
            <div className="max-w-2xl mb-8 space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] font-sans text-muted font-semibold flex items-center gap-2">
                <Camera className="w-4 h-4" />
                <span>FIELD EQUIPMENT</span>
              </span>
              <h2 className="text-3xl text-foreground font-normal">Photographic Equipment</h2>
              <p className="text-xs text-muted font-sans">
                Camera bodies, telephoto optics, and field accessories used for wildlife and nature
                photography in varying terrain and light.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-sans">
              {profile.gear.map((g, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-lg text-foreground border-b border-border pb-2">
                    {g.category}
                  </h4>
                  <ul className="space-y-2 text-foreground/80">
                    {g.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-foreground font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recognition & Verified Placeholders (Light Secondary #E9E6DE) */}
      <section className="py-20 sm:py-28 bg-secondary border-y border-border mb-24">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs tracking-[0.3em] uppercase font-sans text-muted font-semibold">
              HONORS & EXHIBITIONS
            </span>
            <h2 className="text-3xl text-foreground font-normal">Selected Recognition</h2>
            <p className="text-xs text-muted font-sans italic">{recognition.disclaimer}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recognition.items.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-card border border-border rounded-none space-y-2"
              >
                <div className="flex justify-between items-center text-xs text-foreground font-semibold font-sans">
                  <span>{item.year}</span>
                  <Award className="w-3.5 h-3.5 opacity-70" />
                </div>
                <h4 className="text-base text-foreground">{item.title}</h4>
                <p className="text-[11px] text-muted font-sans">{item.organization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA (Dark #181916 for alternating rhythm) */}
      <section className="py-24 sm:py-32 bg-dark text-white text-center">
        <div className="site-container max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl text-white font-normal leading-tight">
            Let&apos;s Discuss Collaborations & Fine Art Inquiries
          </h2>
          <p className="text-sm text-white/70 font-sans max-w-md mx-auto leading-relaxed">
            Whether you are an editor seeking image rights, a curator planning an exhibition, or a
            private collector desiring a fine-art print, I welcome your inquiry.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-dark text-xs uppercase tracking-widest font-sans font-medium hover:bg-neutral-200 transition-colors rounded-none"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
