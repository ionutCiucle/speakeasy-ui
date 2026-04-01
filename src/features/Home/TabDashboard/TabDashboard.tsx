import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Color } from '@/styles';
import { useAppSelector } from '@/state-management/providerHooks';
import type { TabDTO } from '@/state-management/tabs';
import { TabCard } from '../components';
import { toCardData } from './utils';
import { FILTERS } from './constants';
import { TabFilter } from './enums';

interface Props {
  tabs: TabDTO[];
}

export function TabDashboard({ tabs }: Props) {
  const [filter, setFilter] = useState<TabFilter>(TabFilter.All);
  const userId = useAppSelector((state) => state.auth.userId);

  const cardData = tabs.map((tab) => toCardData(tab, userId));

  const filtered = cardData.filter((tab) => {
    if (filter === TabFilter.Owned) {
      return tab.role === 'host';
    }
    if (filter === TabFilter.Joined) {
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
});
