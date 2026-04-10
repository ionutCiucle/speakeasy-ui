import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Color } from '@/styles';
import { Button } from './Button';
import { Input, useValidatedTextField } from './Input';
import { PriceInput } from './PriceInput';

interface Props {
  currencyCode: string;
  onAdd: (name: string, price: number) => void;
  sectionLabel?: string;
  buttonLabel?: string;
}

export function AddItemForm({
  currencyCode,
  onAdd,
  sectionLabel = 'ADD AN ITEM',
  buttonLabel = 'Add to Menu',
}: Props) {
  const [name, onChangeName, nameError, validateName] =
    useValidatedTextField('Item Name');
  const [priceText, onChangePriceText, priceError, validatePrice] =
    useValidatedTextField('Price');

  const handleAdd = useCallback(() => {
    const nameValid = validateName();
    const priceValid = validatePrice();
    if (!nameValid || !priceValid) {
      return;
    }
    onAdd(name.trim(), parseFloat(priceText) || 0);
    onChangeName('');
    onChangePriceText('');
  }, [
    name,
    priceText,
    onAdd,
    validateName,
    validatePrice,
    onChangeName,
    onChangePriceText,
  ]);

  return (
    <View>
      {!!sectionLabel && (
        <Text style={styles.sectionLabel}>{sectionLabel}</Text>
      )}

      <Input
        label="Item Name"
        placeholder="e.g. Gin & Tonic"
        size="small"
        value={name}
        invalid={!!nameError}
        error={nameError ?? undefined}
        onChangeText={onChangeName}
      />

      <Text style={styles.fieldLabel}>Price</Text>
      <PriceInput
        currencyCode={currencyCode}
        value={priceText}
        invalid={!!priceError}
        error={priceError ?? undefined}
        onChangeValue={onChangePriceText}
      />

      <Button
        label={buttonLabel}
        variant="primary"
        onPress={handleAdd}
        style={styles.addButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.8,
    color: Color.WarmBrown,
    marginBottom: 4,
  },
  fieldLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
    marginBottom: 6,
  },
  addButton: {
    marginTop: 16,
  },
});
