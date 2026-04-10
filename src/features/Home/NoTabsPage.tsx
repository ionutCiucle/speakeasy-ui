import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Color } from '@/styles';
import { Button } from '@/components';

export function NoTabsPage() {
  const navigate = useNavigate();

  const handleStartTab = useCallback(() => {
    navigate('/create-tab');
  }, [navigate]);

  const handleScanQR = useCallback(() => {
    // TODO: navigate to QR scanner
  }, []);

  return (
    <View style={styles.emptyState}>
      <FontAwesome6 name="martini-glass-empty" size={84} color={Color.Gold} />
      <Text style={styles.emptyHeading}>No tabs added yet</Text>
      <Text style={styles.emptySubtitle}>
        Start one or scan a QR to join a friend's tab
      </Text>
      <Button
        label="+ Start a Tab"
        onPress={handleStartTab}
        style={styles.button}
      />
      <Button
        label="Scan QR to Join"
        onPress={handleScanQR}
        variant="secondary"
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 79,
    paddingHorizontal: 24,
    gap: 16,
  },
  emptyHeading: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 26,
    lineHeight: 31,
    color: Color.Espresso,
    textAlign: 'center',
    marginTop: 8,
  },
  emptySubtitle: {
    fontFamily: 'PlayfairDisplay_400Regular_Italic',
    fontSize: 14,
    lineHeight: 22,
    color: Color.WarmBrown,
    textAlign: 'center',
    maxWidth: 280,
  },
  button: {
    width: 327,
    marginTop: 8,
  },
});
