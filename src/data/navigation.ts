export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const navigationItems: NavItem[] = [
  {
    label: 'Portfolio',
    href: '/portfolio',
    description: 'Selected avian, wildlife, and landscape collections',
  },
  {
    label: 'About',
    href: '/about',
    description: 'Biography, field philosophy, and artistic journey',
  },
  {
    label: 'Journal',
    href: '/journal',
    description: 'Field notes, behind the lens, and wildlife essays',
  },
  {
    label: 'Conservation',
    href: '/conservation',
    description: 'Habitat protection and species awareness initiatives',
  },
  {
    label: 'Prints & Licensing',
    href: '/prints',
    description: 'Museum-grade fine-art prints and image rights',
  },
  {
    label: 'Contact',
    href: '/contact',
    description: 'Print inquiries, licensing, and editorial commissions',
  },
];

export const footerNavigation = {
  main: navigationItems,
  categories: [
    { label: 'Birds', href: '/portfolio?category=birds' },
    { label: 'Wildlife', href: '/portfolio?category=wildlife' },
    { label: 'Nature & Landscapes', href: '/portfolio?category=nature' },
    { label: 'Macro Photography', href: '/portfolio?category=macro' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#demo-privacy' },
    { label: 'Terms of Licensing', href: '#demo-terms' },
    { label: 'Ethics & Field Code', href: '#demo-ethics' },
  ],
};
