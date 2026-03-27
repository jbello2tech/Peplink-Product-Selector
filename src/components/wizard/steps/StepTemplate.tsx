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
      <h2 className="text-lg font-bold mb-1 leading-snug"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text)' }}>
        {title}
      </h2>
      <p className="text-sm mb-4" style={{ color: 'var(--color-text-dim)' }}>
        {subtitle}
      </p>
      {helpNote && (
        <div className="mb-4 px-3 py-2.5 rounded-lg text-xs leading-relaxed flex items-start gap-2"
          style={{
            background: 'var(--color-surface-3)',
            border: '1px solid var(--color-border-hi)',
            color: 'var(--color-text-dim)',
          }}>
          <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>ℹ</span>
          <span>{helpNote}</span>
        </div>
      )}
      <div className="space-y-2 stagger">
        {children}
      </div>
    </div>
  );
}
