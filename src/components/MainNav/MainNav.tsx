import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Color, flex } from '@/styles';
import { NavIcon } from './NavIcon';

export type MainNavTab = 'home' | 'newTab' | 'friends' | 'profile';

interface Props {
  activeTab?: MainNavTab;
  onTabPress?: (tab: MainNavTab) => void;
}

const NAV_ITEMS: { key: MainNavTab; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'newTab', label: 'New Tab' },
  { key: 'friends', label: 'Friends' },
  { key: 'profile', label: 'Profile' },
];

export function MainNav({ activeTab = 'home', onTabPress }: Props) {
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
    shadowColor: Color.Black,
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
    ...flex('row', 'space-around', 'center'),
    height: 62,
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    ...flex('column', 'center', 'center'),
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
