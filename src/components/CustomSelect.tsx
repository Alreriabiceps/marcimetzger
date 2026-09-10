import React, { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CustomSelectProps {
  id?: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  openId: string | null;
  setOpenId: (id: string | null) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  openId,
  setOpenId,
}) => {
  const autoId = useId();
  const selectId = id || autoId;
  const isOpen = openId === selectId;
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpenId(null);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, setOpenId]);

  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const active = listRef.current.querySelector('[data-active="true"]') as HTMLElement | null;
    active?.scrollIntoView({ block: 'nearest' });
  }, [isOpen, value]);

  return (
    <div ref={rootRef} className="relative">
      <span className="block text-[11px] uppercase tracking-[0.18em] text-[#c5a059] mb-2 font-medium">
        {label}
      </span>

      <button
        type="button"
        id={selectId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setOpenId(isOpen ? null : selectId)}
        className={`w-full min-h-11 flex items-center justify-between gap-3 bg-[#181a1f] border rounded-lg px-3.5 py-3 text-base sm:text-sm text-left transition-colors duration-200 ${
          isOpen
            ? 'border-[#c5a059] text-[#f2ede4]'
            : 'border-[#2a2d32] text-[#f2ede4] hover:border-[#c5a059]/50'
        }`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-[#c5a059] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          aria-labelledby={selectId}
          data-lenis-prevent
          className="custom-select-menu absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-56 overflow-y-auto rounded-lg border border-[#c5a059]/45 bg-[#14161a] shadow-[0_20px_50px_rgba(0,0,0,0.55)] py-1"
        >
          {options.map((option) => {
            const selected = option === value;
            return (
              <li key={option} role="option" aria-selected={selected}>
                <button
                  type="button"
                  data-active={selected ? 'true' : 'false'}
                  onClick={() => {
                    onChange(option);
                    setOpenId(null);
                  }}
                  className={`w-full min-h-11 text-left px-3.5 py-3 text-sm transition-colors ${
                    selected
                      ? 'bg-[#23262d] text-[#f2ede4]'
                      : 'text-[#cfcac0] hover:bg-[#1c1f25] hover:text-[#f2ede4]'
                  }`}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
