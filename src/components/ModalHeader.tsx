import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Color } from '@/styles';

interface Props {
  title: string;
  onDone: () => void;
}

export function ModalHeader({ title, onDone }: Props) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={onDone}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.done}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 14,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 20,
    lineHeight: 24,
    color: Color.Espresso,
  },
  done: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 17,
    color: Color.Gold,
  },
  divider: {
    height: 1,
    backgroundColor: Color.Linen,
  },
});
