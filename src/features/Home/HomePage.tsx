import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Color } from '@/styles';
import { BottomNav, TabReceiptIcon } from './components';
import { BottomNavTab } from './components/BottomNav';
import { ProfilePage } from '@/features/Profile';

const HEADER_TITLES: Record<BottomNavTab, string> = {
  home: 'My Tabs',
  newTab: 'New Tab',
  friends: 'Friends',
  profile: 'Profile',
};

export function HomePage() {
  const [activeTab, setActiveTab] = useState<BottomNavTab>('home');

  const handleStartTab = useCallback(() => {
    // TODO: navigate to start tab flow
  }, []);

  const handleScanQR = useCallback(() => {
    // TODO: navigate to QR scanner
  }, []);

  const handleTabPress = useCallback((tab: BottomNavTab) => {
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
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleStartTab}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>+ Start a Tab</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleScanQR}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Scan QR to Join</Text>
          </TouchableOpacity>
        </View>
      )}

      <BottomNav activeTab={activeTab} onTabPress={handleTabPress} />
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
  primaryButton: {
    width: 327,
    height: 54,
    backgroundColor: Color.Gold,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  primaryButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.3,
    color: Color.White,
  },
  secondaryButton: {
    width: 327,
    height: 54,
    backgroundColor: Color.Cream,
    borderWidth: 1.5,
    borderColor: Color.Gold,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.3,
    color: Color.Gold,
  },
});
