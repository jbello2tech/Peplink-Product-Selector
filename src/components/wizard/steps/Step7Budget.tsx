'use client';

import { useWizardContext } from '@/context/WizardContext';
import { QUESTIONS } from '@/data/questions';
import { BudgetRange } from '@/lib/types';
import { OptionButton } from '@/components/ui/OptionButton';
import { StepTemplate } from './StepTemplate';

const q = QUESTIONS.find((q) => q.step === 7)!;

export function Step7Budget() {
  const { currentAnswer, setAnswer } = useWizardContext();
  const selected = currentAnswer('budgetRange') as BudgetRange | undefined;

  return (
    <StepTemplate title={q.title} subtitle={q.subtitle}>
      {q.options.map((opt) => (
        <OptionButton
          key={opt.value}
          label={opt.label}
          description={opt.description}
          icon={opt.icon}
          selected={selected === opt.value}
          onClick={() => setAnswer('budgetRange', opt.value as BudgetRange)}
        />
      ))}
    </StepTemplate>
  );
}
