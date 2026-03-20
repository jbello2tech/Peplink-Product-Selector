'use client';

import { ReactNode } from 'react';

interface StepTemplateProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function StepTemplate({ title, subtitle, children }: StepTemplateProps) {
  return (
    <div className="animate-slide-up">
      <h2 className="text-lg font-bold mb-1 leading-snug"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text)' }}>
        {title}
      </h2>
      <p className="text-sm mb-5" style={{ color: 'var(--color-text-dim)' }}>
        {subtitle}
      </p>
      <div className="space-y-2 stagger">
        {children}
      </div>
    </div>
  );
}
