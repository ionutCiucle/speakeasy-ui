import React, { useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Color } from '@/styles';
import { CurrencySymbol } from '@/enums';
import { useCreateTabActions } from '@/state-management/create-tab';
import { useAppSelector } from '@/state-management/providerHooks';
import { AddItemForm, MenuCard, PageContainer } from '@/components';

export function BuildMenuStep() {
  const { addMenuItem, removeMenuItem } = useCreateTabActions();
  const menuItems = useAppSelector((state) => state.createTab.menuItems);
  const currency = useAppSelector((state) => state.createTab.currency);

  const currencySymbol =
    CurrencySymbol[currency.code as keyof typeof CurrencySymbol] ??
    currency.code;

  const handleAddItem = useCallback(
    (name: string, price: number) => {
      addMenuItem({
        id: Date.now().toString(),
        name,
        price,
      });
    },
    [addMenuItem],
  );

  const handleRemoveItem = useCallback(
    (id: string) => {
      removeMenuItem(id);
    },
    [removeMenuItem],
  );

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <PageContainer>
        <AddItemForm currencyCode={currency.code} onAdd={handleAddItem} />

        {/* Divider */}
        <View style={styles.divider} />

        {/* MENU ITEMS */}
        <Text style={styles.sectionHeader}>MENU ITEMS</Text>
      </PageContainer>

      {menuItems.map((item) => (
        <MenuCard
          key={item.id}
          item={{ ...item, quantity: 0 }}
          currencySymbol={currencySymbol}
          showQuantity={false}
          onTapRemove={handleRemoveItem}
        />
      ))}

      {/* Info box */}
      {menuItems.length > 0 && (
        <PageContainer>
          <View style={styles.infoBox}>
            <Feather
              name="alert-circle"
              size={16}
              color={Color.WarmBrown}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>
              {menuItems.length} {menuItems.length === 1 ? 'item' : 'items'} on
              the menu — members can order any of these
            </Text>
          </View>
        </PageContainer>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  sectionHeader: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.8,
    color: Color.WarmBrown,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: Color.Sand,
    marginTop: 16,
    marginBottom: 16,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.Linen,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginTop: 8,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
    flex: 1,
  },
});
