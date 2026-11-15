'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudio } from '@/context/StudioContext';
import { Lock, Mail, ArrowRight, AlertCircle, Sparkles, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAuthenticated, login } = useStudio();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/admin');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const result = login(email, password);

    if (result.success) {
      router.replace('/admin');
    } else {
      setErrorMessage(result.error || 'Authentication failed. Please check your credentials.');
      setIsLoading(false);
    }
  };

  const handleUseDemoCredentials = () => {
    setEmail('admin@emranali.com');
    setPassword('admin123');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md space-y-8 animate-fadeIn">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Website</span>
        </Link>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <span className="font-brand text-3xl sm:text-4xl font-medium tracking-[0.14em] uppercase text-foreground block">
            Emran Ali
          </span>
          <span className="text-[10px] font-semibold tracking-[0.24em] uppercase text-muted block">
            Studio Administrative Access
          </span>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border p-6 sm:p-8 rounded-none shadow-sm space-y-6">
          <div className="border-b border-border pb-4">
            <h2 className="text-lg font-medium text-foreground">Sign In</h2>
            <p className="text-xs text-muted mt-0.5">
              Enter your authorized email and password to access the studio.
            </p>
          </div>

          {/* Custom Error Banner */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="email"
                  required
                  placeholder="admin@emranali.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-background border border-border text-foreground focus:outline-hidden focus:border-foreground rounded-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-background border border-border text-foreground focus:outline-hidden focus:border-foreground rounded-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 bg-primary hover:bg-neutral-800 text-primary-foreground text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors rounded-none cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? 'Verifying...' : 'Sign In to Studio'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="pt-4 border-t border-border/70 flex items-center justify-between text-[11px] text-muted">
            <span>Demo: admin@emranali.com / admin123</span>
            <button
              type="button"
              onClick={handleUseDemoCredentials}
              className="text-foreground hover:underline font-medium cursor-pointer"
            >
              Fill Demo
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] text-muted">
          Authorized personnel only. All access is session-verified.
        </p>
      </div>
    </div>
  );
}
