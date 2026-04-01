import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Color } from '@/styles';
import { useAppSelector } from '@/state-management/providerHooks';
import { useTabsAsyncActions } from '@/state-management/tabs';
import { TabDashboard } from './TabDashboard';
import { NoTabs } from './NoTabs';

export function HomePage() {
  const { getTabs } = useTabsAsyncActions();
  const tabs = useAppSelector((state) => state.tabs.tabs);
  const isLoading = useAppSelector((state) => state.tabs.isLoading);

  useEffect(() => {
    getTabs();
  }, [getTabs]);

  if (isLoading) {
    return <View style={styles.screen} />;
  }

  return (
    <View style={styles.screen}>
      {tabs.length > 0 ? <TabDashboard tabs={tabs} /> : <NoTabs />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.Cream,
  },
});
