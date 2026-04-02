import React, { useCallback, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { Color } from '@/styles';
import { Button, MemberAvatars } from '@/components';
import { useTabDetails } from '@/state-management/tabs';
import type { TabMemberDTO } from '@/state-management/tabs';
import {
  TabInfoBar,
  TabMenuItems,
  TabSubtotal,
  TabViewToggle,
} from './components';
import type { ActiveView, OrderItem } from './types';

// TODO: remove — for local UI testing only
const MOCK_MEMBERS: TabMemberDTO[] = [
  { id: 'm1', tabId: 'mock', name: 'JD', createdAt: '' },
  { id: 'm2', tabId: 'mock', name: 'MS', createdAt: '' },
  { id: 'm3', tabId: 'mock', name: 'SC', createdAt: '' },
  { id: 'm4', tabId: 'mock', name: 'TH', createdAt: '' },
];

const MOCK_ITEMS: OrderItem[] = [
  { id: 'i1', name: 'Gin & Tonic', quantity: 2, price: 7.0 },
  { id: 'i2', name: 'Nachos', quantity: 1, price: 8.5 },
  { id: 'i3', name: 'Sparkling Water', quantity: 1, price: 3.0 },
];

export function TabDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { tab } = useTabDetails(id ?? '');
  const [activeView, setActiveView] = useState<ActiveView>('mine');

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

  // TODO: replace with real data from tab once API is wired
  const members = tab?.members ?? MOCK_MEMBERS;
  const items = MOCK_ITEMS;
  const currencySymbol = '$';
  const isActive = tab ? tab.closedAt === null : true;
  const createdAt = tab?.createdAt ?? new Date().toISOString();
  const venue = tab?.venue ?? "O'Brien's Pub";

  const subtotal = items.reduce(
    (sum: number, item: OrderItem) => sum + item.quantity * item.price,
    0,
  );

  return (
    <View style={styles.screen}>
      <TabInfoBar
        venue={venue}
        isActive={isActive}
        createdAt={createdAt}
        memberCount={members.length}
      />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.membersSection}>
          <MemberAvatars members={members} label="WHO'S IN?" showSelf={true} />
        </View>

        <View style={styles.sandDivider} />

        <TabViewToggle activeView={activeView} onViewChange={setActiveView} />

        <TabMenuItems
          items={items}
          currencySymbol={currencySymbol}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onAdd={handleAddItem}
        />

        <View style={styles.sandDivider} />

        <TabSubtotal currencySymbol={currencySymbol} subtotal={subtotal} />

        <Button
          label="Pay the Tab"
          variant="tertiary"
          rightIcon="chevron-right"
          rightIconColor={Color.Gold}
          style={styles.payButton}
          onPress={handlePayTab}
        />
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
  scrollContent: {
    paddingBottom: 24,
  },
  membersSection: {
    marginTop: 22,
    marginHorizontal: 32,
  },
  sandDivider: {
    height: 1,
    backgroundColor: Color.Sand,
    marginHorizontal: 32,
    marginVertical: 16,
  },
  payButton: {
    marginHorizontal: 32,
    marginTop: 12,
    width: 'auto',
  },
});
