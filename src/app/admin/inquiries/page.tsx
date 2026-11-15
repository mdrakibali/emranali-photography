'use client';

import React, { useState } from 'react';
import { useCms } from '@/context/CmsContext';
import { InquiryStatus, InquiryType } from '@/types/inquiry';
import { Mail, CheckCircle2, Clock, Trash2, Users, Search, MessageSquare } from 'lucide-react';

export default function AdminInquiriesPage() {
  const { inquiries, subscribers, updateInquiryStatus, deleteInquiry } = useCms();

  const [activeTab, setActiveTab] = useState<'inquiries' | 'subscribers'>('inquiries');
  const [typeFilter, setTypeFilter] = useState<'all' | InquiryType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesType = typeFilter === 'all' || inq.type === typeFilter;
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const pendingCount = inquiries.filter((i) => i.status === 'pending').length;

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-[11px] font-semibold text-muted uppercase tracking-widest block">
            Communications &amp; Leads
          </span>
          <h1 className="text-3xl sm:text-4xl text-foreground font-normal mt-1">
            Client Inquiries &amp; Contacts
          </h1>
          <p className="text-xs sm:text-sm text-muted font-light mt-1">
            Review collectors seeking archival prints, art buyers requesting commercial licensing, and
            general inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-none cursor-pointer transition-colors ${
              activeTab === 'inquiries'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-foreground border border-border hover:bg-secondary'
            }`}
          >
            Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-none cursor-pointer transition-colors ${
              activeTab === 'subscribers'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-foreground border border-border hover:bg-secondary'
            }`}
          >
            Newsletter Readers ({subscribers.length})
          </button>
        </div>
      </div>

      {activeTab === 'inquiries' ? (
        <div className="space-y-6 animate-fadeIn">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-card border border-border">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search inquiries by client name, email, or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-background border border-border text-foreground rounded-none"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {(['all', 'print', 'licensing', 'general'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTypeFilter(filter)}
                  className={`px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider rounded-none cursor-pointer whitespace-nowrap transition-colors ${
                    typeFilter === filter
                      ? 'bg-primary text-primary-foreground font-semibold'
                      : 'bg-background text-foreground border border-border hover:border-foreground'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Inquiries Cards */}
          <div className="space-y-4">
            {filteredInquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-6 bg-card border border-border rounded-none space-y-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-foreground">{inq.name}</h3>
                      <span className="text-xs text-muted">({inq.email})</span>
                      <span
                        className={`text-[9px] uppercase tracking-wider px-2 py-0.5 font-semibold ${
                          inq.type === 'licensing'
                            ? 'bg-neutral-900 text-white'
                            : inq.type === 'print'
                            ? 'bg-neutral-200 text-neutral-800'
                            : 'bg-secondary text-foreground'
                        }`}
                      >
                        {inq.type}
                      </span>
                    </div>
                    {inq.photographTitle && (
                      <span className="text-xs text-muted italic block mt-0.5">
                        Referenced Photograph: &ldquo;{inq.photographTitle}&rdquo;
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted">{inq.date}</span>
                    <select
                      value={inq.status}
                      onChange={(e) =>
                        updateInquiryStatus(inq.id, e.target.value as InquiryStatus)
                      }
                      className="px-2.5 py-1 text-xs bg-background border border-border rounded-none cursor-pointer capitalize font-medium"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="replied">Replied</option>
                      <option value="archived">Archived</option>
                    </select>
                    <button
                      onClick={() => deleteInquiry(inq.id)}
                      className="p-1.5 text-muted hover:text-red-600 cursor-pointer"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                    Subject: {inq.subject}
                  </h4>
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed bg-background p-4 border border-border">
                    {inq.message}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a
                    href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>

                  <span
                    className={`text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 ${
                      inq.status === 'pending'
                        ? 'text-amber-800 bg-amber-100'
                        : inq.status === 'replied'
                        ? 'text-emerald-800 bg-emerald-100'
                        : 'text-muted bg-secondary'
                    }`}
                  >
                    Status: {inq.status}
                  </span>
                </div>
              </div>
            ))}

            {filteredInquiries.length === 0 && (
              <div className="py-16 text-center text-muted bg-card border border-border">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No client inquiries found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* TAB: Newsletter Subscribers */
        <div className="bg-card border border-border rounded-none overflow-hidden animate-fadeIn">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Verified Newsletter Subscribers ({subscribers.length})
            </h3>
            <span className="text-xs text-muted">Audience for quiet seasonal essays</span>
          </div>

          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-secondary/60 text-muted border-b border-border text-[10px] uppercase font-semibold tracking-wider">
              <tr>
                <th className="py-3 px-4">Subscriber Email</th>
                <th className="py-3 px-4">Subscribed Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-secondary/30">
                  <td className="py-3 px-4 font-medium text-foreground">{sub.email}</td>
                  <td className="py-3 px-4 text-muted">{sub.subscribedAt}</td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-300">
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
