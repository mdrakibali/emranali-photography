'use client';

import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, X } from 'lucide-react';

interface CustomConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function CustomConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning',
  onConfirm,
  onCancel,
}: CustomConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn"
    >
      <div className="relative w-full max-w-md bg-card border border-border p-6 shadow-2xl rounded-none space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {type === 'danger' && <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />}
            {type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />}
            {type === 'info' && <CheckCircle2 className="w-5 h-5 text-foreground shrink-0" />}
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="p-1 text-muted hover:text-foreground cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message */}
        <p className="text-xs sm:text-sm text-muted leading-relaxed">{message}</p>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
          {cancelText && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted hover:text-foreground border border-border cursor-pointer transition-colors"
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              type === 'danger'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-primary hover:bg-neutral-800 text-primary-foreground'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
