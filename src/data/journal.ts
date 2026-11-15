import { JournalArticle } from '@/types/journal';

export const journalFilterCategories: { id: string; label: string }[] = [
  { id: 'all', label: 'ALL' },
  { id: 'Field Notes', label: 'FIELD NOTES' },
  { id: 'Behind the Photograph', label: 'BEHIND THE PHOTOGRAPH' },
  { id: 'Wildlife Encounters', label: 'WILDLIFE ENCOUNTERS' },
  { id: 'Photography Journal', label: 'PHOTOGRAPHY JOURNAL' },
  { id: 'Nature & Conservation', label: 'NATURE & CONSERVATION' },
];

export const journalArticlesData: JournalArticle[] = [
  {
    id: 'j01',
    slug: 'chasing-first-light-kanchenjunga',
    title: 'Chasing the First Light of Kanchenjunga',
    subtitle: 'A November vigil on the northern border plains of Panchagarh',
    category: 'Field Notes',
    coverImage:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=85',
    altText:
      'Golden sunlight hitting the snowfields of Kanchenjunga seen across Bangladeshi tea gardens',
    location: 'Panchagarh, Bangladesh',
    publishedDate: 'November 18, 2024',
    readTime: '6 min read',
    excerpt:
      "For only a few brief days each November, the haze over northern Bangladesh dissolves to unveil the white crown of the world's third highest peak. An account of patience, cold river mist, and optical alchemy.",
    content: [
      {
        type: 'paragraph',
        content:
          "To the casual traveler, Bangladesh is conceived as a land of deltaic waters, mangrove tides, and endless monsoon greens. Yet here in Tetulia, at the uppermost tip of the country's northern funnel, the geography whispers a different truth: you are standing upon the alluvial terrace of the Great Himalayas.",
      },
      {
        type: 'heading',
        content: 'The November Window',
      },
      {
        type: 'paragraph',
        content:
          'Each year between late October and late November, following the retreat of the southwest monsoon, atmospheric humidity drops precipitously. For four or five fleeting mornings, before the winter crop burning and dense low-altitude inversion layers take hold, the horizon turns impossibly transparent.',
      },
      {
        type: 'quote',
        content:
          'You look north across the tea shrubs, and suddenly, hovering in the sky where clouds ought to be, the jagged mass of Kanchenjunga rises like a frozen citadel.',
        author: 'Emran Ali, Field Journal',
      },
      {
        type: 'paragraph',
        content:
          'I reached the banks of the Mahananda River at 4:30 AM. The thermometer in my field bag read 11°C — sharp and invigorating for this latitude. The river gravel crunched underfoot. Across the water, border patrol outposts stood silent under lantern light.',
      },
      {
        type: 'image',
        imageUrl:
          'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1600&q=85',
        caption: 'Pre-dawn mist settling across the tea terraces of northern Panchagarh.',
        altText: 'Misty tea garden landscape in early morning light',
      },
      {
        type: 'heading',
        content: 'The Seven Minutes of Alpenglow',
      },
      {
        type: 'paragraph',
        content:
          'At 5:48 AM, the darkness began to soften into deep indigo. Slowly, the distant silhouette sharpened against the pale sky. And then, precisely at 6:04 AM, the miracle occurred.',
      },
      {
        type: 'paragraph',
        content:
          'While the plains below remained steeped in cold gray shadow, the summit of Kanchenjunga caught the first rays of the subterranean sun. The snow ignited in a vivid, burning salmon-orange. Through the 400mm lens, the glaciers looked like molten glass. It lasted seven minutes before the rising ground warmth created atmospheric mirages and the view surrendered once again to the veil of the plains.',
      },
      {
        type: 'callout',
        content:
          'Field Tip: When shooting distant mountain horizons across heated plains, shoot strictly within the first 15 minutes of sunrise before convection currents destroy optical sharpness.',
      },
    ],
    relatedPhotographs: ['first-light-kanchenjunga', 'tetulia-tea-garden-mist'],
    tags: ['Kanchenjunga', 'Panchagarh', 'Winter', 'Field Notes', 'Landscape'],
  },
  {
    id: 'j02',
    slug: 'whispers-of-the-grassland-fox',
    title: 'Whispers of the Grassland Fox',
    subtitle: 'Tracking Vulpes bengalensis along the dry riparian corridors of the Kulik',
    category: 'Wildlife Encounters',
    coverImage:
      'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=1800&q=85',
    altText: 'Bengal fox observing the viewer with keen amber eyes from a grassland ridge',
    location: 'Thakurgaon, Bangladesh',
    publishedDate: 'October 14, 2024',
    readTime: '8 min read',
    excerpt:
      'Small, nocturnal, and fiercely loyal to their underground dens, the Bengal fox lives in tenuous coexistence with farming communities. A week spent tracking their behavioral rhythms.',
    content: [
      {
        type: 'paragraph',
        content:
          'Unlike their larger northern relatives, the Bengal fox is a diminutive canid built for sprint agility in dry scrub and open grasslands. With their prominent black-tipped bushy tails and enormous auditory ears, they are master hunters of orthopteran insects, field mice, and fallen jujube fruits.',
      },
      {
        type: 'quote',
        content:
          "In our folklore, the fox is cast as a mischievous trickster. In ecological reality, they are the unsung guardians of the farmer's grain, consuming thousands of rodents each season.",
        author: 'Emran Ali',
      },
      {
        type: 'paragraph',
        content:
          'Finding a functional den along the Kulik River required days of walking along sand ridges, examining fresh scratch marks and scent mounds. Once located, the prime ethical imperative was absolute non-intrusion: setting up my hide 40 meters away downwind, draped in natural hessian cloth, arriving two hours before dusk and remaining motionless until deep twilight.',
      },
      {
        type: 'image',
        imageUrl:
          'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1600&q=85',
        caption: 'Agrarian borders where wild scrub and cultivated mustard fields merge.',
        altText: 'Agrarian scrubland edge in golden afternoon light',
      },
      {
        type: 'paragraph',
        content:
          'As agricultural mechanization increases and traditional fallow scrublands are reclaimed for high-yield cash crops, the breeding territory of this native predator is contracting. Documenting their dignity is the first step toward advocating for their protection.',
      },
    ],
    relatedPhotographs: ['bengal-fox-twilight-vigil', 'jungle-cat-mustard-blossoms'],
    tags: ['Bengal Fox', 'Wildlife', 'Thakurgaon', 'Ethical Photography', 'Mammals'],
  },
  {
    id: 'j03',
    slug: 'silence-in-the-mangrove-maze',
    title: 'Silence in the Mangrove Maze',
    subtitle: 'Waiting for the brown-winged kingfisher in the tidal channels of the Sundarbans',
    category: 'Behind the Photograph',
    coverImage:
      'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=1800&q=85',
    altText: 'Kingfisher perched on pneumatic roots in tidal mangrove waters',
    location: 'Sundarbans Biosphere, Bangladesh',
    publishedDate: 'July 29, 2024',
    readTime: '7 min read',
    excerpt:
      'Navigating silent wooden canoes through pneumatophore-choked channels at low tide, where patience is measured between the rise and fall of muddy tidal waters.',
    content: [
      {
        type: 'paragraph',
        content:
          'The mangrove forest does not permit haste. Every movement is dictated by the gravitational pull of the moon. In the narrow tidal creeks of the Sundarbans, a wooden dinghy can only navigate when the tide is high enough to float, yet kingfishers hunt best when the tide recedes to reveal trapped mudskippers on the slick creek banks.',
      },
      {
        type: 'paragraph',
        content:
          'Sitting in absolute stillness while swarms of estuarine mosquitoes probe your canvas shirt is the tax every wildlife photographer pays here. But when a flash of turquoise and chestnut alights upon an exposed mangrove root five meters away, the world contracts into pure optical ecstasy.',
      },
    ],
    relatedPhotographs: ['common-kingfisher-perch', 'white-throated-kingfisher-monsoon'],
    tags: ['Sundarbans', 'Kingfisher', 'Mangroves', 'Tidal Ecosystem', 'Field Notes'],
  },
  {
    id: 'j04',
    slug: 'tanguar-haor-winter-wings',
    title: 'The Great Winter Congregation at Tanguar Haor',
    subtitle: 'Documenting thousands of migratory waterfowl beneath the Meghalaya hills',
    category: 'Nature & Conservation',
    coverImage:
      'https://images.unsplash.com/photo-1470114716159-e389f8712fda?auto=format&fit=crop&w=1800&q=85',
    altText:
      'Flocks of migratory ducks rising above vast wetland waters with mountains in the background',
    location: 'Sunamganj, Bangladesh',
    publishedDate: 'January 26, 2024',
    readTime: '5 min read',
    excerpt:
      'As freezing blizzards blanket Siberia and Central Asia, hundreds of thousands of ducks, geese, and waders arrive in the freshwater wetlands of Sunamganj. A chronicle of avian resilience.',
    content: [
      {
        type: 'paragraph',
        content:
          'Tanguar Haor is a Ramsar wetland site of extraordinary international importance. Located directly beneath the sheer green cliffs of the Meghalaya plateau, its crystal freshwater hosts an immense biodiversity of submerged macrophytes and benthic organisms.',
      },
      {
        type: 'paragraph',
        content:
          'Photographing here requires working with local community boatmen who know every shallow sandbar. We drift with dead engines into the morning mist, accompanied only by the soft chorus of whistling ducks and Northern Pintails feeding on aquatic grasses.',
      },
    ],
    relatedPhotographs: ['asian-openbill-winter-colony', 'mist-over-kulik-river'],
    tags: ['Tanguar Haor', 'Migratory Birds', 'Wetlands', 'Conservation', 'Bangladesh'],
  },
];
