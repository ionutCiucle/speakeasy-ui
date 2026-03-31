import React, { useCallback, useState } from 'react';
import { TabDetailsStep } from './TabDetailsStep';

export function CreateTabPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleContinue = useCallback(() => {
    setCurrentStep((s) => s + 1);
  }, []);

  if (currentStep === 1) {
    return <TabDetailsStep onContinue={handleContinue} />;
  }

  return null;
}
