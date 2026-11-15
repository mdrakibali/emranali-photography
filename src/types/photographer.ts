export interface GearItem {
  category: string;
  items: string[];
}

export interface AwardItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  isPlaceholder: boolean;
  category: string;
}

export interface PhotographerProfile {
  name: string;
  title: string;
  tagline: string;
  portraitImage: string;
  fieldActionImage: string;
  avatarImage: string;
  experienceYears: string;
  specialty: string;
  location: {
    city: string;
    district: string;
    country: string;
    regionBio: string;
    coordinates: string;
  };
  shortBio: string;
  editorialBio: string[];
  philosophy: {
    quote: string;
    description: string[];
  };
  fieldJourney: {
    title: string;
    narrative: string[];
  };
  favoriteSubjects: {
    title: string;
    description: string;
  }[];
  gear: GearItem[];
  verifiedRecognitionNotice: string;
  socials: {
    platform: string;
    handle: string;
    url: string;
  }[];
  contactEmail: string;
}
