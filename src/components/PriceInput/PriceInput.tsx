import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Color } from '@/styles';

interface Props {
  currencyCode: string;
  value: string;
  invalid?: boolean;
  error?: string;
  disabled?: boolean;
  onChangeValue: (text: string) => void;
}

export function PriceInput({
  currencyCode,
  value,
  invalid,
  error,
  disabled,
  onChangeValue,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = useCallback(
    (text: string) => {
      const digits = text.replace(/[^0-9.]/g, '');
      const parts = digits.split('.');
      const cleaned =
        parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : digits;
      onChangeValue(cleaned);
    },
    [onChangeValue],
  );

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  return (
    <View>
      <View
        style={[
          styles.priceFrame,
          isFocused && styles.priceFrameFocused,
          invalid && styles.priceFrameInvalid,
          disabled && styles.priceFrameDisabled,
        ]}
      >
        <View style={styles.currencyBadgeContainer}>
          <Text style={styles.currencyCode}>{currencyCode}</Text>
        </View>
        <View style={styles.priceDivider} />
        <TextInput
          style={styles.priceInput}
          placeholder="0.00"
          placeholderTextColor="#C3B99A"
          value={value}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          keyboardType="decimal-pad"
          editable={!disabled}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  priceFrame: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.Sand,
    borderRadius: 8,
    backgroundColor: Color.Ivory,
  },
  priceFrameFocused: {
    borderWidth: 1.5,
    borderColor: Color.Gold,
  },
  priceFrameInvalid: {
    borderColor: Color.Flame,
  },
  priceFrameDisabled: {
    opacity: 0.5,
  },
  currencyBadgeContainer: {
    width: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyCode: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    color: Color.WarmBrown,
    backgroundColor: Color.Linen,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  priceDivider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: Color.Sand,
  },
  priceInput: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: Color.Espresso,
    paddingHorizontal: 12,
  },
  error: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 18,
    color: Color.Flame,
    marginTop: 4,
  },
});
