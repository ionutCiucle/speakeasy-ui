import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate, Link } from 'react-router-native';
import { Color, flex } from '../../styles';
import { BracketContainer, Button, Input } from '../../components';
import { useAuthAsyncActions } from '../../state-management/auth';

export function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { register } = useAuthAsyncActions();
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleRegister = useCallback(async () => {
    setError(null);
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const success = await register({ email, password, username });
    if (success) {
      navigate('/home');
    } else {
      setError('Registration failed. Please try again.');
    }
  }, [email, password, confirmPassword, username, register, navigate]);

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
            onChangeText={setUsername}
            autoCapitalize="none"
          />

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

          <Input
            label="CONFIRM PASSWORD"
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {error && <Text style={styles.error}>{error}</Text>}

          <Text style={styles.terms}>
            By registering you agree to our Terms of Service and Privacy Policy.
          </Text>

          <Button label="Create Account" onPress={handleRegister} style={styles.button} />

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
