'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Select option...',
  className = '',
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative inline-block w-full text-xs font-sans ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between px-3 py-2 text-left bg-background border border-border text-foreground transition-all rounded-none cursor-pointer focus:outline-hidden focus:border-foreground ${
          isOpen ? 'border-foreground shadow-xs' : ''
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate block font-medium">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted transition-transform duration-200 shrink-0 ml-2 ${
            isOpen ? 'rotate-180 text-foreground' : ''
          }`}
        />
      </button>

      {/* Floating Menu */}
      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-card border border-border shadow-lg max-h-60 overflow-y-auto rounded-none py-1 text-xs animate-fadeIn"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.value)}
                className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-secondary font-semibold text-foreground'
                    : 'text-foreground/90 hover:bg-secondary/60'
                }`}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-foreground shrink-0 ml-2" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
