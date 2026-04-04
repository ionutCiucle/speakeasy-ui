import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Color } from '@/styles';
import { MenuCard } from '@/components';
import type { OrderItem } from '../../types';

interface Props {
  items: OrderItem[];
  currencySymbol: string;
  isLoading?: boolean;
  onAdd: () => void;
  onTapPlus?: (id: string) => void;
  onTapMinus?: (id: string) => void;
  onTapRemove?: (id: string) => void;
}

export function TabMenuItems({
  items,
  currencySymbol,
  isLoading,
  onAdd,
  onTapPlus,
  onTapMinus,
  onTapRemove,
}: Props) {
  return (
    <>
      {items.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
          currencySymbol={currencySymbol}
          isLoading={isLoading}
          onTapPlus={onTapPlus}
          onTapMinus={onTapMinus}
          onTapRemove={onTapRemove}
        />
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={onAdd}
        activeOpacity={0.7}
      >
        <Text style={styles.addButtonLabel}>+ Add more items</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  addButton: {
    borderWidth: 1.5,
    borderColor: Color.Gold,
    borderRadius: 6,
    height: 44,
    marginHorizontal: 20,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.3,
    color: Color.Gold,
  },
});
