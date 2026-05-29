'use client';

import { useState } from 'react';

interface InfoTooltipProps {
  text: string;
}

export function InfoTooltip({ text }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex items-center ml-1.5" style={{ verticalAlign: 'middle' }}>
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 cursor-help"
        style={{
          background: 'transparent',
          border: '1px solid var(--color-border-hi)',
          color: 'var(--color-text-dim)',
          lineHeight: 1,
          fontWeight: 300,
        }}
        aria-label="More info"
      >
        ?
      </button>
      {open && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 text-xs leading-relaxed px-3 py-2.5 z-50 pointer-events-none"
          style={{
            background: 'var(--color-text)',
            color: '#fff',
            borderRadius: '2px',
            fontWeight: 300,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          }}
        >
          {text}
          <span
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid var(--color-text)',
            }}
          />
        </span>
      )}
    </span>
  );
}
