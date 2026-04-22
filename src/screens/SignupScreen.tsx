import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AlertBox from '../components/AlertBox';
import Divider from '../components/Divider';
import FormField from '../components/FormField';
import PasswordField from '../components/PasswordField';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { useSignupForm } from '../hooks/useSignupForm';

type Props = {
  navigation: any;
};

export default function SignupScreen({ navigation }: Props) {
  const {
    control,
    errors,
    loading,
    generalError,
    clearGeneralError,
    onSubmit
  } = useSignupForm();

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}>
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>

          <View style={styles.card}>
            {generalError ? <AlertBox message={generalError} /> : null}

            <FormField
              control={control}
              name="name"
              label="Full Name"
              error={errors.name}
              placeholder="John Doe"
              autoCapitalize="words"
            />

            <FormField
              control={control}
              name="email"
              label="Email"
              error={errors.email}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeCallback={clearGeneralError}
            />

            <PasswordField
              control={control}
              name="password"
              label="Password"
              error={errors.password}
              placeholder="Min. 6 characters"
            />

            <PrimaryButton
              label="Signup"
              loadingLabel="Creating account..."
              loading={loading}
              onPress={onSubmit}
            />

            <Divider />

            <SecondaryButton
              label="Go to Login"
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#F1F5F9'
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 6
  },
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
});
