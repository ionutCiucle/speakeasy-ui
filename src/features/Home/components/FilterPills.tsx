import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Color } from '@/styles';

interface FilterOption {
  key: string;
  label: string;
}

interface Props {
  filters: FilterOption[];
  activeFilter: string;
  onFilterChange: (key: string) => void;
}

export function FilterPills({ filters, activeFilter, onFilterChange }: Props) {
  return (
    <View style={styles.filterPills}>
      {filters.map(({ key, label }) => (
        <TouchableOpacity
          key={key}
          style={[styles.pill, activeFilter === key && styles.pillActive]}
          onPress={() => onFilterChange(key)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.pillLabel,
              activeFilter === key && styles.pillLabelActive,
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  filterPills: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Cream,
    borderWidth: 1.5,
    borderColor: Color.Sand,
  },
  pillActive: {
    backgroundColor: Color.Gold,
    borderColor: Color.Gold,
  },
  pillLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: Color.WarmBrown,
  },
  pillLabelActive: {
    fontFamily: 'Inter_600SemiBold',
    color: Color.White,
  },
});
