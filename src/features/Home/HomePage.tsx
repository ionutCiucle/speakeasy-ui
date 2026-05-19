import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Color } from '@/styles';
import { useTabs } from '@/state-management/tabs';
import { TabListPage } from './TabListPage';
import { NoTabsPage } from './NoTabsPage';

export function HomePage() {
  const { tabs, isLoading } = useTabs();

  if (isLoading) {
    return <View style={styles.screen} />;
  }

  return (
    <View style={styles.screen}>
      {tabs.length > 0 ? <TabListPage tabs={tabs} /> : <NoTabsPage />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.Cream,
  },
});
