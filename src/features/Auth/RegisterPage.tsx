import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigate, Link } from 'react-router-native';
import { Color, flex } from '../../styles';
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
        <Text style={styles.title}>Join the Club</Text>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>SPEAKEASY</Text>
          <View style={styles.subtitleUnderline} />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>USERNAME</Text>
          <TextInput
            style={styles.input}
            placeholder="@yourname"
            placeholderTextColor={Color.Sand}
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="your@email.com"
            placeholderTextColor={Color.Sand}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={Color.Sand}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>CONFIRM PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={Color.Sand}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {error && <Text style={styles.error}>{error}</Text>}

          <Text style={styles.terms}>
            By registering you agree to our Terms of Service and Privacy Policy.
          </Text>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.signInRow}>
            <Text style={styles.signInText}>Already a member? </Text>
            <Link to="/login">
              <Text style={styles.signInText}>Sign In</Text>
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
  statusBarArea: {
    height: 44,
    backgroundColor: Color.Cream,
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
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Color.Ivory,
    borderWidth: 1,
    borderColor: Color.Sand,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 17,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    lineHeight: 18,
    color: Color.Espresso,
    marginBottom: 16,
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
  registerButton: {
    backgroundColor: Color.Gold,
    borderRadius: 10,
    paddingVertical: 17,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.5,
    color: Color.White,
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
