import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { Color } from '@/styles';
import { Button, MemberAvatars, PageContainer } from '@/components';
import { useTabDetails, useTabAsyncActions } from '@/state-management/tabs';
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

interface MemberMenuItem {
  id: string;
  name: string;
  price: number;
}

export function TabDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { tab, refetch } = useTabDetails(id ?? '');
  const [activeView, setActiveView] = useState<ActiveView>('mine');
  const [memberMenuItems, setMemberMenuItems] = useState<MemberMenuItem[]>([]);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const { showModal } = useLayoutActions();
  const { updateMemberItems } = useTabAsyncActions();
  const activeModal = useAppSelector((state) => state.layout.activeModal);
  const userId = useAppSelector((state) => state.auth.userId);
  const prevActiveModal = useRef<ModalId | null>(null);

  useEffect(() => {
    if (prevActiveModal.current === ModalId.AddItems && activeModal === null) {
      refetch();
    }
    prevActiveModal.current = activeModal;
  }, [activeModal, refetch]);

  const syncMemberItems = useCallback(
    async (itemId: string, next: MemberMenuItem[]) => {
      if (!id || !userId) {
        return;
      }
      const quantityMap = new Map<string, number>();
      for (const m of next) {
        quantityMap.set(m.id, (quantityMap.get(m.id) ?? 0) + 1);
      }
      const items = Array.from(quantityMap.entries()).map(
        ([menuItemId, quantity]) => ({ menuItemId, quantity }),
      );
      setLoadingItemId(itemId);
      await updateMemberItems(id, userId, items);
      setLoadingItemId(null);
    },
    [id, userId, updateMemberItems],
  );

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

  const handleTapPlus = useCallback(
    (itemId: string) => {
      if (!tab) {
        return;
      }
      const menuItem = tab.menuItems.find((m) => m.id === itemId);
      if (!menuItem) {
        return;
      }
      const next: MemberMenuItem[] = [
        ...memberMenuItems,
        { id: itemId, name: menuItem.name, price: parseFloat(menuItem.price) },
      ];
      setMemberMenuItems(next);
      syncMemberItems(itemId, next);
    },
    [tab, memberMenuItems, syncMemberItems],
  );

  const handleTapMinus = useCallback(
    (itemId: string) => {
      const idx = memberMenuItems.findLastIndex((m) => m.id === itemId);
      if (idx === -1) {
        return;
      }
      const next = [
        ...memberMenuItems.slice(0, idx),
        ...memberMenuItems.slice(idx + 1),
      ];
      setMemberMenuItems(next);
      syncMemberItems(itemId, next);
    },
    [memberMenuItems, syncMemberItems],
  );

  const handleTapRemove = useCallback(
    (itemId: string) => {
      const idx = memberMenuItems.findLastIndex((m) => m.id === itemId);
      if (idx === -1) {
        return;
      }
      const next = [
        ...memberMenuItems.slice(0, idx),
        ...memberMenuItems.slice(idx + 1),
      ];
      setMemberMenuItems(next);
      syncMemberItems(itemId, next);
    },
    [memberMenuItems, syncMemberItems],
  );

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
    price: parseFloat(price),
    quantity: memberMenuItems.filter((m) => m.id === itemId).length,
  }));

  const subtotal = memberMenuItems.reduce((sum, m) => sum + m.price, 0);

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
          loadingItemId={loadingItemId}
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
