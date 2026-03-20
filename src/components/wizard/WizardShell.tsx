'use client';

import { useWizardContext } from '@/context/WizardContext';
import { ProgressBar } from './ProgressBar';
import { StepRouter } from './StepRouter';
import { NavButtons } from './NavButtons';

export function WizardShell() {
  const { state, totalSteps } = useWizardContext();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 w-full max-w-lg mx-auto">
      <ProgressBar currentStep={state.currentStep} totalSteps={totalSteps} />
      <div className="mt-8">
        <StepRouter />
      </div>
      <NavButtons />
    </div>
  );
}
