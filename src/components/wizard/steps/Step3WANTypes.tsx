'use client';

import { useWizardContext } from '@/context/WizardContext';
import { QUESTIONS } from '@/data/questions';
import { WANType } from '@/lib/types';
import { OptionChip } from '@/components/ui/OptionChip';
import { InfoTooltip } from '@/components/ui/InfoTooltip';
import { StepTemplate } from './StepTemplate';

const q = QUESTIONS.find((q) => q.id === 'wanTypes')!;

export function Step3WANTypes() {
  const { currentAnswer, setAnswer } = useWizardContext();
  const selected = (currentAnswer('wanTypes') as WANType[] | undefined) ?? [];

  return (
    <StepTemplate
      title={q.title}
      subtitle={
        <>
          {q.subtitle}
          <InfoTooltip text="You can mix connection types. For example, fiber as your primary plus cellular as a backup is a very common setup." />
        </>
      }
    >
      {q.options.map((opt) => (
        <OptionChip
          key={opt.value}
          label={opt.label}
          description={opt.description}
          icon={opt.icon}
          selected={selected.includes(opt.value as WANType)}
          onClick={() => setAnswer('wanTypes', opt.value as WANType)}
        />
      ))}
    </StepTemplate>
  );
}
