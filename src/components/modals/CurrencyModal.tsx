import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Color } from '@/styles';

interface CurrencyEntry {
  code: string;
  symbol: string;
  name: string;
  country: string;
  abbr: string;
  color: string;
}

const CURRENCIES: CurrencyEntry[] = [
  {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    country: 'United States',
    abbr: 'US',
    color: '#2E4F99',
  },
  {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    country: 'European Union',
    abbr: 'EU',
    color: '#0D308F',
  },
  {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    country: 'United Kingdom',
    abbr: 'GB',
    color: '#BF2133',
  },
  {
    code: 'CAD',
    symbol: '$',
    name: 'Canadian Dollar',
    country: 'Canada',
    abbr: 'CA',
    color: '#D92630',
  },
  {
    code: 'AUD',
    symbol: '$',
    name: 'Australian Dollar',
    country: 'Australia',
    abbr: 'AU',
    color: '#1A408C',
  },
  {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    country: 'Japan',
    abbr: 'JP',
    color: '#D9141F',
  },
  {
    code: 'MXN',
    symbol: '$',
    name: 'Mexican Peso',
    country: 'Mexico',
    abbr: 'MX',
    color: '#087A24',
  },
];

interface Props {
  onDone: () => void;
}

export function CurrencyModal({ onDone }: Props) {
  const [selectedCode, setSelectedCode] = useState('USD');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelect = useCallback((code: string) => {
    setSelectedCode(code);
  }, []);

  const filtered = searchQuery.trim()
    ? CURRENCIES.filter(
        (c) =>
          c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.country.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : CURRENCIES;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Select Currency</Text>
        <TouchableOpacity
          onPress={onDone}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.done}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchBar}>
        <Feather
          name="search"
          size={17}
          color={Color.WarmBrown}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search currencies…"
          placeholderTextColor={Color.WarmBrown}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* List */}
      <Text style={styles.sectionLabel}>POPULAR</Text>

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {filtered.map((item, index) => (
          <View key={item.code}>
            <TouchableOpacity
              style={[
                styles.row,
                item.code === selectedCode && styles.rowSelected,
              ]}
              activeOpacity={0.7}
              onPress={() => handleSelect(item.code)}
            >
              <View style={[styles.avatar, { backgroundColor: item.color }]}>
                <Text style={styles.avatarText}>{item.abbr}</Text>
              </View>

              <View style={styles.rowInfo}>
                <Text
                  style={[
                    styles.currencyCode,
                    item.code === selectedCode && styles.currencyCodeSelected,
                  ]}
                >
                  {item.code} {item.symbol}
                </Text>
                <Text style={styles.currencySubtitle}>
                  {item.name} · {item.country}
                </Text>
              </View>

              {item.code === selectedCode && (
                <Feather name="check" size={16} color={Color.Gold} />
              )}
            </TouchableOpacity>

            {index < filtered.length - 1 && <View style={styles.separator} />}
          </View>
        ))}

        <Text style={styles.scrollHint}>Scroll to see all currencies ›</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 14,
  },
  title: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 22,
    lineHeight: 27,
    color: Color.Espresso,
  },
  done: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 17,
    color: Color.Gold,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.Linen,
    borderRadius: 20,
    height: 40,
    marginHorizontal: 20,
    marginTop: 18,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: Color.Espresso,
  },
  sectionLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.8,
    color: Color.WarmBrown,
    paddingHorizontal: 20,
    marginTop: 22,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 51,
    paddingHorizontal: 20,
  },
  rowSelected: {
    backgroundColor: Color.Ivory,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 7.5,
    lineHeight: 9,
    color: Color.White,
  },
  rowInfo: {
    flex: 1,
  },
  currencyCode: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    lineHeight: 16,
    color: Color.Espresso,
  },
  currencyCodeSelected: {
    color: Color.Gold,
  },
  currencySubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
    marginTop: 3,
  },
  separator: {
    height: 1,
    backgroundColor: Color.Sand,
    marginHorizontal: 20,
  },
  scrollHint: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: Color.WarmBrown,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
});
