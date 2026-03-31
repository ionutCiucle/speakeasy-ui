import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Color } from '@/styles';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
}

export function Button({ label, onPress, variant = 'primary', style }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'secondary' ? styles.secondary : styles.primary,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.label,
          variant === 'secondary' ? styles.secondaryLabel : styles.primaryLabel,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 17,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: Color.Gold,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Color.Gold,
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.5,
  },
  primaryLabel: {
    color: Color.White,
  },
  secondaryLabel: {
    color: Color.Gold,
  },
});
