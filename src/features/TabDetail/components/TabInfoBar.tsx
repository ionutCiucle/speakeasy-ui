import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Color } from '@/styles';
import { formatDuration } from '@/utils';

interface Props {
  venue: string;
  isActive: boolean;
  createdAt: string;
  memberCount: number;
}

export function TabInfoBar({ venue, isActive, createdAt, memberCount }: Props) {
  return (
    <View style={styles.infoBar}>
      <View style={styles.infoLeft}>
        <Feather name="map-pin" size={12} color={Color.WarmBrown} />
        <Text style={styles.infoVenue}>{venue}</Text>
      </View>
      {isActive && (
        <View style={styles.infoMiddle}>
          <View style={styles.activeDot} />
          <Text style={styles.infoStatus}>
            Active · {formatDuration(createdAt)}
          </Text>
        </View>
      )}
      <Text style={styles.infoMembers}>{memberCount} members</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 20,
    backgroundColor: Color.Linen,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoVenue: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: Color.WarmBrown,
    marginLeft: 6,
  },
  infoMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Color.ActiveGreen,
    marginRight: 5,
  },
  infoStatus: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    lineHeight: 15,
    color: Color.ActiveGreen,
  },
  infoMembers: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: Color.WarmBrown,
  },
});
