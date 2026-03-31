import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Color } from '@/styles';
import { IconButton } from './IconButton';

interface Props {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
}

export function PageHeader({ title, onBack, onClose }: Props) {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <View style={[styles.header, { height: 60 + top, paddingTop: top }]}>
        <View style={styles.side}>
          {onBack && <IconButton name="chevron-left" onPress={onBack} />}
        </View>

        <Text style={styles.title}>{title}</Text>

        <View style={[styles.side, styles.sideRight]}>
          {onClose && <IconButton name="x" onPress={onClose} />}
        </View>
      </View>
      <View style={styles.divider} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  side: {
    flex: 1,
    alignItems: 'flex-start',
  },
  sideRight: {
    alignItems: 'flex-end',
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
