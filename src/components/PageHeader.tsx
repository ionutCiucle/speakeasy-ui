import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Color } from '@/styles';

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
          {onBack && (
            <TouchableOpacity
              onPress={onBack}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather name="chevron-left" size={24} color={Color.Espresso} />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.title}>{title}</Text>

        <View style={[styles.side, styles.sideRight]}>
          {onClose && (
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather name="x" size={20} color={Color.WarmBrown} />
            </TouchableOpacity>
          )}
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
