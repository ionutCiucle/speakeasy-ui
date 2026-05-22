import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Color } from '@/styles';
import { Button, ModalHeader, Pill, PriceInput } from '@/components';
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

  const handleSelectPreset = useCallback((pct: PresetPct) => {
    setSelectedOption(pct);
  }, []);

  const handleSelectCustom = useCallback(() => {
    setSelectedOption('custom');
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
      <ModalHeader title="Edit Receipt Totals" hideDone onDone={onDone} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionLabel}>RECEIPT TOTAL</Text>

        <PriceInput
          currencyCode={currencyCode}
          value={totalValue}
          onChangeValue={setTotalValue}
        />

        <Text style={styles.helperText}>
          Changes will update the grand total
        </Text>

        <View style={styles.divider} />

        <Text style={styles.sectionLabel}>TIP PERCENTAGE</Text>

        <View style={styles.pillRow}>
          {PRESETS.map((pct) => (
            <Pill
              key={pct}
              label={`${pct}%`}
              active={selectedOption === pct}
              variant="preset"
              onPress={() => handleSelectPreset(pct)}
            />
          ))}
          <Pill
            label="Custom"
            active={selectedOption === 'custom'}
            variant="preset"
            onPress={handleSelectCustom}
          />
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionLabel}>TIP AMOUNT</Text>

        <PriceInput
          currencyCode={currencyCode}
          value={tipValue}
          disabled={selectedOption !== 'custom'}
          onChangeValue={setTipValue}
        />

        {tipHelperText !== null && (
          <Text style={styles.helperText}>{tipHelperText}</Text>
        )}

        <View style={styles.divider} />

        <Button label="Apply" onPress={handleApply} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  scroll: {
    flexShrink: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 44,
  },
  sectionLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.8,
    color: Color.WarmBrown,
    marginBottom: 12,
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
});
