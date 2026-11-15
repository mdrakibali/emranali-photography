import { VideoItem } from '@/types/video';

export const videosData: VideoItem[] = [
  {
    id: 'v01',
    title: 'First Light of Kanchenjunga: Dawn over Northern Horizons',
    platform: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85',
    duration: '06:45',
    location: 'Tetulia, Panchagarh',
    captureDate: 'November 2024',
    description:
      '4K cinematic field documentary tracking the rare winter atmospheric inversion that reveals Mount Kanchenjunga glowing across northern tea gardens.',
    category: 'Himalayan Expeditions',
    isFeatured: true,
  },
  {
    id: 'v02',
    title: 'Twilight Vigil: The Secretive Bengal Fox of Kulik Basin',
    platform: 'instagram',
    videoUrl: 'https://www.instagram.com/',
    embedUrl:
      'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=1600&q=85',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=1600&q=85',
    duration: '01:15',
    location: 'Kulik River Basin, Thakurgaon',
    captureDate: 'October 2024',
    description:
      'Vertical field reel documenting an inquisitive Bengal fox kit cautiously surveying the grassland perimeter during golden hour.',
    category: 'Grassland Predators',
    isFeatured: true,
  },
  {
    id: 'v03',
    title: 'Avian Symphony: Purple Sunbirds & Micro-Optics at Dawn',
    platform: 'facebook',
    videoUrl: 'https://www.facebook.com/',
    embedUrl:
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1600&q=85',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1600&q=85',
    duration: '03:20',
    location: 'Thakurgaon Plains',
    captureDate: 'March 2024',
    description:
      'High-framerate telephoto study of iridescent male sunbirds displaying hover agility around flowering mango and hibiscus orchards.',
    category: 'Avian Biology',
    isFeatured: true,
  },
  {
    id: 'v04',
    title: 'The Great Gathering: Asian Openbills Along Tangon Riverbed',
    platform: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85',
    duration: '08:12',
    location: 'Tangon River, Thakurgaon',
    captureDate: 'December 2024',
    description:
      'Extensive multi-day observation tracking over 400 Asian Openbills foraging along seasonal sand spits and oxbow pools.',
    category: 'Wetland Ecology',
    isFeatured: false,
  },
];
