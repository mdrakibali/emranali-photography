import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getPrintCollections, getLicensingOptions, getPhotographBySlug } from '@/lib/data-access';
import { constructMetadata } from '@/lib/seo';
import LicensingInquiryForm from '@/components/forms/LicensingInquiryForm';
import { Shield, Check, FileCheck, Layers } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Fine Art Prints & Image Licensing — Emran Ali',
  description:
    'Museum-grade archival pigment prints on Hahnemühle cotton rag, signed limited editions, and high-resolution licensing for editorial and commercial use.',
  slug: 'prints',
});

export default async function PrintsPage() {
  const prints = await getPrintCollections();
  const licenses = await getLicensingOptions();

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-background min-h-screen">
      <div className="site-container">
        {/* Page Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs tracking-[0.3em] uppercase font-sans text-muted font-semibold">
            COMMERCIAL & COLLECTOR EDITIONS
          </span>
          <h1 className="text-4xl sm:text-6xl text-foreground font-normal">
            Fine Art Prints & Licensing
          </h1>
          <p className="italic text-lg sm:text-xl text-muted font-light leading-relaxed">
            &ldquo;Bringing the quiet dignity of wildlife and Himalayan horizons into spaces of
            contemplation, private collections, and architectural elegance.&rdquo;
          </p>
        </div>

        {/* ======================================================== */}
        {/* SECTION A: FINE ART PRINTS */}
        {/* ======================================================== */}
        <section id="fine-art-prints" className="mb-28">
          <div className="border-b border-border pb-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-muted font-sans font-semibold">
                SECTION A
              </span>
              <h2 className="text-3xl sm:text-4xl text-foreground">
                Limited Edition Fine Art Prints
              </h2>
            </div>
            <p className="text-xs font-sans text-muted max-w-sm">
              Every print is individually inspected, numbered, and hand-signed by Emran Ali with an
              embossed certificate of authenticity.
            </p>
          </div>

          {/* Museum Quality Standards Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 bg-card border border-border rounded-none space-y-3">
              <Layers className="w-5 h-5 text-foreground" />
              <h3 className="text-xl text-foreground">Hahnemühle 100% Cotton Rag</h3>
              <p className="text-xs text-muted font-sans leading-relaxed">
                Acid-free, 308gsm to 310gsm museum paper ensuring deep matte blacks, subtle gradient
                transitions, and zero optical brighteners.
              </p>
            </div>

            <div className="p-6 bg-card border border-border rounded-none space-y-3">
              <Shield className="w-5 h-5 text-foreground" />
              <h3 className="text-xl text-foreground">Archival Pigment Inks</h3>
              <p className="text-xs text-muted font-sans leading-relaxed">
                Printed using 11-channel UltraChrome pigment technology offering 100+ year
                lightfastness under conservation glass conditions.
              </p>
            </div>

            <div className="p-6 bg-card border border-border rounded-none space-y-3">
              <FileCheck className="w-5 h-5 text-foreground" />
              <h3 className="text-xl text-foreground">Signed Certificate of Authenticity</h3>
              <p className="text-xs text-muted font-sans leading-relaxed">
                Accompanied by a serialized, blind-embossed certificate verifying provenance, exact
                edition number, and date of impression.
              </p>
            </div>
          </div>

          {/* Selected Print Collections Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {prints.map(async (print) => {
              const photo = await getPhotographBySlug(print.photographSlug);
              if (!photo) return null;

              return (
                <div
                  key={print.id}
                  className="bg-card border border-border rounded-none overflow-hidden flex flex-col justify-between transition-all"
                >
                  <div>
                    {/* Print Preview with Mat Border & Gallery Shadow Effect */}
                    <div className="p-6 sm:p-10 bg-secondary border-b border-border flex items-center justify-center">
                      <div className="bg-card p-4 sm:p-6 max-w-md w-full border border-border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.imageUrl}
                          alt={photo.altText}
                          className="w-full h-auto object-cover"
                        />
                        <div className="mt-3 text-center text-[10px] uppercase tracking-widest text-muted">
                          Archival Fine Art Impression — {print.title}
                        </div>
                      </div>
                    </div>

                    {/* Print Specifications */}
                    <div className="p-6 sm:p-8 space-y-5">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-muted font-sans font-semibold">
                          {print.category}
                        </span>
                        <h3 className="text-2xl text-foreground leading-snug">{print.title}</h3>
                        <p className="text-xs text-muted font-sans">{photo.location}</p>
                      </div>

                      <div className="space-y-2 text-xs font-sans text-foreground/80">
                        <p>
                          <strong className="text-foreground">Medium:</strong> {print.paperType}
                        </p>
                        <p>
                          <strong className="text-foreground">Pigments:</strong> {print.inkType}
                        </p>
                        <p>
                          <strong className="text-foreground">Certificate:</strong>{' '}
                          {print.certificate}
                        </p>
                      </div>

                      {/* Available Dimensions */}
                      <div className="pt-3 border-t border-border space-y-2">
                        <span className="text-[10px] uppercase tracking-widest font-sans font-semibold text-foreground block">
                          Available Edition Sizes:
                        </span>
                        <div className="space-y-2">
                          {print.sizes.map((sz, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between text-xs font-sans bg-secondary p-2.5 rounded-none border border-border"
                            >
                              <div>
                                <span className="font-semibold text-foreground">
                                  {sz.dimensions}
                                </span>
                                <span className="text-muted block text-[11px]">
                                  {sz.description}
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] uppercase tracking-widest text-foreground font-semibold block">
                                  Ltd. {sz.editionLimit}
                                </span>
                                <span className="text-[11px] text-muted italic">
                                  Price on Request
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Print Action */}
                  <div className="p-6 bg-secondary border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted font-sans italic">
                      Framing and international shipping available
                    </span>
                    <a
                      href="#inquiry-section"
                      className="px-5 py-2.5 bg-primary text-primary-foreground hover:bg-neutral-800 text-xs uppercase tracking-widest font-sans transition-colors rounded-none font-medium"
                    >
                      Inquire This Print
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION B: IMAGE LICENSING */}
        {/* ======================================================== */}
        <section id="image-licensing" className="mb-24 pt-12 border-t border-border">
          <div className="border-b border-border pb-6 mb-12">
            <span className="text-xs uppercase tracking-widest text-muted font-sans font-semibold">
              SECTION B
            </span>
            <h2 className="text-3xl sm:text-4xl text-foreground">
              Commercial & Editorial Image Rights
            </h2>
            <p className="text-xs sm:text-sm font-sans text-muted mt-2 max-w-2xl leading-relaxed">
              Every photograph in Emran Ali&apos;s archive is available in original uncompressed RAW
              and master TIFF formats for editorial journalism, scientific publications, broadcast
              media, and corporate environmental campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {licenses.map((lic) => (
              <div
                key={lic.id}
                className="p-6 sm:p-8 bg-card border border-border rounded-none space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <h3 className="text-2xl text-foreground">{lic.title}</h3>
                  <p className="text-xs text-muted font-sans leading-relaxed">{lic.description}</p>

                  <div className="pt-2 space-y-1.5 text-xs font-sans text-foreground/80">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-foreground block">
                      Common Applications:
                    </span>
                    {lic.useCases.map((uc, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-foreground flex-shrink-0 mt-0.5" />
                        <span>{uc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border text-[11px] text-muted font-sans">
                  <strong>Standard Terms:</strong> {lic.rightsGranted}
                </div>
              </div>
            ))}
          </div>

          {/* Licensing Inquiry Form Anchor wrapped in Suspense */}
          <div id="inquiry-section" className="pt-12">
            <Suspense
              fallback={
                <div className="p-12 text-center text-xs font-sans text-muted">
                  Loading inquiry form...
                </div>
              }
            >
              <LicensingInquiryForm />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  );
}
