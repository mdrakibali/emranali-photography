'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Phase 1 Static Data Mode: Simulate successful client-side validation
    setStatus('success');
    setErrorMessage('');
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {status === 'success' ? (
        <div className="p-6 bg-card border border-border rounded-none text-center text-sm font-sans text-foreground animate-fadeIn">
          <CheckCircle2 className="w-6 h-6 text-foreground mx-auto mb-2" />
          <p className="font-semibold text-base">Thank you for your interest.</p>
          <p className="text-xs text-muted mt-1">
            (Demo Mode: Client-side validation confirmed. In Phase 2, this will dispatch seasonal
            print and story dispatches.)
          </p>
          <button
            onClick={() => {
              setStatus('idle');
              setEmail('');
            }}
            className="mt-3 text-xs text-foreground underline font-sans font-medium hover:text-muted"
          >
            Register another address
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative flex flex-col sm:flex-row items-stretch gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="Enter your email for occasional field dispatches..."
              className="flex-1 px-4 py-3.5 bg-card border border-border text-foreground placeholder:text-muted text-sm font-sans rounded-none focus:outline-none focus:border-foreground transition-colors"
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              className="cursor-pointer px-6 py-3.5 bg-primary text-primary-foreground text-sm font-sans font-medium hover:bg-neutral-800 transition-colors inline-flex items-center justify-center gap-2 rounded-none"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {status === 'error' && (
            <p className="text-xs text-red-600 flex items-center gap-1 font-sans">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMessage}</span>
            </p>
          )}
        </form>
      )}
    </div>
  );
}
