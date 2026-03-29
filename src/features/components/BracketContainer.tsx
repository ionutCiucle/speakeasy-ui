import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Color } from '../../styles';

interface Props {
  children: React.ReactNode;
  bracketSize?: number;
}

export function BracketContainer({ children, bracketSize = 25 }: Props) {
  const offset = 20;
  const thickness = 1.5;

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />

      <View style={[styles.bracketH, { top: offset, left: offset, width: bracketSize, height: thickness }]} />
      <View style={[styles.bracketV, { top: offset, left: offset, width: thickness, height: bracketSize }]} />
      <View style={[styles.bracketH, { top: offset, right: offset, width: bracketSize, height: thickness }]} />
      <View style={[styles.bracketV, { top: offset, right: offset, width: thickness, height: bracketSize }]} />
      <View style={[styles.bracketH, { bottom: offset, left: offset, width: bracketSize, height: thickness }]} />
      <View style={[styles.bracketV, { bottom: offset, left: offset, width: thickness, height: bracketSize }]} />
      <View style={[styles.bracketH, { bottom: offset, right: offset, width: bracketSize, height: thickness }]} />
      <View style={[styles.bracketV, { bottom: offset, right: offset, width: thickness, height: bracketSize }]} />

      {children}

      <View style={styles.bottomBar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Cream,
  },
  topBar: {
    height: 4,
    backgroundColor: Color.Gold,
  },
  bottomBar: {
    height: 4,
    backgroundColor: Color.Gold,
  },
  bracketH: {
    position: 'absolute',
    backgroundColor: Color.Gold,
  },
  bracketV: {
    position: 'absolute',
    backgroundColor: Color.Gold,
  },
});
