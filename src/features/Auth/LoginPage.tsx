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
    // TODO: implement forgot password
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />

      <View style={styles.content}>
        <Text style={styles.logo}>S</Text>

        <Text style={styles.title}>Welcome Back</Text>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>SPEAKEASY</Text>
          <View style={styles.subtitleUnderline} />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="your@email.com"
            placeholderTextColor={Color.RaisinBlackLight}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••••"
            placeholderTextColor={Color.RaisinBlackLight}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>

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

      <View style={styles.cornerBracketBottomLeft} />
      <View style={styles.cornerBracketBottomRight} />
    </View>
  );
}

const BRACKET_SIZE = 24;
const BRACKET_THICKNESS = 2;
const BRACKET_MARGIN = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Cream,
  },
  topBar: {
    height: 4,
    backgroundColor: Color.Gold,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    alignItems: 'center',
  },
  logo: {
    fontSize: 56,
    fontStyle: 'italic',
    color: Color.Gold,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: Color.RaisinBlack,
    marginBottom: 4,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Color.Gold,
    letterSpacing: 4,
    marginBottom: 6,
  },
  subtitleUnderline: {
    width: 120,
    height: 1,
    backgroundColor: Color.Gold,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: Color.RaisinBlack,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Color.White,
    borderWidth: 1,
    borderColor: Color.Cream,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Color.RaisinBlack,
    marginBottom: 16,
  },
  forgotPassword: {
    color: Color.Gold,
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 24,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: Color.Gold,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: Color.White,
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    ...flex('row', 'center', 'center'),
    marginBottom: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Color.RaisinBlackLight,
  },
  dividerText: {
    color: Color.RaisinBlack,
    fontSize: 14,
  },
  createAccountRow: {
    ...flex('row', 'center', 'center'),
  },
  createAccountText: {
    color: Color.RaisinBlack,
    fontSize: 14,
  },
  createAccountLink: {
    color: Color.Gold,
    fontSize: 14,
  },
  cornerBracketBottomLeft: {
    position: 'absolute',
    bottom: BRACKET_MARGIN,
    left: BRACKET_MARGIN,
    width: BRACKET_SIZE,
    height: BRACKET_SIZE,
    borderLeftWidth: BRACKET_THICKNESS,
    borderBottomWidth: BRACKET_THICKNESS,
    borderColor: Color.Gold,
  },
  cornerBracketBottomRight: {
    position: 'absolute',
    bottom: BRACKET_MARGIN,
    right: BRACKET_MARGIN,
    width: BRACKET_SIZE,
    height: BRACKET_SIZE,
    borderRightWidth: BRACKET_THICKNESS,
    borderBottomWidth: BRACKET_THICKNESS,
    borderColor: Color.Gold,
  },
});
