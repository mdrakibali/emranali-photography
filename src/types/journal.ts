export type JournalCategory =
  | 'Field Notes'
  | 'Behind the Photograph'
  | 'Wildlife Encounters'
  | 'Photography Journal'
  | 'Nature & Conservation';

export interface JournalContentBlock {
  type: 'paragraph' | 'quote' | 'heading' | 'image' | 'callout';
  content?: string;
  author?: string;
  imageUrl?: string;
  caption?: string;
  altText?: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: JournalCategory;
  coverImage: string;
  altText: string;
  location: string;
  publishedDate: string;
  readTime: string;
  excerpt: string;
  content: JournalContentBlock[];
  relatedPhotographs?: string[]; // Photograph slugs
  tags: string[];
}
