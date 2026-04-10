import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Color } from '@/styles';
import type { ActiveView } from '../types';

interface Props {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
}

export function TabViewToggle({ activeView, onViewChange }: Props) {
  return (
    <View style={styles.toggle}>
      <TouchableOpacity
        style={[
          styles.toggleTab,
          activeView === 'mine' && styles.toggleTabActive,
        ]}
        onPress={() => onViewChange('mine')}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.toggleLabel,
            activeView === 'mine' && styles.toggleLabelActive,
          ]}
        >
          My Items
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.toggleTab,
          activeView === 'all' && styles.toggleTabActive,
        ]}
        onPress={() => onViewChange('all')}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.toggleLabel,
            activeView === 'all' && styles.toggleLabelActive,
          ]}
        >
          All Members
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toggle: {
    flexDirection: 'row',
    backgroundColor: Color.Ivory,
    borderRadius: 6,
    height: 36,
  },
  toggleTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  toggleTabActive: {
    backgroundColor: Color.Gold,
  },
  toggleLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: Color.WarmBrown,
  },
  toggleLabelActive: {
    fontFamily: 'Inter_600SemiBold',
    color: Color.White,
  },
});
