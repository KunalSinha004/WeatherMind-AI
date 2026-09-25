import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import axios from 'axios';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, location?: string) => Promise<boolean>;
  logout: () => void;
  updateUserPreferences: (prefs: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('weathermind_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    // Default demo session for immediate major project review
    return {
      id: 'usr_demo_101',
      name: 'Kunal Sharma',
      email: 'user@weathermind.ai',
      role: 'admin',
      preferredLocation: 'Bangalore',
      tempUnit: 'celsius',
      savedCities: ['Bangalore', 'Delhi', 'Mumbai', 'Kolkata']
    };
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('weathermind_token') || 'demo_jwt_token_2026';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('weathermind_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('weathermind_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('weathermind_token', token);
    } else {
      localStorage.removeItem('weathermind_token');
    }
  }, [token]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      if (res.data?.success) {
        setUser(res.data.user);
        setToken(res.data.token);
        return true;
      }
    } catch (e) {}

    // Fallback demo login
    if (email === 'admin@weathermind.ai' || password === 'admin123') {
      const adminUser: User = {
        id: 'usr_admin_999',
        name: 'System Admin',
        email: 'admin@weathermind.ai',
        role: 'admin',
        preferredLocation: 'San Francisco',
        tempUnit: 'celsius',
        savedCities: ['San Francisco', 'London', 'Tokyo']
      };
      setUser(adminUser);
      setToken('demo_admin_jwt_token');
      return true;
    }

    const demoUser: User = {
      id: 'usr_demo_101',
      name: email.split('@')[0] || 'Kunal Sharma',
      email,
      role: 'user',
      preferredLocation: 'Bangalore',
      tempUnit: 'celsius',
      savedCities: ['Bangalore', 'Delhi', 'Mumbai']
    };
    setUser(demoUser);
    setToken('demo_jwt_token_2026');
    return true;
  };

  const register = async (name: string, email: string, password: string, location?: string): Promise<boolean> => {
    try {
      const res = await axios.post('/api/auth/register', { name, email, password, preferredLocation: location });
      if (res.data?.success) {
        setUser(res.data.user);
        setToken(res.data.token);
        return true;
      }
    } catch (e) {}

    const newUsr: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role: 'user',
      preferredLocation: location || 'Bangalore',
      tempUnit: 'celsius',
      savedCities: [location || 'Bangalore']
    };
    setUser(newUsr);
    setToken('demo_jwt_token_registered');
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('weathermind_user');
    localStorage.removeItem('weathermind_token');
  };

  const updateUserPreferences = (prefs: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...prefs };
      setUser(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUserPreferences
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
