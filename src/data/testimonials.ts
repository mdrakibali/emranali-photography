export interface TestimonialItem {
  id: string;
  quote: string;
  curatorName: string;
  title: string;
  affiliation: string;
  isDemo: boolean;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: 't01',
    quote:
      "Emran's frames possess that rare stillness that cannot be manufactured through digital trickery. He captures the northern plains of Bangladesh with the contemplative reverence of a classical painter.",
    curatorName: 'Farhan Kabir (Demo)',
    title: 'Senior Arts Curator',
    affiliation: 'South Asian Fine Print Guild',
    isDemo: true,
  },
  {
    id: 't02',
    quote:
      'The patience required to photograph Bengal foxes at the edge of active agricultural fields while ensuring zero habitat disturbance exemplifies ethical wildlife photography at its finest.',
    curatorName: 'Dr. Ananya Roy (Demo)',
    title: 'Ecologist & Biodiversity Author',
    affiliation: 'Riparian Habitat Conservation Circle',
    isDemo: true,
  },
];
