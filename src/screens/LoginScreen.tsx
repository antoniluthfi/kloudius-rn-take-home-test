import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  navigation: any;
};

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs: typeof errors = {};
    if (!email) {
      errs.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(email)) {
      errs.email = 'Invalid email format';
    }
    if (!password) {
      errs.password = 'Password is required';
    }
    return errs;
  }

  async function handleLogin() {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await login(email, password);
    } catch (e: any) {
      setErrors({ general: e.message || 'Login failed' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View style={styles.card}>
          {errors.general ? (
            <View style={styles.alertBox}>
              <Text style={styles.alertText}>{errors.general}</Text>
            </View>
          ) : null}

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              placeholder="you@example.com"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={text => {
                setEmail(text);
                setErrors(prev => ({ ...prev, email: undefined, general: undefined }));
              }}
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  errors.password ? styles.inputError : null,
                ]}
                placeholder="Your password"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  setErrors(prev => ({ ...prev, password: undefined, general: undefined }));
                }}
              />
              <Pressable
                style={styles.eyeButton}
                onPress={() => setShowPassword(v => !v)}>
                <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
              </Pressable>
            </View>
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>
              {loading ? 'Signing in...' : 'Login'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Signup')}
            activeOpacity={0.8}>
            <Text style={styles.secondaryButtonText}>Go to Signup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#F1F5F9' },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  header: { alignItems: 'center', marginBottom: 32 },
  title: { fontSize: 30, fontWeight: '700', color: '#0F172A', letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: '#64748B', marginTop: 6 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  alertBox: {
    backgroundColor: '#FEE2E2',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  alertText: { color: '#B91C1C', fontSize: 13, fontWeight: '500' },
  field: { marginBottom: 18 },
  label: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F172A',
  },
  inputError: { borderColor: '#EF4444' },
  passwordWrapper: { position: 'relative' },
  passwordInput: { paddingRight: 48 },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  eyeIcon: { fontSize: 18 },
  errorText: { color: '#EF4444', fontSize: 12, marginTop: 4, fontWeight: '500' },
  primaryButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.6 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E2E8F0' },
  dividerText: { marginHorizontal: 12, color: '#94A3B8', fontSize: 13 },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: { color: '#6366F1', fontSize: 15, fontWeight: '600' },
});
