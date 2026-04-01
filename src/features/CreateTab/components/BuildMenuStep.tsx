import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Color } from '@/styles';
import { useCreateTabActions } from '@/state-management/create-tab';
import { useAppSelector } from '@/state-management/providerHooks';

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
  AUD: 'A$',
  JPY: '¥',
  MXN: 'MX$',
};

function formatPrice(price: number, currencyCode: string): string {
  const symbol = CURRENCY_SYMBOLS[currencyCode] ?? currencyCode;
  return `${symbol}${price.toFixed(2)}`;
}

export function BuildMenuStep() {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const { addMenuItem, removeMenuItem } = useCreateTabActions();
  const menuItems = useAppSelector((state) => state.createTab.menuItems);
  const currency = useAppSelector((state) => state.createTab.currency);

  const handleAddItem = useCallback(() => {
    if (itemName.trim().length === 0) {
      return;
    }
    addMenuItem({
      id: Date.now().toString(),
      name: itemName.trim(),
      price: parseFloat(itemPrice) || 0,
    });
    setItemName('');
    setItemPrice('');
  }, [itemName, itemPrice, addMenuItem]);

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
      <View style={styles.content}>
        {/* ADD AN ITEM */}
        <Text style={styles.sectionHeader}>ADD AN ITEM</Text>

        <Text style={styles.fieldLabel}>Item Name</Text>
        <TextInput
          style={styles.nameInput}
          placeholder="e.g. Gin & Tonic"
          placeholderTextColor={Color.WarmBrown}
          value={itemName}
          onChangeText={setItemName}
        />

        <Text style={styles.fieldLabel}>Price</Text>
        <View style={styles.priceInput}>
          <View style={styles.currencyBadge}>
            <Text style={styles.currencyCode}>{currency.code}</Text>
          </View>
          <View style={styles.priceSeparator} />
          <TextInput
            style={styles.priceValue}
            placeholder="0.00"
            placeholderTextColor={Color.WarmBrown}
            value={itemPrice}
            onChangeText={setItemPrice}
            keyboardType="decimal-pad"
          />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddItem}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonLabel}>Add to Menu</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />

        {/* MENU ITEMS */}
        <Text style={styles.sectionHeader}>MENU ITEMS</Text>

        {menuItems.map((item) => (
          <View key={item.id} style={styles.menuItemRow}>
            <View style={styles.dragHandle}>
              <View style={styles.dragHandleRow}>
                <View style={styles.dragHandleDot} />
                <View style={styles.dragHandleDot} />
              </View>
              <View style={styles.dragHandleRow}>
                <View style={styles.dragHandleDot} />
                <View style={styles.dragHandleDot} />
              </View>
            </View>

            <Text style={styles.menuItemName} numberOfLines={1}>
              {item.name}
            </Text>

            <View style={styles.priceBadge}>
              <Text style={styles.priceBadgeText}>
                {formatPrice(item.price, currency.code)}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => handleRemoveItem(item.id)}
              activeOpacity={0.7}
              style={styles.deleteButton}
            >
              <Feather name="trash-2" size={16} color={Color.WarmBrown} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Info box */}
        {menuItems.length > 0 && (
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
        )}
      </View>
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
  content: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.8,
    color: Color.WarmBrown,
    marginBottom: 12,
  },
  fieldLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
    marginBottom: 6,
  },
  nameInput: {
    backgroundColor: Color.Ivory,
    borderWidth: 1,
    borderColor: Color.Sand,
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 14,
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: Color.Espresso,
    marginBottom: 16,
  },
  priceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.Ivory,
    borderWidth: 1,
    borderColor: Color.Sand,
    borderRadius: 8,
    height: 44,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  currencyBadge: {
    width: 42,
    height: 24,
    backgroundColor: Color.Linen,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyCode: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    color: Color.WarmBrown,
  },
  priceSeparator: {
    width: 1,
    height: 28,
    backgroundColor: Color.Sand,
    marginHorizontal: 10,
  },
  priceValue: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 17,
    color: Color.Espresso,
  },
  addButton: {
    backgroundColor: Color.Gold,
    borderRadius: 8,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 17,
    color: Color.EspressoDark,
  },
  divider: {
    height: 1,
    backgroundColor: Color.Sand,
    marginBottom: 16,
  },
  menuItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.White,
    borderRadius: 8,
    height: 46,
    paddingHorizontal: 12,
    marginBottom: 8,
    shadowColor: Color.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dragHandle: {
    gap: 6,
    marginRight: 8,
  },
  dragHandleRow: {
    flexDirection: 'row',
    gap: 5,
  },
  dragHandleDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Color.Sand,
  },
  menuItemName: {
    flex: 1,
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    lineHeight: 16,
    color: Color.Espresso,
  },
  priceBadge: {
    width: 62,
    height: 24,
    backgroundColor: Color.Linen,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  priceBadgeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    lineHeight: 15,
    color: Color.Espresso,
  },
  deleteButton: {
    padding: 4,
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
