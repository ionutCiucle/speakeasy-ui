import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '@/styles';
import type { OrderItem } from '../../types';

interface Props {
  item: OrderItem;
  currencySymbol: string;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

export function TabMenuItem({
  item,
  currencySymbol,
  onIncrement,
  onDecrement,
}: Props) {
  const swipeableRef = useRef<Swipeable>(null);

  const close = () => swipeableRef.current?.close();

  const renderLeftActions = () => (
    <TouchableOpacity
      style={styles.leftAction}
      activeOpacity={0.8}
      onPress={() => {
        onIncrement(item.id);
        close();
      }}
    >
      <View style={styles.plusHorizontal} />
      <View style={styles.plusVertical} />
    </TouchableOpacity>
  );

  const renderRightActions = () => (
    <TouchableOpacity
      style={styles.rightAction}
      activeOpacity={0.8}
      onPress={() => {
        onDecrement(item.id);
        close();
      }}
    >
      {item.quantity === 1 ? (
        <Ionicons name="trash-outline" size={18} color={Color.White} />
      ) : (
        <View style={styles.minusBar} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.outer}>
      {/* Split background always visible behind the card */}
      <View style={styles.background} pointerEvents="none">
        <View style={styles.leftBg} />
        <View style={styles.rightBg} />
      </View>

      <Swipeable
        ref={swipeableRef}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        leftThreshold={40}
        rightThreshold={40}
        overshootLeft={false}
        overshootRight={false}
        containerStyle={styles.swipeableContainer}
      >
        <TouchableOpacity style={styles.card} activeOpacity={1} onPress={close}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.quantity}</Text>
          </View>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>
              {currencySymbol}
              {(item.quantity * item.price).toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginHorizontal: 32,
    marginTop: 12,
    height: 54,
    borderRadius: 8,
    overflow: 'hidden',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    borderRadius: 8,
  },
  leftBg: {
    flex: 1,
    backgroundColor: Color.ActiveGreen,
  },
  rightBg: {
    flex: 1,
    backgroundColor: Color.Danger,
  },
  swipeableContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'visible',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.White,
    borderRadius: 8,
    height: 54,
    paddingHorizontal: 8,
    shadowColor: Color.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  badge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Color.Gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    color: Color.White,
    textAlign: 'center',
  },
  itemName: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    lineHeight: 16,
    color: Color.Espresso,
    flex: 1,
    marginLeft: 8,
  },
  priceBadge: {
    width: 68,
    height: 26,
    borderRadius: 5,
    backgroundColor: Color.Linen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    lineHeight: 15,
    color: Color.EspressoDark,
    textAlign: 'center',
  },
  leftAction: {
    width: 157,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusHorizontal: {
    position: 'absolute',
    width: 18,
    height: 3,
    borderRadius: 1,
    backgroundColor: Color.White,
  },
  plusVertical: {
    position: 'absolute',
    width: 3,
    height: 18,
    borderRadius: 1,
    backgroundColor: Color.White,
  },
  rightAction: {
    width: 169,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  minusBar: {
    width: 18,
    height: 3,
    borderRadius: 1,
    backgroundColor: Color.White,
  },
});
