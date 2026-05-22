import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Color } from '@/styles';

interface Props {
  label: string;
  active: boolean;
  variant?: 'filter' | 'preset';
  onPress: () => void;
}

export function Pill({ label, active, variant = 'filter', onPress }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.pill,
        variant === 'filter' ? styles.pillFilter : styles.pillPreset,
        active && styles.pillActive,
        variant === 'filter' && active && styles.pillFilterActive,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillFilter: {
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: Color.Cream,
    borderWidth: 1.5,
    borderColor: Color.Sand,
  },
  pillPreset: {
    width: 62,
    height: 36,
    borderRadius: 18,
    backgroundColor: Color.Linen,
  },
  pillActive: {
    backgroundColor: Color.Gold,
  },
  pillFilterActive: {
    borderColor: Color.Gold,
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: Color.WarmBrown,
    textAlign: 'center',
  },
  labelActive: {
    fontFamily: 'Inter_600SemiBold',
    color: Color.White,
  },
});
