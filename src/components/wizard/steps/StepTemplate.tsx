// Shared layout for all steps
'use client';

import { ReactNode } from 'react';

interface StepTemplateProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function StepTemplate({ title, subtitle, children }: StepTemplateProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-gray-900 mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-6">{subtitle}</p>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}
