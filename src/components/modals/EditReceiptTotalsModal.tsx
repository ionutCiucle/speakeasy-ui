import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Color } from '@/styles';
import { ModalHeader } from '@/components';
import { CurrencySymbol } from '@/enums';

const PRESETS = [5, 10, 15, 20] as const;
type PresetPct = (typeof PRESETS)[number];
type TipOption = PresetPct | 'custom';

function deriveInitialOption(total: number, tip: number): TipOption {
  for (const pct of PRESETS) {
    if (Math.abs(tip - (total * pct) / 100) < 0.01) {
      return pct;
    }
  }
  return 'custom';
}

interface Props {
  currentTotal: number;
  currentTip: number;
  currencyCode: string;
  onDone: () => void;
}

export function EditReceiptTotalsModal({
  currentTotal,
  currentTip,
  currencyCode,
  onDone,
}: Props) {
  const [totalValue, setTotalValue] = useState(currentTotal.toFixed(2));
  const [selectedOption, setSelectedOption] = useState<TipOption>(() =>
    deriveInitialOption(currentTotal, currentTip),
  );
  const [tipValue, setTipValue] = useState(currentTip.toFixed(2));

  const currencySymbol =
    CurrencySymbol[currencyCode as keyof typeof CurrencySymbol] ?? currencyCode;

  useEffect(() => {
    if (selectedOption !== 'custom') {
      const parsed = parseFloat(totalValue) || 0;
      setTipValue(((parsed * selectedOption) / 100).toFixed(2));
    }
  }, [totalValue, selectedOption]);

  const handleChangeTotal = useCallback((text: string) => {
    const digits = text.replace(/[^0-9.]/g, '');
    const parts = digits.split('.');
    const cleaned =
      parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : digits;
    setTotalValue(cleaned);
  }, []);

  const handleSelectPreset = useCallback((pct: PresetPct) => {
    setSelectedOption(pct);
  }, []);

  const handleSelectCustom = useCallback(() => {
    setSelectedOption('custom');
  }, []);

  const handleChangeTip = useCallback((text: string) => {
    const digits = text.replace(/[^0-9.]/g, '');
    const parts = digits.split('.');
    const cleaned =
      parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : digits;
    setTipValue(cleaned);
  }, []);

  const handleApply = useCallback(() => {
    // Phase 2: persist updated total and tip to tab state before closing
    onDone();
  }, [onDone]);

  const parsedTotal = parseFloat(totalValue) || 0;
  const tipHelperText =
    selectedOption !== 'custom'
      ? `${selectedOption}% of ${currencySymbol} ${parsedTotal.toFixed(2)}`
      : null;

  return (
    <View style={styles.container}>
      <ModalHeader title="Edit Receipt Totals" onDone={onDone} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionLabel}>RECEIPT TOTAL</Text>

        <View style={styles.inputCard}>
          <Text style={styles.currencySymbol}>{currencySymbol}</Text>
          <TextInput
            style={styles.amountInput}
            value={totalValue}
            onChangeText={handleChangeTotal}
            keyboardType="decimal-pad"
            selectTextOnFocus
          />
        </View>

        <Text style={styles.helperText}>
          Changes will update the grand total
        </Text>

        <View style={styles.divider} />

        <Text style={styles.sectionLabel}>TIP PERCENTAGE</Text>

        <View style={styles.pillRow}>
          {PRESETS.map((pct) => {
            const active = selectedOption === pct;
            return (
              <TouchableOpacity
                key={pct}
                style={[styles.pill, active && styles.pillActive]}
                onPress={() => handleSelectPreset(pct)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.pillText, active && styles.pillTextActive]}
                >
                  {pct}%
                </Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={[
              styles.pill,
              selectedOption === 'custom' && styles.pillActive,
            ]}
            onPress={handleSelectCustom}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.pillText,
                selectedOption === 'custom' && styles.pillTextActive,
              ]}
            >
              Custom
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionLabel}>TIP AMOUNT</Text>

        <View style={styles.inputCard}>
          <Text style={styles.currencySymbol}>{currencySymbol}</Text>
          <TextInput
            style={styles.amountInput}
            value={tipValue}
            onChangeText={handleChangeTip}
            keyboardType="decimal-pad"
            editable={selectedOption === 'custom'}
            selectTextOnFocus
          />
        </View>

        {tipHelperText !== null && (
          <Text style={styles.helperText}>{tipHelperText}</Text>
        )}

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApply}
          activeOpacity={0.85}
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  sectionLabel: {
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
    marginTop: 16,
    marginBottom: 16,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pill: {
    width: 62,
    height: 36,
    borderRadius: 18,
    backgroundColor: Color.Linen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillActive: {
    backgroundColor: Color.Gold,
  },
  pillText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: Color.WarmBrown,
    textAlign: 'center',
  },
  pillTextActive: {
    fontFamily: 'Inter_600SemiBold',
    color: Color.White,
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
