import { ClientInquiry, NewsletterSubscriber } from '@/types/inquiry';

export const initialInquiriesData: ClientInquiry[] = [
  {
    id: 'inq-01',
    name: 'Dr. Tariqul Islam',
    email: 'tariqul.islam@wildlife-asia.org',
    type: 'licensing',
    subject: 'Book Editorial: Avian Species of Northern Bengal',
    photographTitle: 'Iridescent Sentinel: Purple Sunbird',
    message:
      'We are publishing an academic monograph on migratory birds across South Asia and would love to license your high-resolution Purple Sunbird photograph for our chapter lead.',
    date: '2026-11-12',
    status: 'pending',
  },
  {
    id: 'inq-02',
    name: 'Sarah Jenkins',
    email: 'sjenkins@fineartcollection.co.uk',
    type: 'print',
    subject: 'Limited Edition 24x36 Archival Print Inquiry',
    photographTitle: 'Twilight Vigil of the Bengal Fox',
    message:
      'I am interested in acquiring an archival pigment print on Hahnemühle Photo Rag for our private collection in London. Do you provide signed certificates of authenticity?',
    date: '2026-11-10',
    status: 'reviewed',
  },
  {
    id: 'inq-03',
    name: 'Nayeem Chowdhury',
    email: 'nayeem.nature@gmail.com',
    type: 'general',
    subject: 'Field Workshop in Thakurgaon',
    message:
      'Hello Emran, I really admire your quiet fieldcraft and ethics. Do you organize field observation tours in Panchagarh for spotting Kanchenjunga dawn birds?',
    date: '2026-11-08',
    status: 'replied',
  },
];

export const initialSubscribersData: NewsletterSubscriber[] = [
  {
    id: 'sub-01',
    email: 'curator@bengal-wildlife.org',
    subscribedAt: '2026-11-01',
    status: 'active',
  },
  {
    id: 'sub-02',
    email: 'himalayan.avian@flyway.net',
    subscribedAt: '2026-11-04',
    status: 'active',
  },
  {
    id: 'sub-03',
    email: 'printbuyer@contemporaryart.bd',
    subscribedAt: '2026-11-09',
    status: 'active',
  },
];
