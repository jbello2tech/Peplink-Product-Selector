'use client';

import { useRouter } from 'next/navigation';
import { useWizardContext } from '@/context/WizardContext';
import { WizardAnswers } from '@/lib/types';

function hasAnswer(answers: WizardAnswers, step: number): boolean {
  const stepFieldMap: Record<number, keyof WizardAnswers> = {
    1: 'deploymentType',
    2: 'wanTypes',
    3: 'numWANs',
    4: 'cellularGen',
    5: 'userCount',
    6: 'speedFusion',
    7: 'wifiNeeded',
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
    <div className="flex gap-3 mt-8">
      <button
        onClick={prevStep}
        disabled={currentStep === 1}
        className="kjj-btn kjj-btn--ghost"
      >
        ← Back
      </button>

      <button
        onClick={handleNext}
        disabled={!canAdvance}
        className="kjj-btn kjj-btn--primary flex-1"
      >
        {isLastStep ? 'Get Recommendations' : `Continue · ${currentStep}/${totalSteps}`}
      </button>
    </div>
  );
}
