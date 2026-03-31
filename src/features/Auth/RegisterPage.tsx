import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigate, Link } from 'react-router-native';
import { Color, flex } from '@/styles';
import { BracketContainer, Button, Input } from '@/components';
import { useAuthWorkflows } from '@/state-management/auth';
import { useValidatedEmailField, useValidatedTextField } from '@/components';

export function RegisterPage() {
  const [username, onUsernameChange, usernameError, validateUsername] =
    useValidatedTextField('Username');
  const [email, onEmailChange, emailError, validateEmail] =
    useValidatedEmailField();
  const [password, onPasswordChange, passwordError, validatePassword] =
    useValidatedTextField('Password');
  const [
    confirmPassword,
    onConfirmPasswordChange,
    confirmPasswordError,
    validateConfirmPassword,
  ] = useValidatedTextField('Confirm password');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { registerAndLogin } = useAuthWorkflows();
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleRegister = useCallback(async () => {
    setSubmitError(null);
    const usernameOk = validateUsername();
    const emailOk = validateEmail();
    const passwordOk = validatePassword();
    const confirmOk = validateConfirmPassword();
    if (!usernameOk || !emailOk || !passwordOk || !confirmOk) {
      return;
    }
    if (password !== confirmPassword) {
      setSubmitError('Passwords do not match.');
      return;
    }
    const success = await registerAndLogin({ email, password, username });
    if (success) {
      navigate('/home');
    } else {
      setSubmitError('Registration failed. Please try again.');
    }
  }, [
    email,
    password,
    confirmPassword,
    username,
    registerAndLogin,
    navigate,
    validateUsername,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
  ]);

  return (
    <BracketContainer onBack={handleBack}>
      <View style={styles.content}>
        <Text style={styles.title}>Join the Club</Text>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>SPEAKEASY</Text>
          <View style={styles.subtitleUnderline} />
        </View>

        <View style={styles.form}>
          <Input
            label="USERNAME"
            placeholder="@yourname"
            value={username}
            invalid={!!usernameError}
            error={usernameError ?? undefined}
            autoCapitalize="none"
            onChangeText={onUsernameChange}
          />

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

          <Input
            label="CONFIRM PASSWORD"
            placeholder="••••••••"
            value={confirmPassword}
            invalid={!!confirmPasswordError}
            error={confirmPasswordError ?? undefined}
            secureTextEntry
            onChangeText={onConfirmPasswordChange}
          />

          {submitError && <Text style={styles.error}>{submitError}</Text>}

          <Text style={styles.terms}>
            By registering you agree to our Terms of Service and Privacy Policy.
          </Text>

          <Button
            label="Create Account"
            onPress={handleRegister}
            style={styles.button}
          />

          <View style={styles.signInRow}>
            <Text style={styles.signInText}>Already a member? </Text>
            <Link to="/login">
              <Text style={styles.signInText}>Sign In</Text>
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
    marginBottom: 24,
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
  error: {
    color: Color.Flame,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    marginBottom: 12,
  },
  terms: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: Color.WarmBrown,
    marginBottom: 16,
  },
  button: {
    marginBottom: 20,
  },
  signInRow: {
    ...flex('row', 'center', 'center'),
  },
  signInText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 17,
    color: Color.WarmBrown,
  },
});
