import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useParams } from 'react-router-native';
import { Color } from '@/styles';
import { Avatar } from '@/components';
import { useTabs } from '@/state-management/tabs';
import { formatDuration } from '../Home/TabListPage/utils';
import { CURRENCY_SYMBOLS } from '../Home/TabListPage/constants';
import type { TabDTO } from '@/state-management/tabs';

type ActiveView = 'mine' | 'all';

interface Member {
  initials: string;
  isCurrentUser?: boolean;
  isHost?: boolean;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

function toInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function toMembers(tab: TabDTO): Member[] {
  return tab.members.map((m) => ({
    initials: toInitials(m.name),
  }));
}

function toItems(tab: TabDTO): OrderItem[] {
  const grouped = new Map<
    string,
    { id: string; name: string; quantity: number; unitPrice: number }
  >();

  for (const item of tab.items) {
    const existing = grouped.get(item.label);
    if (existing) {
      existing.quantity += 1;
    } else {
      grouped.set(item.label, {
        id: item.id,
        name: item.label,
        quantity: 1,
        unitPrice: parseFloat(item.amount),
      });
    }
  }

  return Array.from(grouped.values()).map(
    ({ id, name, quantity, unitPrice }) => ({
      id,
      name,
      quantity,
      price: unitPrice,
    }),
  );
}

export function TabDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { tabs } = useTabs();
  const [activeView, setActiveView] = useState<ActiveView>('mine');

  const tab = tabs.find((t) => t.id === id);

  const handleAddItem = useCallback(() => {
    // TODO: navigate to add item flow
  }, []);

  const handleIncrement = useCallback((_itemId: string) => {
    // TODO: wire to add item action
  }, []);

  const handleDecrement = useCallback((_itemId: string) => {
    // TODO: wire to remove item action
  }, []);

  const handlePayTab = useCallback(() => {
    // TODO: navigate to payment flow
  }, []);

  if (!tab) {
    return <View style={styles.screen} />;
  }

  const isActive = tab.closedAt === null;
  const currencySymbol = CURRENCY_SYMBOLS[tab.currencyCode] ?? tab.currencyCode;
  const members = toMembers(tab);
  const items = toItems(tab);
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  return (
    <View style={styles.screen}>
      {/* Info bar */}
      <View style={styles.infoBar}>
        <View style={styles.infoLeft}>
          <Feather name="clock" size={12} color={Color.WarmBrown} />
          <Text style={styles.infoVenue}>{tab.venue ?? ''}</Text>
        </View>
        {isActive && (
          <View style={styles.infoMiddle}>
            <View style={styles.activeDot} />
            <Text style={styles.infoStatus}>
              Active · {formatDuration(tab.createdAt)}
            </Text>
          </View>
        )}
        <Text style={styles.infoMembers}>{members.length} members</Text>
      </View>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Members */}
        <Text style={styles.sectionLabel}>MEMBERS</Text>
        <View style={styles.membersCard}>
          {members.map((member, index) => (
            <View key={index} style={styles.memberItem}>
              <Avatar
                label={member.initials}
                variant={member.isCurrentUser ? 'self' : 'member'}
                size={44}
                style={styles.memberAvatar}
              />
              {member.isCurrentUser && member.isHost && (
                <Text style={styles.memberRole}>You · Host</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.sandDivider} />

        {/* Toggle */}
        <View style={styles.toggle}>
          <TouchableOpacity
            style={[
              styles.toggleTab,
              activeView === 'mine' && styles.toggleTabActive,
            ]}
            onPress={() => setActiveView('mine')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.toggleLabel,
                activeView === 'mine' && styles.toggleLabelActive,
              ]}
            >
              My Items
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleTab,
              activeView === 'all' && styles.toggleTabActive,
            ]}
            onPress={() => setActiveView('all')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.toggleLabel,
                activeView === 'all' && styles.toggleLabelActive,
              ]}
            >
              All Members
            </Text>
          </TouchableOpacity>
        </View>

        {/* Items */}
        {items.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.stepper}>
              <TouchableOpacity
                style={styles.stepperMinus}
                onPress={() => handleDecrement(item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.stepperMinusLabel}>−</Text>
              </TouchableOpacity>
              <Text style={styles.stepperQty}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.stepperPlus}
                onPress={() => handleIncrement(item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.stepperPlusLabel}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.itemPrice}>
              {currencySymbol}
              {(item.quantity * item.price).toFixed(2)}
            </Text>
          </View>
        ))}

        {/* Add more items */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddItem}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonLabel}>+ Add more items</Text>
        </TouchableOpacity>

        <View style={styles.sandDivider} />

        {/* Subtotal */}
        <View style={styles.subtotalRow}>
          <Text style={styles.subtotalLabel}>Your subtotal</Text>
          <Text style={styles.subtotalAmount}>
            {currencySymbol} {subtotal.toFixed(2)}
          </Text>
        </View>

        {/* Pay the Tab */}
        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePayTab}
          activeOpacity={0.8}
        >
          <Text style={styles.payButtonLabel}>Pay the Tab →</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.Cream,
  },
  flex: {
    flex: 1,
  },
  // Info bar
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 20,
    backgroundColor: Color.Linen,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoVenue: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: Color.WarmBrown,
    marginLeft: 6,
  },
  infoMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Color.ActiveGreen,
    marginRight: 5,
  },
  infoStatus: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    lineHeight: 15,
    color: Color.ActiveGreen,
  },
  infoMembers: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: Color.WarmBrown,
  },
  // Scroll content
  scrollContent: {
    paddingBottom: 24,
  },
  // Members section
  sectionLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 2,
    color: Color.WarmBrown,
    marginTop: 22,
    marginBottom: 8,
    marginHorizontal: 32,
  },
  membersCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Color.Linen,
    borderRadius: 10,
    marginHorizontal: 32,
    paddingHorizontal: 17,
    paddingVertical: 19,
    gap: 16,
  },
  memberItem: {
    alignItems: 'center',
  },
  memberAvatar: {
    borderWidth: 2,
    borderColor: Color.White,
  },
  memberRole: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    color: Color.Gold,
    marginTop: 4,
  },
  sandDivider: {
    height: 1,
    backgroundColor: Color.Sand,
    marginHorizontal: 32,
    marginVertical: 16,
  },
  // Toggle
  toggle: {
    flexDirection: 'row',
    backgroundColor: Color.Ivory,
    borderRadius: 6,
    height: 36,
    marginHorizontal: 32,
  },
  toggleTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  toggleTabActive: {
    backgroundColor: Color.Gold,
  },
  toggleLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: Color.WarmBrown,
  },
  toggleLabelActive: {
    fontFamily: 'Inter_600SemiBold',
    color: Color.White,
  },
  // Item rows
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.White,
    borderRadius: 6,
    marginHorizontal: 32,
    marginTop: 12,
    height: 60,
    paddingHorizontal: 14,
    shadowColor: Color.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  itemName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 17,
    color: Color.EspressoDark,
    flex: 1,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  stepperMinus: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: Color.Linen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperMinusLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    lineHeight: 18,
    color: Color.WarmBrown,
  },
  stepperQty: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 17,
    color: Color.EspressoDark,
    width: 22,
    textAlign: 'center',
  },
  stepperPlus: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: Color.Gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperPlusLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    lineHeight: 18,
    color: Color.White,
  },
  itemPrice: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    lineHeight: 16,
    color: Color.Gold,
    width: 50,
    textAlign: 'right',
  },
  // Add more items
  addButton: {
    borderWidth: 1.5,
    borderColor: Color.Gold,
    borderRadius: 6,
    height: 44,
    marginHorizontal: 32,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.3,
    color: Color.Gold,
  },
  // Subtotal
  subtotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.White,
    borderRadius: 6,
    marginHorizontal: 32,
    height: 44,
    paddingHorizontal: 18,
  },
  subtotalLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: Color.WarmBrown,
    flex: 1,
  },
  subtotalAmount: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    lineHeight: 22,
    color: Color.Gold,
  },
  // Pay button
  payButton: {
    backgroundColor: Color.EspressoDark,
    borderRadius: 8,
    height: 52,
    marginHorizontal: 32,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0.3,
    color: Color.White,
  },
});
