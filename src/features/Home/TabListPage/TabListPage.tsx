import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Color } from '@/styles';
import { useAppSelector } from '@/state-management/providerHooks';
import { FilterPills } from '../components/FilterPills';
import { TabCard } from '../components/TabCard';
import { toCardData } from './utils';
import { FILTERS } from './constants';
import { TabFilter } from './enums';
import type { TabDTO } from '@/state-management/tabs';

interface Props {
  tabs: TabDTO[];
}

export function TabListPage({ tabs }: Props) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<TabFilter>(TabFilter.All);
  const userId = useAppSelector((state) => state.auth.userId);

  const handleFilterChange = useCallback((key: string) => {
    setFilter(key as TabFilter);
  }, []);

  const handleTabPress = useCallback(
    (id: string, title: string) => {
      navigate(`/tab/${id}`, { state: { title } });
    },
    [navigate],
  );

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
    <View style={styles.flex}>
      {/* Filter row */}
      <View style={styles.filterRow}>
        <FilterPills
          filters={FILTERS}
          activeFilter={filter}
          onFilterChange={handleFilterChange}
        />
        <Text style={styles.tabCount}>{filtered.length} tabs</Text>
      </View>

      <View style={styles.filterSeparator} />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ACTIVE */}
        {activeTabs.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>ACTIVE</Text>
            {activeTabs.map((tab) => (
              <TabCard
                key={tab.id}
                tab={tab}
                onPress={() => handleTabPress(tab.id, tab.title)}
              />
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
              <TabCard
                key={tab.id}
                tab={tab}
                onPress={() => handleTabPress(tab.id, tab.title)}
              />
            ))}
          </>
        )}
      </ScrollView>
    </View>
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
