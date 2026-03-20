'use client';

import { useWizardContext } from '@/context/WizardContext';
import { QUESTIONS } from '@/data/questions';
import { DeploymentType } from '@/lib/types';
import { OptionButton } from '@/components/ui/OptionButton';
import { StepTemplate } from './StepTemplate';

const q = QUESTIONS.find((q) => q.step === 1)!;

export function Step1DeploymentType() {
  const { currentAnswer, setAnswer } = useWizardContext();
  const selected = currentAnswer('deploymentType') as DeploymentType | undefined;

  return (
    <StepTemplate title={q.title} subtitle={q.subtitle}>
      {q.options.map((opt) => (
        <OptionButton
          key={opt.value}
          label={opt.label}
          description={opt.description}
          icon={opt.icon}
          selected={selected === opt.value}
          onClick={() => setAnswer('deploymentType', opt.value as DeploymentType)}
        />
      ))}
    </StepTemplate>
  );
}
