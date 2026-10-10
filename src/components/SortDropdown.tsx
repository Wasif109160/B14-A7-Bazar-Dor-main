'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowDownUp, Check } from 'lucide-react';
import { SortOption } from '@/lib/types';

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'ডিফল্ট', value: 'default' },
  { label: 'দাম: কম থেকে বেশি', value: 'price-asc' },
  { label: 'দাম: বেশি থেকে কম', value: 'price-desc' },
];

export default function SortDropdown({ currentSort, onSortChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLabel = sortOptions.find((opt) => opt.value === currentSort)?.label || 'ডিফল্ট';

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-green-500/20 transition-all shadow-2xs"
        aria-expanded={isOpen}
      >
        <ArrowDownUp className="w-4 h-4 text-green-700" />
        <span>সাজান:</span>
        <span className="text-gray-900 font-bold">{currentLabel}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-green-700' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-30 mt-2 w-56 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 border border-gray-100 py-1.5 focus:outline-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            সাজানোর বিকল্প
          </div>
          {sortOptions.map((opt) => {
            const isSelected = opt.value === currentSort;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onSortChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm text-left transition-colors ${
                  isSelected
                    ? 'bg-green-50 text-green-800 font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-4 h-4 text-green-700" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
