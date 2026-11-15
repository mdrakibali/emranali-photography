'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface LicensingFormData {
  name: string;
  email: string;
  company: string;
  photoTitleOrSlug: string;
  inquiryType: 'licensing' | 'print' | 'both';
  territory: string;
  message: string;
}

interface LicensingInquiryFormProps {
  initialPhotoTitle?: string;
  initialInquiryType?: 'licensing' | 'print' | 'both';
}

export default function LicensingInquiryForm({
  initialPhotoTitle = '',
  initialInquiryType = 'print',
}: LicensingInquiryFormProps) {
  const [formData, setFormData] = useState<LicensingFormData>({
    name: '',
    email: '',
    company: '',
    photoTitleOrSlug: initialPhotoTitle,
    inquiryType: initialInquiryType,
    territory: 'worldwide',
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

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all mandatory fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please provide a valid business or personal email.');
      return;
    }

    // Static Prototype Validation
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 600);
  };

  return (
    <div className="bg-card border border-border rounded-none p-6 sm:p-10 max-w-2xl mx-auto">
      {status === 'success' ? (
        <div className="text-center py-8 space-y-4 animate-fadeIn">
          <CheckCircle2 className="w-12 h-12 text-foreground mx-auto" />
          <h3 className="text-2xl sm:text-3xl text-foreground">Inquiry Registered Successfully</h3>
          <p className="text-sm text-muted font-sans max-w-md mx-auto leading-relaxed">
            Thank you, {formData.name}. In this static prototype phase, submissions are validated
            client-side. In the production deployment, Emran Ali responds directly within 24 to 48
            hours with high-resolution proofs, edition certificates, and customized usage
            agreements.
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                setStatus('idle');
                setFormData({
                  name: '',
                  email: '',
                  company: '',
                  photoTitleOrSlug: '',
                  inquiryType: 'print',
                  territory: 'worldwide',
                  message: '',
                });
              }}
              className="text-xs text-foreground underline font-sans font-medium hover:text-muted"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl text-foreground">Print & Licensing Inquiry Dossier</h3>
            <p className="text-xs text-muted font-sans">
              All fine-art print editions and image licenses are processed through individual
              consultation to guarantee archival authenticity and bespoke licensing scope.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-semibold text-foreground block">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Dr. Julian Vance"
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
                placeholder="julian@vance-curatorial.co.uk"
                className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm font-sans rounded-none focus:outline-none focus:border-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-semibold text-foreground block">
                Organization / Publication
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. BBC Wildlife Magazine / Private Collection"
                className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm font-sans rounded-none focus:outline-none focus:border-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-sans font-semibold text-foreground block">
                Photograph Title / Series
              </label>
              <input
                type="text"
                name="photoTitleOrSlug"
                value={formData.photoTitleOrSlug}
                onChange={handleChange}
                placeholder="e.g. First Light Over Kanchenjunga"
                className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm font-sans rounded-none focus:outline-none focus:border-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-semibold text-foreground block">
                Inquiry Category
              </label>
              <select
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm font-sans rounded-none focus:outline-none focus:border-foreground"
              >
                <option value="print">Fine-Art Limited Edition Print</option>
                <option value="licensing">Commercial / Editorial Licensing</option>
                <option value="both">Both Print & Licensing Rights</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-sans font-semibold text-foreground block">
                Licensing Scope / Territory
              </label>
              <select
                name="territory"
                value={formData.territory}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm font-sans rounded-none focus:outline-none focus:border-foreground"
              >
                <option value="worldwide">Worldwide All Media</option>
                <option value="regional">National / Regional Territory</option>
                <option value="editorial">Book / Magazine Editorial Only</option>
                <option value="digital">Web & Digital Media Only</option>
                <option value="private">Private Collector Domestic Display</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-sans font-semibold text-foreground block">
              Inquiry Details & Specifications *
            </label>
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Specify desired print dimensions (e.g. 24x36 in), framing preferences, or intended print-run and license duration..."
              className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm font-sans rounded-none focus:outline-none focus:border-foreground"
            />
          </div>

          {status === 'error' && (
            <p className="text-xs text-red-600 flex items-center gap-1.5 font-sans">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="cursor-pointer w-full py-3.5 bg-primary hover:bg-neutral-800 text-primary-foreground text-sm font-sans font-medium transition-colors flex items-center justify-center gap-2 rounded-none disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{status === 'submitting' ? 'Validating...' : 'Submit Inquiry'}</span>
            </button>
            <p className="text-xs text-muted text-center mt-2 font-sans">
              (Notice: Phase 1 Prototype. Inquiries are validated client-side with no financial
              transaction performed.)
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
