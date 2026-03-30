import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Color } from '@/styles';

type TabName = 'home' | 'newTab' | 'friends' | 'profile';

interface Props {
  activeTab?: TabName;
  onTabPress?: (tab: TabName) => void;
}

interface NavItem {
  key: TabName;
  label: string;
  iconStyle: object;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'home', label: 'Home', iconStyle: { width: 18, height: 12 } },
  { key: 'newTab', label: 'New Tab', iconStyle: { width: 18, height: 18 } },
  { key: 'friends', label: 'Friends', iconStyle: { width: 22, height: 23.5 } },
  { key: 'profile', label: 'Profile', iconStyle: { width: 16, height: 24 } },
];

export function BottomNav({ activeTab = 'home', onTabPress }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <View style={styles.tabs}>
        {NAV_ITEMS.map(({ key, label, iconStyle }) => {
          const isActive = key === activeTab;
          const color = isActive ? Color.Gold : Color.WarmBrown;
          return (
            <TouchableOpacity
              key={key}
              style={styles.tab}
              onPress={() => onTabPress?.(key)}
              activeOpacity={0.7}
            >
              <View style={[styles.icon, iconStyle, { borderColor: color }]} />
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
    height: 82,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    borderWidth: 1.5,
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
