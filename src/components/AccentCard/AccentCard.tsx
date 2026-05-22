import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { Color } from '@/styles';

interface Props {
  accentColor: string;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export function AccentCard({ accentColor, style, children }: Props) {
  return (
    <View style={[styles.card, style]}>
      <View style={[styles.accent, { backgroundColor: accentColor }]} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Color.White,
    borderRadius: 6,
    marginHorizontal: 20,
    marginBottom: 8,
    shadowColor: Color.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  accent: {
    width: 4,
  },
});
