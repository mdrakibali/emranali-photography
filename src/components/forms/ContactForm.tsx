'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  inquiryType: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    inquiryType: 'licensing',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side validation check
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    // Static simulation of successful submission
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 600);
  };

  return (
    <div className="bg-card border border-border rounded-none p-6 sm:p-10">
      {status === 'success' ? (
        <div className="text-center py-8 space-y-4 animate-fadeIn">
          <CheckCircle2 className="w-12 h-12 text-foreground mx-auto" />
          <h3 className="text-2xl sm:text-3xl text-foreground">Message Sent Successfully</h3>
          <p className="text-sm text-muted font-sans max-w-md mx-auto leading-relaxed">
            Thank you, {formData.name}. Your inquiry has passed client-side validation. In the live
            production system, Emran Ali responds to all editorial, licensing, and fine-art
            inquiries directly.
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                setStatus('idle');
                setFormData({
                  name: '',
                  email: '',
                  subject: '',
                  inquiryType: 'general',
                  message: '',
                });
              }}
              className="text-xs text-foreground underline font-sans font-medium"
            >
              Send Another Note
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-semibold text-foreground block">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Arthur Pendelton"
                className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm font-sans rounded-none focus:outline-none focus:border-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-sans font-semibold text-foreground block">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="arthur@natgeo-publishing.org"
                className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm font-sans rounded-none focus:outline-none focus:border-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-semibold text-foreground block">
                Inquiry Type
              </label>
              <select
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm font-sans rounded-none focus:outline-none focus:border-foreground"
              >
                <option value="licensing">Image Licensing & Rights</option>
                <option value="prints">Fine-Art Print Acquisition</option>
                <option value="exhibition">Exhibition & Gallery Curation</option>
                <option value="assignment">Field Assignment & Expedition</option>
                <option value="general">General Naturalist Inquiry</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-sans font-semibold text-foreground block">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Bengal Fox Print 24x36 Inquiry"
                className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm font-sans rounded-none focus:outline-none focus:border-foreground"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-sans font-semibold text-foreground block">
              Message *
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your publication, exhibition concept, or print requirements..."
              className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm font-sans rounded-none focus:outline-none focus:border-foreground"
            />
          </div>

          {status === 'error' && (
            <p className="text-xs text-red-600 flex items-center gap-1.5 font-sans">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="cursor-pointer w-full py-3.5 bg-primary hover:bg-neutral-800 text-primary-foreground text-sm font-sans font-medium transition-colors flex items-center justify-center gap-2 rounded-none disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
          </button>

          <p className="text-xs text-muted text-center font-sans">
            (Static Prototype: Message validated locally. No database or external SMTP dispatch
            implemented in this phase.)
          </p>
        </form>
      )}
    </div>
  );
}
