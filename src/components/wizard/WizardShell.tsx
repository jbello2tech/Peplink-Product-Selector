'use client';

import { useWizardContext } from '@/context/WizardContext';
import { ProgressBar } from './ProgressBar';
import { StepRouter } from './StepRouter';
import { NavButtons } from './NavButtons';

export function WizardShell() {
  const { state, totalSteps } = useWizardContext();

  return (
    <div className="relative scanline"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '28px',
      }}>
      {/* Top-left corner accent */}
      <div className="absolute top-0 left-0 w-6 h-6 pointer-events-none"
        style={{
          borderTop: '2px solid var(--color-accent)',
          borderLeft: '2px solid var(--color-accent)',
          borderTopLeftRadius: '12px',
        }} />
      {/* Bottom-right corner accent */}
      <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none"
        style={{
          borderBottom: '2px solid var(--color-accent)',
          borderRight: '2px solid var(--color-accent)',
          borderBottomRightRadius: '12px',
        }} />

      <ProgressBar currentStep={state.currentStep} totalSteps={totalSteps} />

      <div className="mt-8">
        <StepRouter />
      </div>

      <NavButtons />
    </div>
  );
}
