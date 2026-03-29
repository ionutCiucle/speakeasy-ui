import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate, Link } from 'react-router-native';
import { Color, flex } from '../../styles';
import { Button, Input } from '../components';
import { useAuthAsyncActions } from '../../state-management/auth';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthAsyncActions();
  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    setError(null);
    const success = await login({ email, password });
    if (success) {
      navigate('/home');
    } else {
      setError('Login failed. Please check your credentials.');
    }
  }, [email, password, login, navigate]);

  const handleForgotPassword = useCallback(() => {
    navigate('/forgot-password');
  }, [navigate]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />

      <View style={styles.cornerBracketTopLeft} />
      <View style={styles.cornerBracketTopLeftVertical} />
      <View style={styles.cornerBracketTopRight} />
      <View style={styles.cornerBracketTopRightVertical} />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>S</Text>
          <View style={styles.dotLarge} />
          <View style={styles.dotMedium} />
          <View style={styles.dotSmall} />
        </View>

        <Text style={styles.title}>Welcome Back</Text>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>SPEAKEASY</Text>
          <View style={styles.subtitleUnderline} />
        </View>

        <View style={styles.form}>
          <Input
            label="EMAIL"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Input
            label="PASSWORD"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          {error && <Text style={styles.error}>{error}</Text>}

          <Button label="Sign In" onPress={handleLogin} style={styles.button} />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.createAccountRow}>
            <Text style={styles.createAccountText}>Don't have an account? </Text>
            <Link to="/register">
              <Text style={styles.createAccountLink}>Create one</Text>
            </Link>
          </View>
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
    paddingTop: 48,
    alignItems: 'center',
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  logo: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 52,
    lineHeight: 63,
    color: Color.Gold,
  },
  dotLarge: {
    position: 'absolute',
    width: 5.72,
    height: 5.72,
    borderRadius: 2.86,
    backgroundColor: Color.Gold,
    top: 11,
    left: 19,
  },
  dotMedium: {
    position: 'absolute',
    width: 3.89,
    height: 3.89,
    borderRadius: 1.95,
    backgroundColor: Color.Gold,
    top: 6,
    left: 28,
  },
  dotSmall: {
    position: 'absolute',
    width: 2.4,
    height: 2.4,
    borderRadius: 1.2,
    backgroundColor: Color.Gold,
    top: 2,
    left: 34,
  },
  title: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: 30,
    lineHeight: 36,
    color: Color.Espresso,
    marginBottom: 4,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  subtitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    lineHeight: 13,
    color: Color.Gold,
    letterSpacing: 4,
    marginBottom: 8,
  },
  subtitleUnderline: {
    width: 100,
    height: 1,
    backgroundColor: Color.Sand,
  },
  form: {
    width: '100%',
  },
  forgotPassword: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    lineHeight: 16,
    color: Color.Gold,
    textAlign: 'right',
    marginBottom: 28,
  },
  error: {
    color: 'red',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    marginBottom: 12,
  },
  button: {
    marginBottom: 20,
  },
  divider: {
    ...flex('row', 'center', 'center'),
    marginBottom: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Color.Sand,
  },
  dividerText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: Color.WarmBrown,
  },
  createAccountRow: {
    ...flex('row', 'center', 'center'),
  },
  createAccountText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 17,
    color: Color.WarmBrown,
  },
  createAccountLink: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 17,
    color: Color.WarmBrown,
  },
});
