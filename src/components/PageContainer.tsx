import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function PageContainer({ children, style }: Props) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
