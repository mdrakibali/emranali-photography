import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/layout/Footer';
import StudioProviderWrapper from '@/components/providers/StudioProviderWrapper';
import { siteSettings } from '@/data/site-settings';
import { generatePersonSchema } from '@/lib/seo';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${siteSettings.photographerName} | Wildlife & Nature Photographer`,
    template: `%s | ${siteSettings.photographerName}`,
  },
  description: siteSettings.defaultDescription,
  metadataBase: new URL(siteSettings.siteUrl),
  keywords: [
    'Emran Ali',
    'Wildlife Photographer Bangladesh',
    'Thakurgaon Nature Photography',
    'Kanchenjunga Panchagarh',
    'Bengal Fox',
    'Avian Photography',
    'Fine Art Nature Prints',
  ],
  authors: [{ name: siteSettings.photographerName }],
  creator: siteSettings.photographerName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteSettings.siteUrl,
    title: `${siteSettings.photographerName} | Wildlife & Nature Photographer`,
    description: siteSettings.defaultDescription,
    siteName: siteSettings.siteName,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = generatePersonSchema();

  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-foreground selection:text-background">
        <StudioProviderWrapper>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
        </StudioProviderWrapper>
      </body>
    </html>
  );
}
