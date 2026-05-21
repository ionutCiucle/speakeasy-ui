import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Color } from '@/styles';
import { ModalHeader } from '@/components';
import { CurrencySymbol } from '@/enums';

interface Props {
  currentTotal: number;
  currencyCode: string;
  onDone: () => void;
}

export function EditReceiptTotalModal({
  currentTotal,
  currencyCode,
  onDone,
}: Props) {
  const [total, setTotal] = useState(currentTotal.toFixed(2));

  const currencySymbol =
    CurrencySymbol[currencyCode as keyof typeof CurrencySymbol] ?? currencyCode;

  const handleChangeText = useCallback((text: string) => {
    const digits = text.replace(/[^0-9.]/g, '');
    const parts = digits.split('.');
    const cleaned =
      parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : digits;
    setTotal(cleaned);
  }, []);

  const handleApply = useCallback(() => {
    // Phase 2: persist updated total to tab state before closing
    onDone();
  }, [onDone]);

  return (
    <View style={styles.container}>
      <ModalHeader title="Edit Total" onDone={onDone} />

      <View style={styles.content}>
        <Text style={styles.fieldLabel}>RECEIPT TOTAL</Text>

        <View style={styles.inputCard}>
          <Text style={styles.currencySymbol}>{currencySymbol}</Text>
          <TextInput
            style={styles.amountInput}
            value={total}
            onChangeText={handleChangeText}
            keyboardType="decimal-pad"
            selectTextOnFocus
          />
        </View>

        <Text style={styles.helperText}>
          Changes will update the grand total
        </Text>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApply}
          activeOpacity={0.85}
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  fieldLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.8,
    color: Color.WarmBrown,
    marginBottom: 12,
  },
  inputCard: {
    height: 60,
    backgroundColor: Color.Linen,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 4,
  },
  currencySymbol: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: Color.WarmBrown,
  },
  amountInput: {
    flex: 1,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    lineHeight: 29,
    color: Color.Espresso,
    padding: 0,
  },
  helperText: {
    marginTop: 12,
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: Color.WarmBrown,
  },
  divider: {
    height: 1,
    backgroundColor: Color.Sand,
    marginTop: 24,
    marginBottom: 16,
  },
  applyButton: {
    height: 52,
    backgroundColor: Color.Gold,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 19,
    color: Color.White,
  },
});
