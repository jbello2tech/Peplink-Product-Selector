'use client';

import { useWizardContext } from '@/context/WizardContext';
import { QUESTIONS } from '@/data/questions';
import { WiFiNeeded } from '@/lib/types';
import { OptionButton } from '@/components/ui/OptionButton';
import { StepTemplate } from './StepTemplate';

const q = QUESTIONS.find((q) => q.step === 8)!;

export function Step8WiFi() {
  const { currentAnswer, setAnswer } = useWizardContext();
  const selected = currentAnswer('wifiNeeded') as WiFiNeeded | undefined;

  return (
    <StepTemplate title={q.title} subtitle={q.subtitle}>
      {q.options.map((opt) => (
        <OptionButton
          key={opt.value}
          label={opt.label}
          description={opt.description}
          icon={opt.icon}
          selected={selected === opt.value}
          onClick={() => setAnswer('wifiNeeded', opt.value as WiFiNeeded)}
        />
      ))}
    </StepTemplate>
  );
}
