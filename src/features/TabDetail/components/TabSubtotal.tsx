import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Color } from '@/styles';

interface Props {
  currencySymbol: string;
  subtotal: number;
}

export function TabSubtotal({ currencySymbol, subtotal }: Props) {
  return (
    <View style={styles.subtotalRow}>
      <Text style={styles.subtotalLabel}>Your subtotal</Text>
      <Text style={styles.subtotalAmount}>
        {currencySymbol} {subtotal.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  subtotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.White,
    borderRadius: 6,
    height: 44,
    paddingHorizontal: 18,
  },
  subtotalLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: Color.WarmBrown,
    flex: 1,
  },
  subtotalAmount: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    lineHeight: 22,
    color: Color.Gold,
  },
});
