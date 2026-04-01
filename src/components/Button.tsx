import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Color } from '@/styles';

interface Props {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  rightIcon?: React.ComponentProps<typeof Feather>['name'];
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  showSpinner?: boolean;
  onPress: () => void;
}

const VARIANT_COLOR: Record<'primary' | 'secondary' | 'tertiary', string> = {
  primary: Color.White,
  secondary: Color.Gold,
  tertiary: Color.White,
};

export function Button({
  label,
  variant = 'primary',
  rightIcon,
  style,
  disabled,
  showSpinner,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        style,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || showSpinner}
      activeOpacity={0.8}
    >
      {showSpinner ? (
        <ActivityIndicator size="small" color={VARIANT_COLOR[variant]} />
      ) : (
        <>
          <Text style={[styles.label, styles[`${variant}Label`]]}>{label}</Text>
          {rightIcon && (
            <Feather
              name={rightIcon}
              size={16}
              color={VARIANT_COLOR[variant]}
              style={styles.rightIcon}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Color.Gold,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Color.Gold,
  },
  tertiary: {
    backgroundColor: Color.EspressoDark,
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
  tertiaryLabel: {
    color: Color.White,
  },
  rightIcon: {
    marginLeft: 8,
  },
  disabled: {
    opacity: 0.35,
  },
});
