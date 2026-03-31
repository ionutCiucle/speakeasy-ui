import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigate } from 'react-router-native';
import { Color } from '@/styles';
import { useAppSelector } from '@/state-management/providerHooks';

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
  AUD: 'A$',
  JPY: '¥',
  MXN: 'MX$',
};

function formatPrice(price: number, currencyCode: string): string {
  const symbol = CURRENCY_SYMBOLS[currencyCode] ?? currencyCode;
  return `${symbol}${price.toFixed(2)}`;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function ReviewStep() {
  const navigate = useNavigate();
  const tabName = useAppSelector((state) => state.createTab.tabName);
  const venue = useAppSelector((state) => state.createTab.venue);
  const currency = useAppSelector((state) => state.createTab.currency);
  const members = useAppSelector((state) => state.createTab.members);
  const menuItems = useAppSelector((state) => state.createTab.menuItems);

  const handleStartTab = () => {
    navigate('/home');
  };

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* TAB DETAILS */}
      <Text style={styles.sectionHeader}>TAB DETAILS</Text>
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <View style={styles.iconWrapper}>
            <Feather name="tag" size={14} color={Color.Gold} />
          </View>
          <Text style={styles.rowLabel}>Tab Name</Text>
          <Text style={styles.rowValue}>{tabName}</Text>
        </View>
        <View style={styles.cardDivider} />
        <View style={styles.cardRow}>
          <View style={styles.iconWrapper}>
            <Feather name="map-pin" size={14} color={Color.Gold} />
          </View>
          <Text style={styles.rowLabel}>Venue</Text>
          <Text style={styles.rowValue}>{venue}</Text>
        </View>
        <View style={styles.cardDivider} />
        <View style={styles.cardRow}>
          <View style={styles.iconWrapper}>
            <Feather name="clock" size={14} color={Color.Gold} />
          </View>
          <Text style={styles.rowLabel}>Currency</Text>
          <Text style={[styles.rowValue, styles.rowValueGold]}>
            {currency.code} · {currency.name}
          </Text>
        </View>
      </View>

      {/* MEMBERS */}
      <Text style={styles.sectionHeader}>MEMBERS ({members.length + 1})</Text>
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <View style={styles.iconWrapper}>
            <Feather name="user" size={14} color={Color.Gold} />
          </View>
          <Text style={styles.rowLabel}>Members</Text>
          <View style={styles.avatarGroup}>
            <View style={[styles.avatar, styles.avatarMe]}>
              <Text style={[styles.avatarText, styles.avatarTextMe]}>Me</Text>
            </View>
            {members.slice(0, 3).map((member) => (
              <View
                key={member.id}
                style={[
                  styles.avatar,
                  styles.avatarOther,
                  styles.avatarOverlap,
                ]}
              >
                <Text style={styles.avatarText}>
                  {getInitials(member.name)}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.cardDivider} />
        <View style={styles.cardRow}>
          <View style={styles.iconWrapper}>
            <Feather name="star" size={14} color={Color.Gold} />
          </View>
          <Text style={styles.rowLabel}>Your role</Text>
          <Text style={styles.rowValue}>Tab Host</Text>
        </View>
      </View>

      {/* ITEMS */}
      {menuItems.length > 0 && (
        <>
          <Text style={styles.sectionHeader}>ITEMS ({menuItems.length})</Text>
          <View style={styles.card}>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <View style={styles.cardRow}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemPrice}>
                    {formatPrice(item.price, currency.code)}
                  </Text>
                </View>
                {index < menuItems.length - 1 && (
                  <View style={styles.cardDivider} />
                )}
              </React.Fragment>
            ))}
            <View style={styles.infoBar}>
              <Text style={styles.infoBarText}>
                {menuItems.length} {menuItems.length === 1 ? 'item' : 'items'}{' '}
                on menu — members can order any of these
              </Text>
            </View>
          </View>
        </>
      )}

      {/* Start Tab */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={handleStartTab}
        activeOpacity={0.8}
      >
        <Text style={styles.startButtonLabel}>Start Tab</Text>
        <MaterialCommunityIcons
          name="glass-cocktail"
          size={20}
          color={Color.Gold}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  sectionHeader: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.8,
    color: Color.WarmBrown,
    marginTop: 20,
    marginBottom: 8,
  },
  card: {
    backgroundColor: Color.White,
    borderRadius: 8,
    shadowColor: Color.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 13,
  },
  iconWrapper: {
    width: 20,
    alignItems: 'center',
    marginRight: 8,
  },
  rowLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
    flex: 1,
  },
  rowValue: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    lineHeight: 15,
    color: Color.Espresso,
    textAlign: 'right',
    maxWidth: 180,
  },
  rowValueGold: {
    color: Color.Gold,
  },
  cardDivider: {
    height: 1,
    backgroundColor: Color.Sand,
    marginHorizontal: 12,
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarOverlap: {
    marginLeft: -6,
  },
  avatarMe: {
    backgroundColor: Color.Gold,
  },
  avatarOther: {
    backgroundColor: Color.Linen,
  },
  avatarText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 9,
    lineHeight: 11,
    color: Color.Espresso,
  },
  avatarTextMe: {
    color: Color.EspressoDark,
  },
  menuItemName: {
    flex: 1,
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    lineHeight: 15,
    color: Color.Espresso,
  },
  menuItemPrice: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: Color.Espresso,
  },
  infoBar: {
    backgroundColor: Color.Sand,
    paddingHorizontal: 12,
    paddingVertical: 5,
    justifyContent: 'center',
    minHeight: 22,
  },
  infoBarText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 13,
    color: Color.Espresso,
  },
  startButton: {
    flexDirection: 'row',
    backgroundColor: Color.EspressoDark,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 32,
  },
  startButtonLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 17,
    lineHeight: 21,
    color: Color.White,
  },
});
