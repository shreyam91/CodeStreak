'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, User } from '@/lib/api';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      const devUser = localStorage.getItem('dev_user');
      if (token && devUser) {
        setUser(JSON.parse(devUser));
      } else {
        if (!pathname?.includes('/login') && !pathname?.includes('/register')) {
          router.push('/login');
        }
      }
    } catch (error: any) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      
      // DEV MOCK AUTH
      if (email === 'dev@test.com' && password === 'dev123') {
        const token = 'dummy-token';
        const mockUser = {
          _id: '64f1b2c3d4e5f6a7b8c9d0e1',
          name: 'Dev User',
          email: 'dev@test.com',
          streak: { current: 0, longest: 0, lastCompleted: '' }
        };
        localStorage.setItem('token', token);
        localStorage.setItem('dev_user', JSON.stringify(mockUser));
        setUser(mockUser as any);
        router.push('/dashboard');
        return;
      }
      
      throw new Error('Invalid credentials. Use dev@test.com / dev123');
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      const token = 'dummy-token';
      const mockUser = {
        _id: '64f1b2c3d4e5f6a7b8c9d0e1',
        name,
        email,
        streak: { current: 0, longest: 0, lastCompleted: '' }
      };
      localStorage.setItem('token', token);
      localStorage.setItem('dev_user', JSON.stringify(mockUser));
      setUser(mockUser as any);
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('dev_user');
    setUser(null);
    setError(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 