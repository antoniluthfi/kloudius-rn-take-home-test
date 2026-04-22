import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type User = {
  name: string;
  email: string;
};

type StoredUser = User & { password: string };

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const CURRENT_USER_KEY = 'auth_current_user';
const USERS_KEY = 'auth_users';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(CURRENT_USER_KEY).then(value => {
      if (value) {
        setUser(JSON.parse(value));
      }
    });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    const users: StoredUser[] = raw ? JSON.parse(raw) : [];
    const found = users.find(
      u => u.email === email && u.password === password,
    );
    if (!found) {
      throw new Error('Incorrect credentials');
    }
    const loggedIn: User = { name: found.name, email: found.email };
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedIn));
    setUser(loggedIn);
  }, []);

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      const raw = await AsyncStorage.getItem(USERS_KEY);
      const users: StoredUser[] = raw ? JSON.parse(raw) : [];
      if (users.find(u => u.email === email)) {
        throw new Error('Email already registered');
      }
      users.push({ name, email, password });
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
      const loggedIn: User = { name, email };
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedIn));
      setUser(loggedIn);
    },
    [],
  );

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
