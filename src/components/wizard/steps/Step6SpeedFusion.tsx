'use client';

import { useWizardContext } from '@/context/WizardContext';
import { QUESTIONS } from '@/data/questions';
import { SpeedFusion } from '@/lib/types';
import { OptionButton } from '@/components/ui/OptionButton';
import { StepTemplate } from './StepTemplate';

const q = QUESTIONS.find((q) => q.step === 6)!;

export function Step6SpeedFusion() {
  const { currentAnswer, setAnswer } = useWizardContext();
  const selected = currentAnswer('speedFusion') as SpeedFusion | undefined;

  return (
    <StepTemplate title={q.title} subtitle={q.subtitle}>
      {q.options.map((opt) => (
        <OptionButton
          key={opt.value}
          label={opt.label}
          description={opt.description}
          icon={opt.icon}
          selected={selected === opt.value}
          onClick={() => setAnswer('speedFusion', opt.value as SpeedFusion)}
        />
      ))}
    </StepTemplate>
  );
}
