import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Color } from '@/styles';

export type BottomNavTab = 'home' | 'newTab' | 'friends' | 'profile';

interface Props {
  activeTab?: BottomNavTab;
  onTabPress?: (tab: BottomNavTab) => void;
}

function NavIcon({ tab, color }: { tab: BottomNavTab; color: string }) {
  switch (tab) {
    case 'home':
      return <Feather name="menu" size={20} color={color} />;
    case 'newTab':
      return <Feather name="plus" size={22} color={color} />;
    case 'friends':
      return <Ionicons name="people-outline" size={22} color={color} />;
    case 'profile':
      return <Feather name="user" size={20} color={color} />;
  }
}

const NAV_ITEMS: { key: BottomNavTab; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'newTab', label: 'New Tab' },
  { key: 'friends', label: 'Friends' },
  { key: 'profile', label: 'Profile' },
];

export function BottomNav({ activeTab = 'home', onTabPress }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <View style={styles.tabs}>
        {NAV_ITEMS.map(({ key, label }) => {
          const isActive = key === activeTab;
          const color = isActive ? Color.Gold : Color.WarmBrown;
          return (
            <TouchableOpacity
              key={key}
              style={styles.tab}
              onPress={() => onTabPress?.(key)}
              activeOpacity={0.7}
            >
              <NavIcon tab={key} color={color} />
              <Text style={[styles.label, { color }]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.homeIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  separator: {
    height: 1,
    backgroundColor: Color.Sand,
  },
  tabs: {
    flexDirection: 'row',
    height: 62,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
    lineHeight: 12,
  },
  homeIndicator: {
    height: 4,
    backgroundColor: Color.Gold,
  },
});
