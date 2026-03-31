import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Color } from '@/styles';
import { Button, MainNav, MainNavTab, PageHeader } from '@/components';
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
      <PageHeader title={HEADER_TITLES[activeTab]} />

      {activeTab === 'profile' ? (
        <ProfilePage />
      ) : (
        <View style={styles.emptyState}>
          <FontAwesome6
            name="martini-glass-empty"
            size={84}
            color={Color.Gold}
          />
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
