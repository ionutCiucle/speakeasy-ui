import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate, Link } from 'react-router-native';
import { Color, flex } from '@/styles';
import { BracketContainer, Button, Input } from '@/components';
import { useAuthWorkflows } from '@/state-management/auth';
import { useValidatedEmailField } from './hooks/useValidatedEmailField';
import { useValidatedTextField } from './hooks/useValidatedTextField';

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
    <BracketContainer>
      <View style={styles.statusBarArea} />

      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>‹ Back</Text>
      </TouchableOpacity>

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
            onChangeText={onUsernameChange}
            autoCapitalize="none"
          />
          {usernameError && <Text style={styles.error}>{usernameError}</Text>}

          <Input
            label="EMAIL"
            placeholder="your@email.com"
            value={email}
            onChangeText={onEmailChange}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {emailError && <Text style={styles.error}>{emailError}</Text>}

          <Input
            label="PASSWORD"
            placeholder="••••••••"
            value={password}
            onChangeText={onPasswordChange}
            secureTextEntry
          />
          {passwordError && <Text style={styles.error}>{passwordError}</Text>}

          <Input
            label="CONFIRM PASSWORD"
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={onConfirmPasswordChange}
            secureTextEntry
          />
          {confirmPasswordError && (
            <Text style={styles.error}>{confirmPasswordError}</Text>
          )}

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
  statusBarArea: {
    height: 44,
  },
  backButton: {
    paddingHorizontal: 31.5,
    paddingVertical: 8,
  },
  backButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    lineHeight: 18,
    color: Color.Gold,
  },
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
    color: 'red',
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
