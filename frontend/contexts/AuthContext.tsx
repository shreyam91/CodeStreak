'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, User } from '@/lib/api';
import { useRouter } from 'next/navigation';

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

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const userData = await authApi.getProfile();
      setUser(userData);
    } catch (error: any) {
      console.error('Auth check failed:', error);
      // If token is invalid or expired, clear it
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        setUser(null);
      }
      setError(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const { user, token } = await authApi.login({ email, password });
      if (!token) {
        throw new Error('No token received from server');
      }
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      const { user, token } = await authApi.register({ name, email, password });
      if (!token) {
        throw new Error('No token received from server');
      }
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
    router.push('/');
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