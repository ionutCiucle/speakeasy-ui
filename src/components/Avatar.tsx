import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Color } from '@/styles';

interface Props {
  label: string;
  variant?: 'self' | 'member';
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export function Avatar({ label, variant = 'member', size = 44, style }: Props) {
  const fontSize = size <= 30 ? 9 : 11;
  const lineHeight = size <= 30 ? 11 : 13;

  return (
    <View
      style={[
        styles.avatar,
        variant === 'self' ? styles.avatarSelf : styles.avatarMember,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === 'self' ? styles.labelSelf : styles.labelMember,
          { fontSize, lineHeight },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarSelf: {
    backgroundColor: Color.Gold,
  },
  avatarMember: {
    backgroundColor: Color.Linen,
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
  },
  labelSelf: {
    color: Color.EspressoDark,
  },
  labelMember: {
    color: Color.Espresso,
  },
});
