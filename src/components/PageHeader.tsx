import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Color } from '@/styles';

interface Props {
  title: string;
}

export function PageHeader({ title }: Props) {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <View style={[styles.header, { height: 60 + top, paddingTop: top }]}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.divider} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 22,
    lineHeight: 27,
    color: Color.Espresso,
  },
  divider: {
    height: 1,
    backgroundColor: Color.Gold,
  },
});
