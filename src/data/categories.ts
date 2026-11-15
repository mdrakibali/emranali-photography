import { PhotographyCategory } from '@/types/photograph';

export interface CategoryInfo {
  id: PhotographyCategory;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  count: number;
}

export const categoriesData: CategoryInfo[] = [
  {
    id: 'birds',
    title: 'Birds',
    subtitle: 'The Avian Chronicles',
    description:
      'From iridescent resident sunbirds in northern groves to elusive riverine kingfishers and winter migratory visitors from the Tibetan Plateau.',
    coverImage:
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1600&q=85',
    count: 7,
  },
  {
    id: 'wildlife',
    title: 'Wildlife',
    subtitle: 'Sentinels of the Grasslands & Forests',
    description:
      'Documenting the secretive existence of Bengal foxes, civets, jungle cats, and mammalian fauna coexisting along agrarian peripheries.',
    coverImage:
      'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1600&q=85',
    count: 5,
  },
  {
    id: 'nature',
    title: 'Nature & Landscapes',
    subtitle: 'Ephemeral Light & Himalayan Horizons',
    description:
      'Vast riverine plains of the Teesta and Kulik, winter morning fog over tea gardens, and the ethereal golden dawn upon Mount Kanchenjunga seen from Panchagarh.',
    coverImage:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
    count: 5,
  },
  {
    id: 'macro',
    title: 'Macro Photography',
    subtitle: 'The Unseen Microcosm',
    description:
      'Geometric dewdrops on spider silk, jewel beetles resting on monsoon leaves, and the subtle floral textures of northern Bengal flora.',
    coverImage:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85',
    count: 4,
  },
];

export const galleryFilterCategories = [
  { id: 'all', label: 'ALL' },
  { id: 'birds', label: 'BIRDS' },
  { id: 'wildlife', label: 'WILDLIFE' },
  { id: 'nature', label: 'NATURE & LANDSCAPES' },
  { id: 'macro', label: 'MACRO PHOTOGRAPHY' },
];
