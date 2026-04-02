import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Color } from '@/styles';
import { toInitials } from '@/utils';
import { Avatar } from './Avatar';

interface Member {
  id: string;
  name: string;
}

interface Props {
  members: Member[];
  label?: string;
  showSelf?: boolean;
  onAdd?: () => void;
}

export function MemberAvatars({
  members,
  label = "WHO'S JOINING?",
  showSelf = true,
  onAdd,
}: Props) {
  return (
    <View>
      <Text style={styles.sectionHeader}>{label}</Text>
      <View style={styles.panel}>
        {showSelf && <Avatar label="Me" variant="self" size={44} />}
        {members.map((member) => (
          <Avatar
            key={member.id}
            label={toInitials(member.name)}
            variant="member"
            size={44}
          />
        ))}
        <TouchableOpacity
          style={styles.addCircle}
          onPress={onAdd}
          activeOpacity={0.7}
        >
          <Text style={styles.addPlus}>+</Text>
        </TouchableOpacity>
        {members.length === 0 && (
          <Text style={styles.emptyText}>No other members added</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.8,
    color: Color.WarmBrown,
    marginBottom: 12,
  },
  panel: {
    backgroundColor: Color.Linen,
    borderRadius: 10,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 12,
    gap: 8,
  },
  addCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Color.Sand,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPlus: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    lineHeight: 22,
    color: Color.WarmBrown,
  },
  emptyText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
  },
});
