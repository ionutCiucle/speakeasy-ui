import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Color } from '@/styles';

interface Props {
  onPress: () => void;
  top: number;
}

export function BackButton({ onPress, top }: Props) {
  return (
    <TouchableOpacity
      testID="back-button"
      style={[styles.button, { top }]}
      onPress={onPress}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Feather name="chevron-left" size={28} color={Color.Gold} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
});
