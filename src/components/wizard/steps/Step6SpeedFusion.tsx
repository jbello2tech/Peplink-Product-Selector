'use client';

import { useWizardContext } from '@/context/WizardContext';
import { QUESTIONS } from '@/data/questions';
import { NumWANs, SpeedFusion } from '@/lib/types';
import { OptionButton } from '@/components/ui/OptionButton';
import { InfoTooltip } from '@/components/ui/InfoTooltip';
import { StepTemplate } from './StepTemplate';

const q = QUESTIONS.find((q) => q.id === 'speedFusion')!;

export function Step6SpeedFusion() {
  const { currentAnswer, setAnswer } = useWizardContext();
  const selected = currentAnswer('speedFusion') as SpeedFusion | undefined;
  const numWANs = currentAnswer('numWANs') as NumWANs | undefined;
  const isSingleWAN = numWANs === '1';

  return (
    <StepTemplate
      title={q.title}
      subtitle={
        <>
          {q.subtitle}
          <InfoTooltip text="SpeedFusion combines multiple internet connections simultaneously — so if one fails, traffic shifts instantly to another with zero interruption. It can also bond connections together for higher speed." />
        </>
      }
      helpNote={
        isSingleWAN
          ? 'You selected one internet connection. SpeedFusion bonding requires at least two connections — but SpeedFusion VPN tunneling still works with a single connection for secure remote access.'
          : undefined
      }
    >
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
