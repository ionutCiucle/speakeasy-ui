import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { Color } from '@/styles';
import { Button, MemberAvatars, PageContainer } from '@/components';
import { useTabDetails } from '@/state-management/tabs';
import { useLayoutActions } from '@/state-management/layout';
import { useAppSelector } from '@/state-management/providerHooks';
import { ModalId } from '@/state-management/layout/enums';
import { CurrencySymbol } from '@/enums';
import {
  TabInfoBar,
  TabMenuItems,
  TabSubtotal,
  TabViewToggle,
} from './components';
import type { ActiveView } from './types';

export function TabDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { tab, refetch } = useTabDetails(id ?? '');
  const [activeView, setActiveView] = useState<ActiveView>('mine');
  const { showModal } = useLayoutActions();
  const activeModal = useAppSelector((state) => state.layout.activeModal);
  const prevActiveModal = useRef<ModalId | null>(null);

  useEffect(() => {
    if (prevActiveModal.current === ModalId.AddItems && activeModal === null) {
      refetch();
    }
    prevActiveModal.current = activeModal;
  }, [activeModal, refetch]);

  const handleAddItem = useCallback(() => {
    if (!tab) {
      return;
    }
    showModal(ModalId.AddItems, {
      tabId: tab.id,
      existingMenuItems: tab.menuItems.map(({ name, price }) => ({
        name,
        price: parseFloat(price),
      })),
    });
  }, [showModal, tab]);

  const handleTapPlus = useCallback((_itemId: string) => {
    // TODO: wire to order item action
  }, []);

  const handleTapMinus = useCallback((_itemId: string) => {
    // TODO: wire to remove item action
  }, []);

  const handleTapRemove = useCallback((_itemId: string) => {
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

  const items = tab.menuItems.map(({ id: itemId, name, price }) => ({
    id: itemId,
    name,
    quantity: 0,
    price: parseFloat(price),
  }));

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
        <PageContainer style={styles.membersSection}>
          <MemberAvatars
            members={tab.members.map((m) => ({
              id: m.userId,
              name: m.userId.slice(0, 2).toUpperCase(),
            }))}
            label="WHO'S IN?"
            showSelf={true}
          />
        </PageContainer>

        <View style={styles.sandDivider} />

        <PageContainer>
          <TabViewToggle activeView={activeView} onViewChange={setActiveView} />
        </PageContainer>

        <TabMenuItems
          items={items}
          currencySymbol={currencySymbol}
          onAdd={handleAddItem}
          onTapPlus={handleTapPlus}
          onTapMinus={handleTapMinus}
          onTapRemove={handleTapRemove}
        />

        <View style={styles.sandDivider} />

        <PageContainer>
          <TabSubtotal currencySymbol={currencySymbol} subtotal={subtotal} />

          <Button
            label="Pay the Tab"
            variant="tertiary"
            rightIcon="chevron-right"
            rightIconColor={Color.Gold}
            style={styles.payButton}
            onPress={handlePayTab}
          />
        </PageContainer>
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
  },
  sandDivider: {
    height: 1,
    backgroundColor: Color.Sand,
    marginHorizontal: 20,
    marginVertical: 16,
  },
  payButton: {
    marginTop: 12,
    width: 'auto',
  },
});
