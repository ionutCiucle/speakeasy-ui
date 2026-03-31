import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigate } from 'react-router-native';
import { Color } from '@/styles';
import { useAppSelector } from '@/state-management/providerHooks';

export function AddMemberStep() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const members = useAppSelector((state) => state.createTab.members);

  const handleFindFriends = useCallback(() => {
    navigate('/friends');
  }, [navigate]);

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.content}>
        {/* WHO'S JOINING? */}
        <Text style={styles.sectionHeader}>WHO'S JOINING?</Text>
        <View style={styles.membersPanel}>
          <TouchableOpacity style={styles.addAvatarCircle} activeOpacity={0.7}>
            <Text style={styles.addAvatarPlus}>+</Text>
          </TouchableOpacity>
          {members.length === 0 && (
            <Text style={styles.noMembersText}>No members added</Text>
          )}
        </View>

        {/* Search */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search your friends…"
          placeholderTextColor={Color.WarmBrown}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* YOUR FRIENDS */}
        <Text style={[styles.sectionHeader, styles.sectionHeaderSpaced]}>
          YOUR FRIENDS
        </Text>

        {/* Empty state */}
        <View style={styles.emptyState}>
          <View style={styles.emptyAvatarOuter}>
            <View style={styles.emptyAvatarHead} />
            <View style={styles.emptyAvatarBody} />
          </View>
          <Text style={styles.emptyTitle}>No friends yet</Text>
          <Text style={styles.emptySubtitle}>
            Add friends to easily invite them to tabs
          </Text>
          <TouchableOpacity
            style={styles.findFriendsButton}
            onPress={handleFindFriends}
            activeOpacity={0.8}
          >
            <Text style={styles.findFriendsLabel}>Find Friends</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  content: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.8,
    color: Color.WarmBrown,
    marginBottom: 12,
  },
  sectionHeaderSpaced: {
    marginTop: 16,
  },
  membersPanel: {
    backgroundColor: Color.Linen,
    borderRadius: 10,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  addAvatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Color.Sand,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAvatarPlus: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    lineHeight: 22,
    color: Color.WarmBrown,
  },
  noMembersText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
    marginLeft: 12,
  },
  searchBar: {
    backgroundColor: Color.Ivory,
    borderWidth: 1,
    borderColor: Color.Sand,
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 16,
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: Color.Espresso,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 8,
  },
  emptyAvatarOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Color.Linen,
  },
  emptyAvatarHead: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Color.Gold,
    top: 12,
    left: 24,
  },
  emptyAvatarBody: {
    position: 'absolute',
    width: 44,
    height: 20,
    borderRadius: 10,
    backgroundColor: Color.Gold,
    top: 52,
    left: 18,
  },
  emptyTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 19,
    color: Color.Espresso,
    textAlign: 'center',
    marginTop: 16,
  },
  emptySubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: Color.WarmBrown,
    textAlign: 'center',
    marginTop: 8,
  },
  findFriendsButton: {
    backgroundColor: Color.EspressoDark,
    borderRadius: 21,
    width: 160,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  findFriendsLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 17,
    color: Color.White,
  },
});
