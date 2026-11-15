export interface ConservationStory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  focusArea: string;
  coverImage: string;
  altText: string;
  location: string;
  region: string;
  publishedDate: string;
  summary: string;
  challenge: string;
  photographicRole: string;
  fieldObservations: string[];
  callToAction: string;
  supportingImages: {
    url: string;
    caption: string;
    altText: string;
  }[];
  relatedPhotographs: string[];
}
