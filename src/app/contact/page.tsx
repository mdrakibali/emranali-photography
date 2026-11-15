import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { photographerData } from '@/data/photographer';
import { siteSettings } from '@/data/site-settings';
import { constructMetadata } from '@/lib/seo';
import ContactForm from '@/components/forms/ContactForm';
import { Mail, MapPin, Globe, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Contact & Inquiries — Emran Ali Photography',
  description:
    'Get in touch with Emran Ali for fine-art print inquiries, image licensing, documentary conservation assignments, and exhibitions.',
  slug: 'contact',
});

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-background min-h-screen">
      <div className="site-container">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs tracking-[0.3em] uppercase font-sans text-muted font-semibold">
            COMMUNICATIONS & INQUIRIES
          </span>
          <h1 className="text-4xl sm:text-6xl text-foreground font-normal">
            Let&apos;s Start a Conversation.
          </h1>
          <p className="italic text-lg sm:text-xl text-muted font-light leading-relaxed">
            &ldquo;Whether you are interested in acquiring an archival print, licensing photography
            for an environmental journal, or collaborating on an ecological story, I look forward to
            hearing from you.&rdquo;
          </p>
        </div>

        {/* Split Layout: Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-card border border-border rounded-none space-y-6">
              <h2 className="text-2xl text-foreground">Direct Contact Information</h2>

              <div className="space-y-4 text-xs font-sans text-foreground/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-foreground">Studio & Field Base</strong>
                    <span>Thakurgaon, Rangpur Division, Bangladesh</span>
                    <span className="block text-muted text-[11px] mt-0.5">
                      Coordinates: {siteSettings.location.coordinates}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-border">
                  <Mail className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-foreground">Direct Inquiries</strong>
                    <a
                      href={`mailto:${siteSettings.contact.email}`}
                      className="text-foreground hover:underline"
                    >
                      {siteSettings.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-border">
                  <Globe className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-foreground">Social & Portfolios</strong>
                    <div className="space-y-1 mt-1 text-muted">
                      {photographerData.socials.map((s) => (
                        <div key={s.platform}>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                          >
                            <span>
                              {s.platform}: {s.handle}
                            </span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time & Turnaround Notice */}
            <div className="p-6 bg-secondary border border-border rounded-none space-y-2 text-xs font-sans text-foreground/80">
              <h3 className="text-lg text-foreground">Field Schedule Notice</h3>
              <p className="leading-relaxed">
                When working in remote field hides along the Teesta or Sundarbans tidal corridors,
                mobile connectivity may be intermittent. Inquiries are generally acknowledged within
                24 to 48 hours.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="p-12 text-center text-xs font-sans text-muted">Loading form...</div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
