export type VideoPlatform = 'youtube' | 'facebook' | 'instagram';

export interface VideoItem {
  id: string;
  title: string;
  platform: VideoPlatform;
  videoUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
  duration: string;
  location: string;
  captureDate: string;
  description: string;
  category: string;
  isFeatured?: boolean;
}
