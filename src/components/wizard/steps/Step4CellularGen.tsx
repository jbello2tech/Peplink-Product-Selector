'use client';

import { useWizardContext } from '@/context/WizardContext';
import { QUESTIONS } from '@/data/questions';
import { CellularGen } from '@/lib/types';
import { OptionButton } from '@/components/ui/OptionButton';
import { StepTemplate } from './StepTemplate';

const q = QUESTIONS.find((q) => q.id === 'cellularGen')!;

export function Step4CellularGen() {
  const { currentAnswer, setAnswer } = useWizardContext();
  const selected = currentAnswer('cellularGen') as CellularGen | undefined;

  return (
    <StepTemplate title={q.title} subtitle={q.subtitle}>
      {q.options.map((opt) => (
        <OptionButton
          key={opt.value}
          label={opt.label}
          description={opt.description}
          icon={opt.icon}
          selected={selected === opt.value}
          onClick={() => setAnswer('cellularGen', opt.value as CellularGen)}
        />
      ))}
    </StepTemplate>
  );
}
