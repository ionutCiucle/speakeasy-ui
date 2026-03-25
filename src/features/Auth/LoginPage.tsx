import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigate } from 'react-router-native';
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

  const handleGoogleLogin = useCallback(() => {
    // TODO: implement Google login
  }, []);

  const handleForgotPassword = useCallback(() => {
    // TODO: implement forgot password
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Color.RaisinBlackLight}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Color.RaisinBlackLight}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot my password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <Text style={styles.googleButtonText}>Log in with Google</Text>
        </TouchableOpacity>
      </View>
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
  form: {
    width: '100%',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: Color.RaisinBlackLight,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Color.RaisinBlack,
    marginBottom: 12,
  },
  forgotPassword: {
    color: Color.Vetrdgris,
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: Color.KellyGreen,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: Color.White,
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    ...flex('row', 'center', 'center'),
    marginBottom: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Color.RaisinBlackLight,
  },
  dividerText: {
    color: Color.RaisinBlackLight,
    fontSize: 14,
  },
  googleButton: {
    borderWidth: 1,
    borderColor: Color.RaisinBlack,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  googleButtonText: {
    color: Color.RaisinBlack,
    fontSize: 16,
    fontWeight: '600',
  },
});
