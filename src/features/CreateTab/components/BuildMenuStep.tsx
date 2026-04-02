import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Color } from '@/styles';
import { CurrencySymbol } from '@/enums';
import { useCreateTabActions } from '@/state-management/create-tab';
import { useAppSelector } from '@/state-management/providerHooks';
import { AddItemForm } from '@/components';

function formatPrice(price: number, currencyCode: string): string {
  const symbol =
    CurrencySymbol[currencyCode as keyof typeof CurrencySymbol] ?? currencyCode;
  return `${symbol}${price.toFixed(2)}`;
}

export function BuildMenuStep() {
  const { addMenuItem, removeMenuItem } = useCreateTabActions();
  const menuItems = useAppSelector((state) => state.createTab.menuItems);
  const currency = useAppSelector((state) => state.createTab.currency);

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
      <View style={styles.content}>
        <AddItemForm currencyCode={currency.code} onAdd={handleAddItem} />

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
  divider: {
    height: 1,
    backgroundColor: Color.Sand,
    marginTop: 16,
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
