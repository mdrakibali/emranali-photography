'use client';

import React from 'react';
import { StudioProvider } from '@/context/StudioContext';

export default function StudioProviderWrapper({ children }: { children: React.ReactNode }) {
  return <StudioProvider>{children}</StudioProvider>;
}

