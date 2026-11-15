import {
  LayoutDashboard,
  Camera,
  BookOpen,
  FileText,
  Mail,
  Settings,
} from 'lucide-react';

export const studioNavItems = [
  {
    href: '/admin',
    label: 'Overview',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: '/admin/photographs',
    label: 'Photographs',
    icon: Camera,
  },
  {
    href: '/admin/journal',
    label: 'Journal & Essays',
    icon: BookOpen,
  },
  {
    href: '/admin/content',
    label: 'Pages & Bio',
    icon: FileText,
    badge: 'Editable',
  },
  {
    href: '/admin/inquiries',
    label: 'Client Inquiries',
    icon: Mail,
    hasCount: true,
  },
  {
    href: '/admin/settings',
    label: 'Site Settings',
    icon: Settings,
  },
];

export const photoCategoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'birds', label: 'Birds' },
  { value: 'wildlife', label: 'Wildlife' },
  { value: 'nature', label: 'Nature & Landscapes' },
  { value: 'macro', label: 'Macro Photography' },
];

export const photoCategorySelectOptions = [
  { value: 'birds', label: 'Birds' },
  { value: 'wildlife', label: 'Wildlife' },
  { value: 'nature', label: 'Nature & Landscapes' },
  { value: 'macro', label: 'Macro Photography' },
];

export const photoAspectRatioOptions = [
  { value: 'landscape', label: 'Landscape (3:2)' },
  { value: 'portrait', label: 'Portrait (3:4)' },
  { value: 'panoramic', label: 'Panoramic (16:9)' },
  { value: 'square', label: 'Square (1:1)' },
];

export const journalCategoryOptions = [
  { value: 'Field Notes', label: 'Field Notes' },
  { value: 'Behind the Photograph', label: 'Behind the Photograph' },
  { value: 'Wildlife Encounters', label: 'Wildlife Encounters' },
  { value: 'Photography Journal', label: 'Photography Journal' },
  { value: 'Nature & Conservation', label: 'Nature & Conservation' },
];

export const inquiryStatusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'replied', label: 'Replied' },
  { value: 'archived', label: 'Archived' },
];

export const inquiryTypeFilterOptions = [
  { value: 'all', label: 'All Inquiries' },
  { value: 'print', label: 'Print Acquisitions' },
  { value: 'licensing', label: 'Licensing' },
  { value: 'general', label: 'General Contacts' },
];
