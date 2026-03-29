import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Color, flex } from '@/styles';
import { useAuthAsyncActions } from '@/state-management/auth';
import { useNavigate } from 'react-router-native';

export function HomePage() {
  const { logout } = useAuthAsyncActions();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    await logout();
    navigate('/');
  }, [logout, navigate]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
    ...flex('column', 'center', 'center'),
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Color.RaisinBlack,
    marginBottom: 32,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: Color.RaisinBlack,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: Color.RaisinBlack,
    fontSize: 16,
    fontWeight: '600',
  },
});
