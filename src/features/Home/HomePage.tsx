import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Color } from '@/styles';
import { TabReceiptIcon } from './components';
import { Button, MainNav, MainNavTab } from '@/components';
import { ProfilePage } from '@/features/Profile';

const HEADER_TITLES: Record<MainNavTab, string> = {
  home: 'My Tabs',
  newTab: 'New Tab',
  friends: 'Friends',
  profile: 'Profile',
};

export function HomePage() {
  const [activeTab, setActiveTab] = useState<MainNavTab>('home');

  const handleStartTab = useCallback(() => {
    // TODO: navigate to start tab flow
  }, []);

  const handleScanQR = useCallback(() => {
    // TODO: navigate to QR scanner
  }, []);

  const handleTabPress = useCallback((tab: MainNavTab) => {
    setActiveTab(tab);
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{HEADER_TITLES[activeTab]}</Text>
      </View>
      <View style={styles.headerDivider} />

      {activeTab === 'profile' ? (
        <ProfilePage />
      ) : (
        <View style={styles.emptyState}>
          <TabReceiptIcon />
          <Text style={styles.emptyHeading}>No tabs added yet</Text>
          <Text style={styles.emptySubtitle}>
            Start one or scan a QR to join a friend's tab
          </Text>
          <Button
            label="+ Start a Tab"
            onPress={handleStartTab}
            style={styles.homeButton}
          />
          <Button
            label="Scan QR to Join"
            onPress={handleScanQR}
            variant="secondary"
            style={styles.homeButton}
          />
        </View>
      )}

      <MainNav activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.Cream,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 22,
    lineHeight: 27,
    color: Color.Espresso,
  },
  headerDivider: {
    height: 1,
    backgroundColor: Color.Gold,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 79,
    paddingHorizontal: 24,
    gap: 16,
  },
  emptyHeading: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 26,
    lineHeight: 31,
    color: Color.Espresso,
    textAlign: 'center',
    marginTop: 8,
  },
  emptySubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Color.WarmBrown,
    textAlign: 'center',
    maxWidth: 280,
  },
  homeButton: {
    width: 327,
    marginTop: 8,
  },
});
