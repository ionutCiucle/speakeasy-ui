import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Color } from '../../styles';

interface Props {
  size?: number;
  marginBottom?: number;
}

export function Logo({ size = 112, marginBottom }: Props) {
  const scale = size / 112;

  return (
    <View style={[styles.container, { marginBottom }]}>
      <Text style={{ fontFamily: 'CormorantGaramond_700Bold', fontSize: size, lineHeight: size * (136 / 112), color: Color.Gold }}>
        S
      </Text>
      <View style={[styles.dot, {
        width: 12.32 * scale, height: 12.32 * scale, borderRadius: 6.16 * scale,
        top: 23.52 * scale, left: 41.76 * scale,
      }]} />
      <View style={[styles.dot, {
        width: 8.38 * scale, height: 8.38 * scale, borderRadius: 4.19 * scale,
        top: 13.66 * scale, left: 60.24 * scale,
      }]} />
      <View style={[styles.dot, {
        width: 5.17 * scale, height: 5.17 * scale, borderRadius: 2.585 * scale,
        top: 5.04 * scale, left: 73.79 * scale,
      }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    backgroundColor: Color.Gold,
  },
});
