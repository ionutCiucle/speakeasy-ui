import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Pill } from '@/components';

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
    <View style={styles.row}>
      {filters.map(({ key, label }) => (
        <Pill
          key={key}
          label={label}
          active={activeFilter === key}
          variant="filter"
          onPress={() => onFilterChange(key)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
});
