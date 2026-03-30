import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Color } from '@/styles';
import { useAppSelector } from '@/state-management/providerHooks';
import { useAuthAsyncActions } from '@/state-management/auth';

export function ProfilePage() {
  const username = useAppSelector((s) => s.auth.username);
  const email = useAppSelector((s) => s.auth.email);
  const { logout } = useAuthAsyncActions();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    await logout();
    navigate('/');
  }, [logout, navigate]);

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>{username || '—'}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email || '—'}</Text>
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  field: {
    paddingVertical: 16,
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 16,
    color: Color.WarmBrown,
    marginBottom: 4,
  },
  value: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 22,
    color: Color.Espresso,
  },
  divider: {
    height: 1,
    backgroundColor: Color.Sand,
  },
  logoutButton: {
    marginTop: 32,
    height: 54,
    borderWidth: 1.5,
    borderColor: Color.Espresso,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.3,
    color: Color.Espresso,
  },
});
