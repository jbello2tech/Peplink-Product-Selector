'use client';

import { ReactElement } from 'react';
import { useWizardContext } from '@/context/WizardContext';
import { Step1DeploymentType } from './steps/Step1DeploymentType';
import { Step2NumWANs } from './steps/Step2NumWANs';
import { Step3WANTypes } from './steps/Step3WANTypes';
import { Step4CellularGen } from './steps/Step4CellularGen';
import { Step5Users } from './steps/Step5Users';
import { Step6SpeedFusion } from './steps/Step6SpeedFusion';
import { Step8WiFi } from './steps/Step8WiFi';

export function StepRouter() {
  const { state } = useWizardContext();
  const { currentStep } = state;

  const stepMap: Record<number, ReactElement> = {
    1: <Step1DeploymentType />,
    2: <Step2NumWANs />,
    3: <Step3WANTypes />,
    4: <Step4CellularGen />,
    5: <Step5Users />,
    6: <Step6SpeedFusion />,
    7: <Step8WiFi />,
  };

  return (
    <div key={currentStep} className="transition-opacity duration-200">
      {stepMap[currentStep] ?? null}
    </div>
  );
}
