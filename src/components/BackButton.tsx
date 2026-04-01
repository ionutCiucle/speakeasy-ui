import React from 'react';
import { StyleSheet } from 'react-native';
import { IconButton } from './IconButton';

interface Props {
  top: number;
  onPress: () => void;
}

export function BackButton({ top, onPress }: Props) {
  return (
    <IconButton
      testID="back-button"
      name="chevron-left"
      style={[styles.button, { top }]}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
});
