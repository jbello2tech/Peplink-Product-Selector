'use client';

import { useWizardContext } from '@/context/WizardContext';
import { QUESTIONS } from '@/data/questions';
import { NumWANs } from '@/lib/types';
import { OptionButton } from '@/components/ui/OptionButton';
import { StepTemplate } from './StepTemplate';

const q = QUESTIONS.find((q) => q.step === 2)!;

export function Step2NumWANs() {
  const { currentAnswer, setAnswer } = useWizardContext();
  const selected = currentAnswer('numWANs') as NumWANs | undefined;

  return (
    <StepTemplate title={q.title} subtitle={q.subtitle}>
      {q.options.map((opt) => (
        <OptionButton
          key={opt.value}
          label={opt.label}
          description={opt.description}
          icon={opt.icon}
          selected={selected === opt.value}
          onClick={() => setAnswer('numWANs', opt.value as NumWANs)}
        />
      ))}
    </StepTemplate>
  );
}
