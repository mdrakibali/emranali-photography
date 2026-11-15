import { FineArtPrintItem, LicensingOption } from '@/types/print';

export const fineArtPrintsData: FineArtPrintItem[] = [
  {
    id: 'fap01',
    photographSlug: 'first-light-kanchenjunga',
    title: 'First Light of Kanchenjunga',
    category: 'Himalayan Landscapes',
    paperType: 'Hahnemühle Photo Rag 308gsm, 100% Cotton, Acid-Free Museum Quality',
    inkType: 'Archival UltraChrome HDX Pigment Inks (100+ Year Lightfastness Guarantee)',
    certificate:
      'Includes Embossed & Hand-Signed Certificate of Authenticity with Unique Serialized Hologram',
    sizes: [
      {
        dimensions: '16 × 24 in (40 × 60 cm)',
        editionLimit: 30,
        pricingModel: 'inquiry',
        description: 'Collector Edition, numbered and signed verso.',
      },
      {
        dimensions: '24 × 36 in (60 × 90 cm)',
        editionLimit: 15,
        pricingModel: 'inquiry',
        description: 'Large Exhibition Edition, accompanied by archival white cotton mat.',
      },
      {
        dimensions: '36 × 54 in (90 × 137 cm)',
        editionLimit: 5,
        pricingModel: 'inquiry',
        description: 'Monumental Master Edition, custom-built wooden transport crate.',
      },
    ],
    framingOptions: [
      'Unframed (Shipped in Heavy Reinforced Archival Tubing)',
      'Solid Natural Oak Frame with Tru-Vue UltraVue 70 UV Anti-Reflective Glass',
      'Matte Black Aluminum Float Mount for Contemporary Presentation',
    ],
    shippingNotes:
      'Worldwide insured art courier dispatch. Every print is inspected personally before hand-signing.',
  },
  {
    id: 'fap02',
    photographSlug: 'bengal-fox-twilight-vigil',
    title: 'Twilight Vigil of the Bengal Fox',
    category: 'Wildlife Portraits',
    paperType: 'Canson Infinity Baryta Photographique II 310gsm',
    inkType: '12-Color Archival Pigment Inks for Deep Shadow Dmax and Luminous Warm Tones',
    certificate: 'Numbered Collector Certificate signed by Emran Ali',
    sizes: [
      {
        dimensions: '12 × 18 in (30 × 45 cm)',
        editionLimit: 25,
        pricingModel: 'inquiry',
        description: 'Intimate Studio Edition.',
      },
      {
        dimensions: '20 × 30 in (50 × 75 cm)',
        editionLimit: 12,
        pricingModel: 'inquiry',
        description: 'Selected Gallery Edition.',
      },
    ],
    framingOptions: [
      'Unframed in Archival Glassine Wrapper',
      'Handmade Walnut Timber Frame with 4-Ply Museum Rag Matboard',
    ],
    shippingNotes: 'Dispatched from Dhaka/Thakurgaon studio via expedited insured courier.',
  },
  {
    id: 'fap03',
    photographSlug: 'common-kingfisher-perch',
    title: 'Turquoise Arrow: Common Kingfisher',
    category: 'Avian Fine Art',
    paperType: 'Hahnemühle German Etching 310gsm Textured Fine Art Velvet',
    inkType: 'UltraChrome Pro Pigment Inks with Enhanced Cyan/Magenta Gamut',
    certificate: 'Hand-Signed and Blind-Stamped Certificate of Authenticity',
    sizes: [
      {
        dimensions: '12 × 18 in (30 × 45 cm)',
        editionLimit: 25,
        pricingModel: 'inquiry',
        description: 'Fine Art Avian Edition.',
      },
      {
        dimensions: '16 × 24 in (40 × 60 cm)',
        editionLimit: 15,
        pricingModel: 'inquiry',
        description: 'Archival Exhibition Edition.',
      },
    ],
    framingOptions: ['Unframed', 'Natural Ash Frame with Museum Non-Glare UV Acrylic'],
    shippingNotes: 'Ships flat or rolled depending on dimension with full transit tracking.',
  },
  {
    id: 'fap04',
    photographSlug: 'dew-geometry-spider-silk',
    title: 'Labyrinth of Dew',
    category: 'Macro & Organic Abstract',
    paperType: 'Hahnemühle FineArt Pearl 285gsm Subtle Luster',
    inkType: 'Monochrome & Full Gamut Archival Carbon Pigments',
    certificate: 'Embossed Collector Document with Print Edition Number',
    sizes: [
      {
        dimensions: '16 × 16 in (40 × 40 cm)',
        editionLimit: 20,
        pricingModel: 'inquiry',
        description: 'Square Studio Edition.',
      },
      {
        dimensions: '24 × 24 in (60 × 60 cm)',
        editionLimit: 10,
        pricingModel: 'inquiry',
        description: 'Museum Square Display Edition.',
      },
    ],
    framingOptions: ['Unframed', 'Minimalist White Shadowbox with Deep Spacer'],
    shippingNotes: 'Custom crated for optimal surface protection.',
  },
];

export const licensingOptionsData: LicensingOption[] = [
  {
    id: 'lic-editorial',
    title: 'Editorial & Scientific Publishing',
    description:
      'For print magazines, wildlife journals, academic texts, environmental monographs, and documentary journalism.',
    useCases: [
      'Print book interior or cover illustration',
      'Magazine feature articles and natural history publications',
      'Non-profit educational research and species guides',
    ],
    rightsGranted:
      'Non-exclusive, one-time or multi-language print and digital editorial rights for specified print run.',
  },
  {
    id: 'lic-commercial',
    title: 'Commercial & Advertising Campaigns',
    description:
      'For corporate sustainability branding, packaging, exhibition booths, environmental reporting, and advertising.',
    useCases: [
      'Brand marketing collateral and seasonal campaigns',
      'Eco-tourism, sustainable enterprise, and organic product packaging',
      'Out-of-home (OOH) billboards and retail exhibition displays',
    ],
    rightsGranted:
      'Specified term (1–3 years) with customizable geographic territory and exclusivity tiers.',
  },
  {
    id: 'lic-digital',
    title: 'Digital & Broadcast Media',
    description:
      'For website banners, documentary streaming overlays, high-resolution broadcast backdrops, and interactive web apps.',
    useCases: [
      'Hero banners on corporate or institutional websites',
      'Documentary video background assets and title cards',
      'Mobile application illustrative visuals',
    ],
    rightsGranted: 'Worldwide digital distribution with resolution caps matching delivery spec.',
  },
];
