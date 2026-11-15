export type InquiryType = 'print' | 'licensing' | 'general';
export type InquiryStatus = 'pending' | 'reviewed' | 'replied' | 'archived';

export interface ClientInquiry {
  id: string;
  name: string;
  email: string;
  type: InquiryType;
  subject: string;
  message: string;
  photographTitle?: string;
  date: string;
  status: InquiryStatus;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
}

