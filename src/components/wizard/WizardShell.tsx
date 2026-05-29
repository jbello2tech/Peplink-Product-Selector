'use client';

import { useWizardContext } from '@/context/WizardContext';
import { ProgressBar } from './ProgressBar';
import { StepRouter } from './StepRouter';
import { NavButtons } from './NavButtons';

export function WizardShell() {
  const { state, totalSteps } = useWizardContext();

  return (
    <div
      className="relative text-left"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-hi)',
        borderRadius: '2px',
        padding: '32px',
      }}
    >
      <ProgressBar currentStep={state.currentStep} totalSteps={totalSteps} />

      <div className="mt-8">
        <StepRouter />
      </div>

      <NavButtons />
    </div>
  );
}
