import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Color } from '@/styles';
import type { OrderItem } from '../../types';

interface Props {
  item: OrderItem;
  currencySymbol: string;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

export function TabMenuItem({
  item,
  currencySymbol,
  onIncrement,
  onDecrement,
}: Props) {
  return (
    <View style={styles.itemRow}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.stepper}>
        <TouchableOpacity
          style={styles.stepperMinus}
          onPress={() => onDecrement(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.stepperMinusLabel}>−</Text>
        </TouchableOpacity>
        <Text style={styles.stepperQty}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.stepperPlus}
          onPress={() => onIncrement(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.stepperPlusLabel}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemPrice}>
        {currencySymbol}
        {(item.quantity * item.price).toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.White,
    borderRadius: 6,
    marginHorizontal: 32,
    marginTop: 12,
    height: 60,
    paddingHorizontal: 14,
    shadowColor: Color.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  itemName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 17,
    color: Color.EspressoDark,
    flex: 1,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  stepperMinus: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: Color.Linen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperMinusLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    lineHeight: 18,
    color: Color.WarmBrown,
  },
  stepperQty: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 17,
    color: Color.EspressoDark,
    width: 22,
    textAlign: 'center',
  },
  stepperPlus: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: Color.Gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperPlusLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    lineHeight: 18,
    color: Color.White,
  },
  itemPrice: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    lineHeight: 16,
    color: Color.Gold,
    width: 50,
    textAlign: 'right',
  },
});
