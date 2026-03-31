import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Color } from '@/styles';

interface Props {
  currencyCode: string;
  currencyName: string;
  onPress: () => void;
}

export function CurrencySelector({
  currencyCode,
  currencyName,
  onPress,
}: Props) {
  return (
    <>
      <Text style={styles.label}>Currency</Text>
      <TouchableOpacity
        style={styles.selector}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Text style={styles.code}>{currencyCode}</Text>
        <Text style={styles.name}>{currencyName}</Text>
        <Feather
          name="chevron-down"
          size={16}
          color={Color.Gold}
          style={styles.chevron}
        />
      </TouchableOpacity>
      <Text style={styles.hint}>
        Members see all totals in this currency. You can change it up to the
        first order.
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
    marginBottom: 6,
    marginTop: 16,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.Ivory,
    borderWidth: 1.5,
    borderColor: Color.Gold,
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 44,
  },
  code: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 17,
    color: Color.Espresso,
    marginRight: 8,
  },
  name: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: Color.WarmBrown,
    flex: 1,
  },
  chevron: {
    marginLeft: 8,
  },
  hint: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 17,
    color: Color.WarmBrown,
    marginTop: 6,
  },
});
