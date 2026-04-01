import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Color } from '@/styles';
import { useAppSelector } from '@/state-management/providerHooks';
import type { TabDTO } from '@/state-management/tabs';

const ActiveGreen = '#42904C';

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
  AUD: 'A$',
  JPY: '¥',
  MXN: 'MX$',
};

type TabFilter = 'all' | 'owned' | 'joined';
type TabRole = 'host' | 'guest';
type TabStatus = 'active' | 'closed';

interface TabCardData {
  id: string;
  title: string;
  venue: string;
  status: TabStatus;
  role: TabRole;
  duration?: string;
  date?: string;
  memberCount: number;
  totalAmount: string;
}

function formatDuration(createdAt: string): string {
  const minutes = Math.floor(
    (Date.now() - new Date(createdAt).getTime()) / 60000,
  );
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining === 0 ? `${hours}h` : `${hours}h ${remaining}m`;
}

function formatClosedDate(closedAt: string): string {
  return new Date(closedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function formatTotal(items: TabDTO['items'], currencyCode: string): string {
  const total = items.reduce((sum, item) => sum + parseFloat(item.amount), 0);
  const symbol = CURRENCY_SYMBOLS[currencyCode] ?? currencyCode;
  return `${symbol}${total.toFixed(2)}`;
}

function toCardData(tab: TabDTO, userId: string | null): TabCardData {
  const isActive = tab.closedAt === null;
  return {
    id: tab.id,
    title: tab.title,
    venue: tab.venue ?? '',
    status: isActive ? 'active' : 'closed',
    role: tab.createdById === userId ? 'host' : 'guest',
    duration: isActive ? formatDuration(tab.createdAt) : undefined,
    date: !isActive ? formatClosedDate(tab.closedAt!) : undefined,
    memberCount: tab.members.length,
    totalAmount: formatTotal(tab.items, tab.currencyCode),
  };
}

const FILTERS: { key: TabFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'owned', label: 'Owned' },
  { key: 'joined', label: 'Joined' },
];

interface TabCardProps {
  tab: TabCardData;
}

function TabCard({ tab }: TabCardProps) {
  const isActive = tab.status === 'active';
  const isHost = tab.role === 'host';

  return (
    <TouchableOpacity
      style={[styles.card, isActive ? styles.cardActive : styles.cardClosed]}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.cardAccent,
          isActive ? styles.cardAccentActive : styles.cardAccentClosed,
        ]}
      />
      <View style={styles.cardBody}>
        <View style={styles.cardLeft}>
          <Text
            style={[styles.cardTitle, !isActive && styles.cardTitleClosed]}
            numberOfLines={1}
          >
            {tab.title}
          </Text>
          <Text style={styles.cardVenue} numberOfLines={1}>
            {tab.venue}
          </Text>
          {isActive ? (
            <>
              <View style={styles.activeStatusRow}>
                <View style={styles.activeDot} />
                <Text style={styles.activeStatusText}>
                  Active · {tab.duration}
                </Text>
              </View>
              <Text style={styles.memberCount}>{tab.memberCount} members</Text>
            </>
          ) : (
            <Text style={styles.closedMeta}>
              {tab.date} · {tab.memberCount} members
            </Text>
          )}
        </View>

        <View style={styles.cardRight}>
          <View
            style={[
              styles.roleBadge,
              isHost ? styles.roleBadgeHost : styles.roleBadgeGuest,
            ]}
          >
            <Text
              style={[
                styles.roleLabel,
                isHost ? styles.roleLabelHost : styles.roleLabelGuest,
              ]}
            >
              {isHost ? 'Host' : 'Guest'}
            </Text>
          </View>
          <Feather name="chevron-right" size={14} color={Color.Sand} />
          <Text style={styles.amount}>{tab.totalAmount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

interface Props {
  tabs: TabDTO[];
}

export function TabDashboard({ tabs }: Props) {
  const [filter, setFilter] = useState<TabFilter>('all');
  const userId = useAppSelector((state) => state.auth.userId);

  const cardData = tabs.map((tab) => toCardData(tab, userId));

  const filtered = cardData.filter((tab) => {
    if (filter === 'owned') {
      return tab.role === 'host';
    }
    if (filter === 'joined') {
      return tab.role === 'guest';
    }
    return true;
  });

  const activeTabs = filtered.filter((tab) => tab.status === 'active');
  const closedTabs = filtered.filter((tab) => tab.status === 'closed');

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Filter row */}
      <View style={styles.filterRow}>
        <View style={styles.filterPills}>
          {FILTERS.map(({ key, label }) => (
            <TouchableOpacity
              key={key}
              style={[styles.pill, filter === key && styles.pillActive]}
              onPress={() => setFilter(key)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.pillLabel,
                  filter === key && styles.pillLabelActive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.tabCount}>{filtered.length} tabs</Text>
      </View>

      <View style={styles.filterSeparator} />

      {/* ACTIVE */}
      {activeTabs.length > 0 && (
        <>
          <Text style={styles.sectionHeader}>ACTIVE</Text>
          {activeTabs.map((tab) => (
            <TabCard key={tab.id} tab={tab} />
          ))}
        </>
      )}

      {/* CLOSED */}
      {closedTabs.length > 0 && (
        <>
          <Text
            style={[
              styles.sectionHeader,
              activeTabs.length > 0 && styles.sectionHeaderSpaced,
            ]}
          >
            CLOSED
          </Text>
          {closedTabs.map((tab) => (
            <TabCard key={tab.id} tab={tab} />
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  filterPills: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Cream,
    borderWidth: 1.5,
    borderColor: Color.Sand,
  },
  pillActive: {
    backgroundColor: Color.Gold,
    borderColor: Color.Gold,
  },
  pillLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: Color.WarmBrown,
  },
  pillLabelActive: {
    fontFamily: 'Inter_600SemiBold',
    color: Color.White,
  },
  tabCount: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: Color.WarmBrown,
  },
  filterSeparator: {
    height: 1,
    backgroundColor: Color.Sand,
    marginHorizontal: 20,
  },
  sectionHeader: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
    marginTop: 16,
    marginBottom: 8,
    marginHorizontal: 20,
  },
  sectionHeaderSpaced: {
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Color.White,
    borderRadius: 6,
    marginHorizontal: 20,
    marginBottom: 8,
    shadowColor: Color.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  cardActive: {
    minHeight: 96,
  },
  cardClosed: {
    minHeight: 88,
  },
  cardAccent: {
    width: 4,
  },
  cardAccentActive: {
    backgroundColor: ActiveGreen,
  },
  cardAccentClosed: {
    backgroundColor: Color.Gold,
  },
  cardBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 12,
    paddingVertical: 11,
  },
  cardLeft: {
    flex: 1,
    gap: 4,
    paddingRight: 8,
  },
  cardTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    lineHeight: 18,
    color: Color.Espresso,
  },
  cardTitleClosed: {
    fontSize: 14,
    lineHeight: 17,
  },
  cardVenue: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: Color.WarmBrown,
  },
  activeStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: ActiveGreen,
  },
  activeStatusText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    lineHeight: 13,
    color: ActiveGreen,
  },
  memberCount: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
  },
  closedMeta: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  roleBadge: {
    height: 22,
    paddingHorizontal: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleBadgeHost: {
    backgroundColor: Color.EspressoDark,
  },
  roleBadgeGuest: {
    backgroundColor: Color.Linen,
  },
  roleLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    lineHeight: 13,
  },
  roleLabelHost: {
    color: Color.White,
  },
  roleLabelGuest: {
    color: Color.WarmBrown,
  },
  amount: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    lineHeight: 16,
    color: Color.Gold,
  },
});
