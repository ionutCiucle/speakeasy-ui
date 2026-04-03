import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '@/styles';
import { AddItemForm, ModalHeader } from '@/components';

interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface Props {
  currencyCode: string;
  currencySymbol: string;
  onDone: () => void;
}

export function AddItemsModal({ currencyCode, currencySymbol, onDone }: Props) {
  const [items, setItems] = useState<MenuItem[]>([]);

  const handleAdd = useCallback((name: string, price: number) => {
    setItems((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name,
        price,
      },
    ]);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const itemCount = items.length;

  return (
    <View style={styles.container}>
      <ModalHeader title="Add Items" onDone={onDone} />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <AddItemForm
          currencyCode={currencyCode}
          onAdd={handleAdd}
          sectionLabel=""
        />

        {itemCount > 0 && (
          <>
            <View style={styles.sectionDivider} />
            <Text style={styles.sectionLabel}>MENU ITEMS TO ADD</Text>

            {items.map((item, index) => (
              <View key={item.id}>
                {index > 0 && <View style={styles.rowDivider} />}
                <View style={styles.itemRow}>
                  <View style={styles.dragHandle}>
                    <View style={styles.dotRow}>
                      <View style={styles.dot} />
                      <View style={styles.dot} />
                    </View>
                    <View style={styles.dotRow}>
                      <View style={styles.dot} />
                      <View style={styles.dot} />
                    </View>
                  </View>

                  <Text style={styles.itemName}>{item.name}</Text>

                  <View style={styles.pricePill}>
                    <Text style={styles.pillText}>
                      {currencySymbol}
                      {item.price.toFixed(2)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleRemove(item.id)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={18}
                      color={Color.WarmBrown}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View style={styles.infoBanner}>
              <Ionicons
                name="information-circle-outline"
                size={16}
                color={Color.WarmBrown}
              />
              <Text style={styles.infoText}>
                {itemCount} new {itemCount === 1 ? 'item' : 'items'} will be
                available for selection after confirming.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: Color.Sand,
    marginTop: 20,
  },
  sectionLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.8,
    color: Color.WarmBrown,
    marginTop: 16,
    marginBottom: 4,
  },
  rowDivider: {
    height: 1,
    backgroundColor: Color.Linen,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    backgroundColor: Color.White,
    borderRadius: 8,
    paddingHorizontal: 12,
    shadowColor: Color.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dragHandle: {
    marginRight: 8,
    gap: 4,
  },
  dotRow: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#C3B99A',
  },
  itemName: {
    flex: 1,
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    lineHeight: 16,
    color: Color.Espresso,
  },
  pricePill: {
    width: 62,
    height: 24,
    borderRadius: 5,
    backgroundColor: Color.Linen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  pillText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    lineHeight: 15,
    color: Color.Espresso,
    textAlign: 'center',
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.Linen,
    borderRadius: 8,
    backgroundColor: Color.Ivory,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 12,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
  },
});
