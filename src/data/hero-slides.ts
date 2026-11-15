import { HeroSlide } from '@/types/hero';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-01',
    slug: 'first-light-kanchenjunga',
    title: 'First Light of Kanchenjunga',
    species: 'Alpenglow on Mount Kanchenjunga',
    location: 'Tetulia, Panchagarh',
    region: 'Northern Bangladesh',
    category: 'Nature & Landscapes',
    imageUrl:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2400&q=90',
    altText:
      'Golden sunrise illuminating the snow peaks of Mount Kanchenjunga viewed from northern Bangladesh',
  },
  {
    id: 'slide-02',
    slug: 'bengal-fox-twilight-vigil',
    title: 'Twilight Vigil of the Bengal Fox',
    species: 'Vulpes bengalensis • Native Canid',
    location: 'Kulik River Grasslands',
    region: 'Thakurgaon, Bangladesh',
    category: 'Wildlife',
    imageUrl:
      'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=2400&q=90',
    altText: 'Bengal fox observing the camera cautiously in dry grassy riverbank scrub at dusk',
  },
  {
    id: 'slide-03',
    slug: 'purple-sunbird-nectar-dawn',
    title: 'Iridescent Sentinel: Purple Sunbird',
    species: 'Cinnyris asiaticus • Avian Wonder',
    location: 'Thakurgaon Plains',
    region: 'Northern Bangladesh',
    category: 'Birds',
    imageUrl:
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=2400&q=90',
    altText: 'Male Purple Sunbird with dark glossy metallic plumage feeding on morning nectar',
  },
  {
    id: 'slide-04',
    slug: 'dew-geometry-spider-silk',
    title: 'Labyrinth of Dew',
    species: 'Micro-Optics • Winter Dewdrops',
    location: 'Atwari, Panchagarh',
    region: 'Northern Bangladesh',
    category: 'Macro Photography',
    imageUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2400&q=90',
    altText: 'Macro photograph of morning dewdrops refracting light along an orb-weaver spider web',
  },
];

export const SLIDE_AUTOPLAY_DURATION = 6500; // 6.5 seconds
