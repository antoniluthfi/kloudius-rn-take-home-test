import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>
            {user?.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text style={styles.greeting}>Hello, {user?.name}! 👋</Text>
        <Text style={styles.subtitle}>You are successfully logged in</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{user?.name}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
          activeOpacity={0.8}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F1F5F9' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  avatarText: { fontSize: 36, fontWeight: '700', color: '#FFFFFF' },
  greeting: { fontSize: 24, fontWeight: '700', color: '#0F172A', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#64748B', marginTop: 6, marginBottom: 32 },
  infoCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 32,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  separator: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 12 },
  infoLabel: { fontSize: 13, color: '#64748B', fontWeight: '500' },
  infoValue: { fontSize: 14, color: '#0F172A', fontWeight: '600', flexShrink: 1, textAlign: 'right', marginLeft: 12 },
  logoutButton: {
    width: '100%',
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
});
