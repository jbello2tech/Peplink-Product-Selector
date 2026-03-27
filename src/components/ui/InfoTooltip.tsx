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
          background: 'var(--color-surface-3)',
          border: '1px solid var(--color-border-hi)',
          color: 'var(--color-text-dim)',
          fontFamily: 'var(--font-mono)',
          lineHeight: 1,
        }}
        aria-label="More info"
      >
        ?
      </button>
      {open && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 text-xs leading-relaxed rounded-lg px-3 py-2.5 z-50 pointer-events-none"
          style={{
            background: 'var(--color-surface-3)',
            border: '1px solid var(--color-border-hi)',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-sans)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          {text}
          <span
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid var(--color-border-hi)',
            }}
          />
        </span>
      )}
    </span>
  );
}
