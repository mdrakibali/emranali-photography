export type PhotographyCategory = 'birds' | 'wildlife' | 'nature' | 'macro';

export type AspectRatioType = 'landscape' | 'portrait' | 'square' | 'panoramic';

export interface ExifData {
  camera?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: string;
}

export interface Photograph {
  id: string;
  slug: string;
  title: string;
  species: string;
  scientificName?: string;
  category: PhotographyCategory;
  imageUrl: string;
  thumbnailUrl?: string;
  altText: string;
  aspectRatio: AspectRatioType;
  location: string;
  region: string;
  captureYear: string;
  captureDate: string;
  description: string;
  story: string[];
  fieldNotes?: string;
  isFeatured: boolean;
  isAvailableForPrint: boolean;
  isAvailableForLicense: boolean;
  exif: ExifData;
  tags: string[];
}
