import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Color } from '@/styles';
import { useTabs } from '@/state-management/tabs';
import { TabList, NoTabs } from './components';

export function HomePage() {
  const { tabs, isLoading } = useTabs();

  if (isLoading) {
    return <View style={styles.screen} />;
  }

  return (
    <View style={styles.screen}>
      {tabs.length > 0 ? <TabList tabs={tabs} /> : <NoTabs />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.Cream,
  },
});
