'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Photograph } from '@/types/photograph';
import { JournalArticle } from '@/types/journal';
import { PhotographerProfile } from '@/types/photographer';
import { ClientInquiry, NewsletterSubscriber, InquiryStatus } from '@/types/inquiry';
import { photographsData } from '@/data/photographs';
import { journalArticlesData } from '@/data/journal';
import { photographerData } from '@/data/photographer';
import { siteSettings as defaultSiteSettings } from '@/data/site-settings';
import { initialInquiriesData, initialSubscribersData } from '@/data/inquiries';

interface AdminUser {
  name: string;
  email: string;
  role: string;
}

interface StudioContextType {
  // Auth
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;

  // Data
  profile: PhotographerProfile;
  photographs: Photograph[];
  journal: JournalArticle[];
  inquiries: ClientInquiry[];
  subscribers: NewsletterSubscriber[];
  siteSettings: typeof defaultSiteSettings;
  isLoaded: boolean;

  // Methods
  updateProfile: (updated: Partial<PhotographerProfile>) => void;
  addPhotograph: (photo: Photograph) => void;
  updatePhotograph: (photo: Photograph) => void;
  deletePhotograph: (id: string) => void;
  toggleFeaturedPhotograph: (id: string) => void;
  addJournal: (article: JournalArticle) => void;
  updateJournal: (article: JournalArticle) => void;
  deleteJournal: (id: string) => void;
  updateInquiryStatus: (id: string, status: InquiryStatus) => void;
  deleteInquiry: (id: string) => void;
  updateSiteSettings: (settings: Partial<typeof defaultSiteSettings>) => void;
  resetToDefaults: () => void;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const STORAGE_DATA_KEY = 'emran_ali_studio_data_v1';
const STORAGE_AUTH_KEY = 'emran_ali_studio_auth_v1';

export function StudioProvider({ children }: { children: React.ReactNode }) {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  // Content State
  const [profile, setProfile] = useState<PhotographerProfile>(photographerData);
  const [photographs, setPhotographs] = useState<Photograph[]>(photographsData);
  const [journal, setJournal] = useState<JournalArticle[]>(journalArticlesData);
  const [inquiries, setInquiries] = useState<ClientInquiry[]>(initialInquiriesData);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(initialSubscribersData);
  const [siteSettings, setSiteSettings] = useState(defaultSiteSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      // Check auth session
      const savedAuth = localStorage.getItem(STORAGE_AUTH_KEY);
      if (savedAuth) {
        const parsedAuth = JSON.parse(savedAuth);
        if (parsedAuth.isAuth) {
          setIsAuthenticated(true);
          setAdminUser(parsedAuth.user || { name: 'Emran Ali', email: 'admin@emranali.com', role: 'Lead Naturalist' });
        }
      }

      // Check data state
      const savedData = localStorage.getItem(STORAGE_DATA_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.photographs) setPhotographs(parsed.photographs);
        if (parsed.journal) setJournal(parsed.journal);
        if (parsed.inquiries) setInquiries(parsed.inquiries);
        if (parsed.subscribers) setSubscribers(parsed.subscribers);
        if (parsed.siteSettings) setSiteSettings(parsed.siteSettings);
      }
    } catch (e) {
      console.warn('Failed to load Studio state from local storage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Login handler
  const login = useCallback((email: string, password: string) => {
    const trimmedEmail = email.trim().toLowerCase();

    // Default admin credentials: admin@emranali.com or emran@photography.com with password 'admin123'
    // (Also accepts any password matching 'admin' or 'admin123' or 'emranali' for easy testing)
    if (
      (trimmedEmail === 'admin@emranali.com' ||
        trimmedEmail === 'emran@photography.com' ||
        trimmedEmail.includes('admin') ||
        trimmedEmail.includes('emran')) &&
      (password === 'admin123' || password === 'admin' || password === 'emranali')
    ) {
      const user: AdminUser = {
        name: 'Emran Ali',
        email: trimmedEmail,
        role: 'Lead Naturalist & Administrator',
      };
      setIsAuthenticated(true);
      setAdminUser(user);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify({ isAuth: true, user }));
      }
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid email or password. Default demo credentials: admin@emranali.com / admin123',
    };
  }, []);

  // Logout handler
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setAdminUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_AUTH_KEY);
    }
  }, []);

  // Persist content state
  const persistState = useCallback(
    (
      newProfile = profile,
      newPhotographs = photographs,
      newJournal = journal,
      newInquiries = inquiries,
      newSubscribers = subscribers,
      newSettings = siteSettings
    ) => {
      if (typeof window === 'undefined') return;
      try {
        const stateToSave = {
          profile: newProfile,
          photographs: newPhotographs,
          journal: newJournal,
          inquiries: newInquiries,
          subscribers: newSubscribers,
          siteSettings: newSettings,
        };
        localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(stateToSave));
      } catch (e) {
        console.warn('Failed to persist Studio state:', e);
      }
    },
    [profile, photographs, journal, inquiries, subscribers, siteSettings]
  );

  // Profile Update
  const updateProfile = useCallback(
    (updated: Partial<PhotographerProfile>) => {
      setProfile((prev) => {
        const next = { ...prev, ...updated };
        persistState(next, photographs, journal, inquiries, subscribers, siteSettings);
        return next;
      });
    },
    [persistState, photographs, journal, inquiries, subscribers, siteSettings]
  );

  // Photograph CRUD
  const addPhotograph = useCallback(
    (newPhoto: Photograph) => {
      setPhotographs((prev) => {
        const next = [newPhoto, ...prev];
        persistState(profile, next, journal, inquiries, subscribers, siteSettings);
        return next;
      });
    },
    [persistState, profile, journal, inquiries, subscribers, siteSettings]
  );

  const updatePhotograph = useCallback(
    (updatedPhoto: Photograph) => {
      setPhotographs((prev) => {
        const next = prev.map((p) => (p.id === updatedPhoto.id ? updatedPhoto : p));
        persistState(profile, next, journal, inquiries, subscribers, siteSettings);
        return next;
      });
    },
    [persistState, profile, journal, inquiries, subscribers, siteSettings]
  );

  const deletePhotograph = useCallback(
    (id: string) => {
      setPhotographs((prev) => {
        const next = prev.filter((p) => p.id !== id);
        persistState(profile, next, journal, inquiries, subscribers, siteSettings);
        return next;
      });
    },
    [persistState, profile, journal, inquiries, subscribers, siteSettings]
  );

  const toggleFeaturedPhotograph = useCallback(
    (id: string) => {
      setPhotographs((prev) => {
        const next = prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p));
        persistState(profile, next, journal, inquiries, subscribers, siteSettings);
        return next;
      });
    },
    [persistState, profile, journal, inquiries, subscribers, siteSettings]
  );

  // Journal CRUD
  const addJournal = useCallback(
    (newArticle: JournalArticle) => {
      setJournal((prev) => {
        const next = [newArticle, ...prev];
        persistState(profile, photographs, next, inquiries, subscribers, siteSettings);
        return next;
      });
    },
    [persistState, profile, photographs, inquiries, subscribers, siteSettings]
  );

  const updateJournal = useCallback(
    (updatedArticle: JournalArticle) => {
      setJournal((prev) => {
        const next = prev.map((a) => (a.id === updatedArticle.id ? updatedArticle : a));
        persistState(profile, photographs, next, inquiries, subscribers, siteSettings);
        return next;
      });
    },
    [persistState, profile, photographs, inquiries, subscribers, siteSettings]
  );

  const deleteJournal = useCallback(
    (id: string) => {
      setJournal((prev) => {
        const next = prev.filter((a) => a.id !== id);
        persistState(profile, photographs, next, inquiries, subscribers, siteSettings);
        return next;
      });
    },
    [persistState, profile, photographs, inquiries, subscribers, siteSettings]
  );

  // Inquiries CRUD
  const updateInquiryStatus = useCallback(
    (id: string, status: InquiryStatus) => {
      setInquiries((prev) => {
        const next = prev.map((inq) => (inq.id === id ? { ...inq, status } : inq));
        persistState(profile, photographs, journal, next, subscribers, siteSettings);
        return next;
      });
    },
    [persistState, profile, photographs, journal, subscribers, siteSettings]
  );

  const deleteInquiry = useCallback(
    (id: string) => {
      setInquiries((prev) => {
        const next = prev.filter((inq) => inq.id !== id);
        persistState(profile, photographs, journal, next, subscribers, siteSettings);
        return next;
      });
    },
    [persistState, profile, photographs, journal, subscribers, siteSettings]
  );

  // Site Settings
  const updateSiteSettings = useCallback(
    (settings: Partial<typeof defaultSiteSettings>) => {
      setSiteSettings((prev) => {
        const next = { ...prev, ...settings };
        persistState(profile, photographs, journal, inquiries, subscribers, next);
        return next;
      });
    },
    [persistState, profile, photographs, journal, inquiries, subscribers]
  );

  // Reset to initial seed data
  const resetToDefaults = useCallback(() => {
    setProfile(photographerData);
    setPhotographs(photographsData);
    setJournal(journalArticlesData);
    setInquiries(initialInquiriesData);
    setSubscribers(initialSubscribersData);
    setSiteSettings(defaultSiteSettings);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_DATA_KEY);
    }
  }, []);

  return (
    <StudioContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        login,
        logout,
        profile,
        photographs,
        journal,
        inquiries,
        subscribers,
        siteSettings,
        isLoaded,
        updateProfile,
        addPhotograph,
        updatePhotograph,
        deletePhotograph,
        toggleFeaturedPhotograph,
        addJournal,
        updateJournal,
        deleteJournal,
        updateInquiryStatus,
        deleteInquiry,
        updateSiteSettings,
        resetToDefaults,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
}
