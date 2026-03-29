import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Color } from '../../styles';
import { Button, Input } from '../components';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleSendResetLink = useCallback(() => {
    // TODO: implement forgot password
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />

      <View style={styles.cornerBracketTopLeft} />
      <View style={styles.cornerBracketTopLeftVertical} />
      <View style={styles.cornerBracketTopRight} />
      <View style={styles.cornerBracketTopRightVertical} />

      <View style={styles.statusBarArea} />

      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>‹ Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password?</Text>
        <View style={styles.titleUnderline} />

        <Text style={styles.subtitle}>
          Enter your email and we'll send a reset link your way.
        </Text>

        <View style={styles.form}>
          <Input
            label="EMAIL"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Button label="Send Reset Link" onPress={handleSendResetLink} style={styles.button} />

          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.backToSignIn}>Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomBar} />

      <View style={styles.cornerBracketBottomLeft} />
      <View style={styles.cornerBracketBottomLeftVertical} />
      <View style={styles.cornerBracketBottomRight} />
      <View style={styles.cornerBracketBottomRightVertical} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Cream,
  },
  topBar: {
    height: 4,
    backgroundColor: Color.Gold,
  },
  bottomBar: {
    height: 4,
    backgroundColor: Color.Gold,
  },
  statusBarArea: {
    height: 44,
    backgroundColor: Color.Cream,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  backButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    lineHeight: 18,
    color: Color.Gold,
  },
  cornerBracketTopLeft: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 25,
    height: 1.5,
    backgroundColor: Color.Gold,
  },
  cornerBracketTopLeftVertical: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 1.5,
    height: 25,
    backgroundColor: Color.Gold,
  },
  cornerBracketTopRight: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 25,
    height: 1.5,
    backgroundColor: Color.Gold,
  },
  cornerBracketTopRightVertical: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 1.5,
    height: 25,
    backgroundColor: Color.Gold,
  },
  cornerBracketBottomLeft: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 25,
    height: 1.5,
    backgroundColor: Color.Gold,
  },
  cornerBracketBottomLeftVertical: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 1.5,
    height: 25,
    backgroundColor: Color.Gold,
  },
  cornerBracketBottomRight: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 25,
    height: 1.5,
    backgroundColor: Color.Gold,
  },
  cornerBracketBottomRightVertical: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 1.5,
    height: 25,
    backgroundColor: Color.Gold,
  },
  content: {
    flex: 1,
    paddingHorizontal: 31.5,
  },
  title: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: 30,
    lineHeight: 36,
    color: Color.Espresso,
    textAlign: 'center',
    marginBottom: 8,
  },
  titleUnderline: {
    width: 100,
    height: 1,
    backgroundColor: Color.Sand,
    alignSelf: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'PlayfairDisplay_400Regular_Italic',
    fontSize: 15,
    lineHeight: 24,
    color: Color.WarmBrown,
    marginBottom: 32,
  },
  form: {
    width: '100%',
  },
  button: {
    marginBottom: 20,
  },
  backToSignIn: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 17,
    color: Color.WarmBrown,
    textAlign: 'center',
  },
});
