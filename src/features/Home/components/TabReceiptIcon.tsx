import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Color } from '@/styles';

export function TabReceiptIcon() {
  return (
    <View style={styles.container}>
      <View style={styles.card} />
      <View style={styles.stem} />
      <View style={styles.base} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    width: 84,
    height: 62,
    borderWidth: 1.8,
    borderColor: Color.Gold,
  },
  stem: {
    width: 0,
    height: 38,
    borderLeftWidth: 1.8,
    borderLeftColor: Color.Gold,
  },
  base: {
    width: 52,
    height: 0,
    borderBottomWidth: 1.8,
    borderBottomColor: Color.Gold,
  },
});
