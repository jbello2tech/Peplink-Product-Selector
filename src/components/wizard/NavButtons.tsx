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
    <div className="flex gap-3 mt-8">
      <button
        onClick={prevStep}
        disabled={currentStep === 1}
        className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600
          hover:border-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        Back
      </button>
      <button
        onClick={handleNext}
        disabled={!canAdvance}
        className="flex-[2] px-4 py-3 rounded-xl text-sm font-semibold text-white
          bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        {isLastStep ? 'See My Recommendations →' : `Next  (${currentStep}/${totalSteps})`}
      </button>
    </div>
  );
}
