import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Color } from '@/styles';
import { AccentCard } from '@/components';

export type TabRole = 'host' | 'guest';
export type TabStatus = 'active' | 'closed';

export interface TabCardData {
  id: string;
  title: string;
  venue: string;
  status: TabStatus;
  role: TabRole;
  duration?: string;
  date?: string;
  memberCount: number;
  totalAmount: string;
}

interface Props {
  tab: TabCardData;
  onPress?: () => void;
}

export function TabCard({ tab, onPress }: Props) {
  const isActive = tab.status === 'active';
  const isHost = tab.role === 'host';

  const accentColor = isActive ? Color.ActiveGreen : Color.Gold;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <AccentCard
        accentColor={accentColor}
        style={isActive ? styles.cardActive : styles.cardClosed}
      >
        <View style={styles.body}>
          <View style={styles.left}>
            <Text
              style={[styles.title, !isActive && styles.titleClosed]}
              numberOfLines={1}
            >
              {tab.title}
            </Text>
            <Text style={styles.venue} numberOfLines={1}>
              {tab.venue}
            </Text>
            {isActive ? (
              <>
                <View style={styles.activeStatusRow}>
                  <View style={styles.activeDot} />
                  <Text style={styles.activeStatusText}>
                    Active · {tab.duration}
                  </Text>
                </View>
                <Text style={styles.memberCount}>
                  {tab.memberCount} members
                </Text>
              </>
            ) : (
              <Text style={styles.closedMeta}>
                {tab.date} · {tab.memberCount} members
              </Text>
            )}
          </View>

          <View style={styles.right}>
            <View
              style={[
                styles.roleBadge,
                isHost ? styles.roleBadgeHost : styles.roleBadgeGuest,
              ]}
            >
              <Text
                style={[
                  styles.roleLabel,
                  isHost ? styles.roleLabelHost : styles.roleLabelGuest,
                ]}
              >
                {isHost ? 'Host' : 'Guest'}
              </Text>
            </View>
            <Feather name="chevron-right" size={14} color={Color.Sand} />
            <Text style={styles.amount}>{tab.totalAmount}</Text>
          </View>
        </View>
      </AccentCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardActive: {
    minHeight: 96,
  },
  cardClosed: {
    minHeight: 88,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 12,
    paddingVertical: 11,
  },
  left: {
    flex: 1,
    gap: 4,
    paddingRight: 8,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    lineHeight: 18,
    color: Color.Espresso,
  },
  titleClosed: {
    fontSize: 14,
    lineHeight: 17,
  },
  venue: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: Color.WarmBrown,
  },
  activeStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Color.ActiveGreen,
  },
  activeStatusText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    lineHeight: 13,
    color: Color.ActiveGreen,
  },
  memberCount: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
  },
  closedMeta: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  roleBadge: {
    height: 22,
    paddingHorizontal: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleBadgeHost: {
    backgroundColor: Color.EspressoDark,
  },
  roleBadgeGuest: {
    backgroundColor: Color.Linen,
  },
  roleLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    lineHeight: 13,
  },
  roleLabelHost: {
    color: Color.White,
  },
  roleLabelGuest: {
    color: Color.WarmBrown,
  },
  amount: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    lineHeight: 16,
    color: Color.Gold,
  },
});
