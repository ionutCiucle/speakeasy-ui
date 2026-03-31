import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate, Link } from 'react-router-native';
import { Color, flex } from '@/styles';
import { BracketContainer, Button, Input, Logo } from '@/components';
import { useAuthAsyncActions } from '@/state-management/auth';
import { useValidatedEmailField, useValidatedTextField } from '@/components';

export function LoginPage() {
  const [email, onEmailChange, emailError, validateEmail] =
    useValidatedEmailField();
  const [password, onPasswordChange, passwordError, validatePassword] =
    useValidatedTextField('Password');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { login } = useAuthAsyncActions();
  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    setSubmitError(null);
    const emailOk = validateEmail();
    const passwordOk = validatePassword();
    if (!emailOk || !passwordOk) {
      return;
    }
    const success = await login({ email, password });
    if (success) {
      navigate('/home');
    } else {
      setSubmitError('Login failed. Please check your credentials.');
    }
  }, [email, password, login, navigate, validateEmail, validatePassword]);

  const handleForgotPassword = useCallback(() => {
    navigate('/forgot-password');
  }, [navigate]);

  return (
    <BracketContainer>
      <View style={styles.content}>
        <Logo size={52} marginBottom={8} />

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
            invalid={!!emailError}
            error={emailError ?? undefined}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={onEmailChange}
          />

          <Input
            label="PASSWORD"
            placeholder="••••••••"
            value={password}
            invalid={!!passwordError}
            error={passwordError ?? undefined}
            secureTextEntry
            onChangeText={onPasswordChange}
          />

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          {submitError && <Text style={styles.error}>{submitError}</Text>}

          <Button label="Sign In" onPress={handleLogin} style={styles.button} />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.createAccountRow}>
            <Text style={styles.createAccountText}>
              Don't have an account?{' '}
            </Text>
            <Link to="/register">
              <Text style={styles.createAccountLink}>Create one</Text>
            </Link>
          </View>
        </View>
      </View>
    </BracketContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 31.5,
    paddingTop: 48,
    alignItems: 'center',
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
    color: Color.Flame,
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
