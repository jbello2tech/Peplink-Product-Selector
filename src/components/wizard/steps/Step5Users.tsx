'use client';

import { useWizardContext } from '@/context/WizardContext';
import { QUESTIONS } from '@/data/questions';
import { UserCount } from '@/lib/types';
import { OptionButton } from '@/components/ui/OptionButton';
import { StepTemplate } from './StepTemplate';

const q = QUESTIONS.find((q) => q.step === 5)!;

export function Step5Users() {
  const { currentAnswer, setAnswer } = useWizardContext();
  const selected = currentAnswer('userCount') as UserCount | undefined;

  return (
    <StepTemplate title={q.title} subtitle={q.subtitle}>
      {q.options.map((opt) => (
        <OptionButton
          key={opt.value}
          label={opt.label}
          description={opt.description}
          icon={opt.icon}
          selected={selected === opt.value}
          onClick={() => setAnswer('userCount', opt.value as UserCount)}
        />
      ))}
    </StepTemplate>
  );
}
