import { AwardItem } from '@/types/photographer';

export interface RecognitionSection {
  isVerified: boolean;
  disclaimer: string;
  items: AwardItem[];
}

export const awardsData: RecognitionSection = {
  isVerified: false,
  disclaimer:
    'Curated Demo Placeholders: The items listed below represent prototype recognition entries to illustrate gallery layout formatting. Verified honors will be published upon official submission confirmation.',
  items: [
    {
      id: 'aw01',
      year: '2024',
      title: 'Bengal Wildlife Photographer of the Year (Demo)',
      organization: 'Regional Natural History Guild',
      isPlaceholder: true,
      category: 'Avian Behavior Category',
    },
    {
      id: 'aw02',
      year: '2023',
      title: 'Himalayan Foothills Fine-Art Juried Exhibition (Demo)',
      organization: 'South Asian Visual Arts Forum',
      isPlaceholder: true,
      category: 'Landscape & Wilderness',
    },
    {
      id: 'aw03',
      year: '2023',
      title: 'Monsoon Conservation Storytelling Grant (Demo Finalist)',
      organization: 'Subcontinental Biodiversity Media Network',
      isPlaceholder: true,
      category: 'Documentary Field Narrative',
    },
    {
      id: 'aw04',
      year: '2022',
      title: 'National Geographic YourShot Daily Dozen Feature (Demo Placeholder)',
      organization: 'Editorial Curators Selection',
      isPlaceholder: true,
      category: 'Wildlife in Motion',
    },
  ],
};
