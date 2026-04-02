import React, { useCallback, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { Color } from '@/styles';
import { Button, MemberAvatars } from '@/components';
import { useTabs } from '@/state-management/tabs';
import { CurrencySymbol } from '@/enums';
import { toItems } from './utils';
import {
  TabInfoBar,
  TabMenuItems,
  TabSubtotal,
  TabViewToggle,
} from './components';
import type { ActiveView } from './types';

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
  const currencySymbol =
    CurrencySymbol[tab.currencyCode as keyof typeof CurrencySymbol] ??
    tab.currencyCode;
  const items = toItems(tab);
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  return (
    <View style={styles.screen}>
      <TabInfoBar
        venue={tab.venue ?? ''}
        isActive={isActive}
        createdAt={tab.createdAt}
        memberCount={tab.members.length}
      />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Members */}
        <View style={styles.membersSection}>
          <MemberAvatars
            members={tab.members}
            label="WHO'S IN?"
            showSelf={true}
          />
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
  // Scroll content
  scrollContent: {
    paddingBottom: 24,
  },
  // Members section
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
  // Pay button
  payButton: {
    marginHorizontal: 32,
    marginTop: 12,
    width: 'auto',
  },
});
