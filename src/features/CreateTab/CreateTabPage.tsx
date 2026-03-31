import React, { useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Outlet, useLocation, useNavigate } from 'react-router-native';
import { Color } from '@/styles';
import { Button, Wizard } from '@/components';
import { useCreateTabAsyncActions } from '@/state-management/createTab';

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
    nextRoute: '/create-tab/build-menu',
  },
  '/create-tab/build-menu': {
    currentStep: 3,
    stepName: 'Build the Menu',
    nextRoute: '/create-tab/review',
  },
  '/create-tab/review': {
    currentStep: 4,
    stepName: 'Review & Start',
    nextRoute: '',
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

  const { submitCreateTab } = useCreateTabAsyncActions();

  const handleStartTab = useCallback(async () => {
    const success = await submitCreateTab();
    if (success) {
      navigate('/home');
    }
  }, [submitCreateTab, navigate]);

  const isReviewStep = stepConfig?.nextRoute === '';

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
        {isReviewStep ? (
          <Button
            label="Start Tab"
            variant="tertiary"
            onPress={handleStartTab}
          />
        ) : (
          <Button
            label="Continue"
            variant="tertiary"
            rightIcon="chevron-right"
            onPress={handleContinue}
          />
        )}
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
