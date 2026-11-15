export interface PrintSizeOption {
  dimensions: string; // e.g. "12 × 18 in (30 × 45 cm)"
  editionLimit: number; // e.g. 25
  pricingModel: 'inquiry' | 'quote';
  description: string;
}

export interface FineArtPrintItem {
  id: string;
  photographSlug: string;
  title: string;
  category: string;
  paperType: string;
  inkType: string;
  certificate: string;
  sizes: PrintSizeOption[];
  framingOptions: string[];
  shippingNotes: string;
}

export interface LicensingOption {
  id: string;
  title: string;
  description: string;
  useCases: string[];
  rightsGranted: string;
}
