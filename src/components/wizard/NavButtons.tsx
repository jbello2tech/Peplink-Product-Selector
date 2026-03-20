'use client';

import { useRouter } from 'next/navigation';
import { useWizardContext } from '@/context/WizardContext';
import { WizardAnswers } from '@/lib/types';

function hasAnswer(answers: WizardAnswers, step: number): boolean {
  const stepFieldMap: Record<number, keyof WizardAnswers> = {
    1: 'deploymentType',
    2: 'numWANs',
    3: 'wanTypes',
    4: 'cellularGen',
    5: 'userCount',
    6: 'speedFusion',
    7: 'budgetRange',
    8: 'wifiNeeded',
  };
  const field = stepFieldMap[step];
  if (!field) return true;
  const val = answers[field];
  if (Array.isArray(val)) return val.length > 0;
  return val !== undefined;
}

export function NavButtons() {
  const router = useRouter();
  const { state, totalSteps, nextStep, prevStep, complete, isLastStep } = useWizardContext();
  const { currentStep, answers } = state;

  const canAdvance = hasAnswer(answers, currentStep);

  function handleNext() {
    if (isLastStep) {
      complete();
      router.push('/results');
    } else {
      nextStep();
    }
  }

  return (
    <div className="flex gap-2 mt-7">
      <button
        onClick={prevStep}
        disabled={currentStep === 1}
        className="px-4 py-3 rounded-lg text-sm font-bold tracking-wide transition-all duration-150 disabled:opacity-25 disabled:cursor-not-allowed"
        style={{
          fontFamily: 'var(--font-mono)',
          background: 'var(--color-surface-2)',
          border: '1px solid var(--color-border-hi)',
          color: 'var(--color-text-dim)',
        }}
      >
        ← Back
      </button>

      <button
        onClick={handleNext}
        disabled={!canAdvance}
        className="flex-1 py-3 px-4 rounded-lg text-sm font-bold tracking-wide transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed relative overflow-hidden group"
        style={{
          fontFamily: 'var(--font-mono)',
          background: canAdvance ? 'var(--color-accent)' : 'var(--color-surface-2)',
          border: `1px solid ${canAdvance ? 'var(--color-accent)' : 'var(--color-border)'}`,
          color: canAdvance ? '#fff' : 'var(--color-text-muted)',
          boxShadow: canAdvance ? '0 0 20px var(--color-accent-glow)' : 'none',
        }}
      >
        {/* Shimmer */}
        {canAdvance && (
          <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-white/10 skew-x-12 pointer-events-none" />
        )}
        <span className="relative">
          {isLastStep ? 'Get Recommendations →' : `Continue  ${currentStep}/${totalSteps} →`}
        </span>
      </button>
    </div>
  );
}
