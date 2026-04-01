import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Color } from '@/styles';

interface Props {
  totalSteps: number;
  currentStep: number;
  stepName: string;
}

export function Wizard({ totalSteps, currentStep, stepName }: Props) {
  return (
    <>
      <View style={styles.progressBar}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.progressSegment,
              i < currentStep
                ? styles.progressSegmentActive
                : styles.progressSegmentInactive,
            ]}
          />
        ))}
      </View>

      <Text style={styles.stepLabel}>
        Step {currentStep} of {totalSteps} · {stepName}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 10,
    marginBottom: 8,
  },
  progressSegment: {
    flex: 1,
    height: 5,
    borderRadius: 2.5,
  },
  progressSegmentActive: {
    backgroundColor: Color.Gold,
  },
  progressSegmentInactive: {
    backgroundColor: Color.Sand,
  },
  stepLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
});
