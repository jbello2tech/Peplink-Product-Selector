'use client';

import { ReactNode } from 'react';

interface StepTemplateProps {
  title: ReactNode;
  subtitle: ReactNode;
  helpNote?: ReactNode;
  children: ReactNode;
}

export function StepTemplate({ title, subtitle, helpNote, children }: StepTemplateProps) {
  return (
    <div className="animate-slide-up">
      <h2 className="kjj-heading text-xl mb-2">
        {title}
      </h2>
      <p className="text-sm mb-5" style={{ color: 'var(--color-text-dim)' }}>
        {subtitle}
      </p>
      {helpNote && (
        <div
          className="mb-5 px-4 py-3 text-xs leading-relaxed flex items-start gap-3"
          style={{
            background: 'var(--color-surface-2)',
            borderLeft: '2px solid var(--color-accent)',
            color: 'var(--color-text-dim)',
          }}
        >
          <span style={{ color: 'var(--color-accent)', flexShrink: 0, fontWeight: 400 }}>ℹ</span>
          <span>{helpNote}</span>
        </div>
      )}
      <div className="space-y-2 stagger">
        {children}
      </div>
    </div>
  );
}
