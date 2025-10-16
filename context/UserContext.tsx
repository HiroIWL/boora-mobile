import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useUserType } from 'context/UserTypeContext';
import { useAuthenticated } from 'context/AuthenticatedContext';

interface Turma {
  id: string;
  nome: string;
}

interface User {
  sub: string;
  nome: string;
  registro_academico: string;
  role: 'ALUNO' | 'PROFESSOR';
  turma: Turma;
}

interface UserContextProps {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, setIsAuthenticated } = useAuthenticated();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { setUserType } = useUserType();

  async function fetchUser() {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsed: User = JSON.parse(storedUser);
        setUser(parsed);
        setUserType(parsed.role);
        setIsAuthenticated(true);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [isAuthenticated]);

  async function logout() {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      router.replace('/login');
    } catch {}
  }

  return (
    <UserContext.Provider value={{ user, loading, refreshUser: fetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser deve estar dentro de UserProvider');
  return ctx;
}
