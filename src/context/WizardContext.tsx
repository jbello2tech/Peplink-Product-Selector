'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useWizard } from '@/hooks/useWizard';
import { RecommendationResult, WizardAnswers, WizardState } from '@/lib/types';

interface WizardContextValue {
  state: WizardState;
  totalSteps: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAnswer: (field: keyof WizardAnswers, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  complete: () => RecommendationResult[];
  reset: () => void;
  isLastStep: boolean;
  currentAnswer: (field: keyof WizardAnswers) => WizardAnswers[keyof WizardAnswers];
}

const WizardContext = createContext<WizardContextValue | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const wizard = useWizard();
  return <WizardContext.Provider value={wizard}>{children}</WizardContext.Provider>;
}

export function useWizardContext(): WizardContextValue {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizardContext must be used within WizardProvider');
  return ctx;
}
