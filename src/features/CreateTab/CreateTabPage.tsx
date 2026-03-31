import React, { useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Outlet, useLocation, useNavigate } from 'react-router-native';
import { Color } from '@/styles';
import { Button, Wizard } from '@/components';

const TOTAL_STEPS = 4;

interface StepConfig {
  currentStep: number;
  stepName: string;
  nextRoute: string;
}

const STEP_CONFIGS: Record<string, StepConfig> = {
  '/create-tab/tab-details': {
    currentStep: 1,
    stepName: 'Tab Details',
    nextRoute: '/create-tab/add-members',
  },
  '/create-tab/add-members': {
    currentStep: 2,
    stepName: 'Add Members',
    nextRoute: '/create-tab/set-limit',
  },
};

export function CreateTabPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const validatorRef = useRef<(() => boolean) | null>(null);

  const stepConfig = STEP_CONFIGS[location.pathname];

  const setValidator = useCallback((fn: (() => boolean) | null) => {
    validatorRef.current = fn;
  }, []);

  const handleContinue = useCallback(() => {
    if (!validatorRef.current || validatorRef.current()) {
      navigate(stepConfig.nextRoute);
    }
  }, [navigate, stepConfig]);

  return (
    <View style={styles.screen}>
      <Wizard
        totalSteps={TOTAL_STEPS}
        currentStep={stepConfig?.currentStep ?? 1}
        stepName={stepConfig?.stepName ?? ''}
      />

      <View style={styles.content}>
        <Outlet context={{ onValidate: setValidator }} />
      </View>

      <View style={styles.footer}>
        <Button
          label="Continue"
          variant="tertiary"
          rightIcon="chevron-right"
          onPress={handleContinue}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.Cream,
  },
  content: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
});
