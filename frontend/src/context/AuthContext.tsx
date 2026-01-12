import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Initial State
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock Users for Dev 1 Task
const MOCK_USERS: Record<string, User> = {
  'admin': { id: '1', username: 'admin', fullName: 'System Admin', email: 'admin@abnaouna.com', role: 'ADMIN' },
  'teacher': { id: '2', username: 'teacher', fullName: 'Mr. Ahmed', email: 'teacher@abnaouna.com', role: 'TEACHER' },
  'student': { id: '3', username: 'student', fullName: 'Ahmed Hassan', email: 'student@abnaouna.com', role: 'STUDENT' },
  'parent': { id: '4', username: 'parent', fullName: 'Mr. Hassan', email: 'parent@abnaouna.com', role: 'PARENT' },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  // Check for stored token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        setState({
          user: JSON.parse(storedUser),
          token: storedToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setState(s => ({ ...s, isLoading: false }));
      }
    } else {
      setState(s => ({ ...s, isLoading: false }));
    }
  }, []);

  const login = async (username: string, password: string) => {
    setState(s => ({ ...s, isLoading: true, error: null }));

    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simple Mock Authenticator
        if (MOCK_USERS[username] && password === '123456') { // Mock password
          const user = MOCK_USERS[username];
          const token = 'mock-jwt-token-' + user.id; // Mock token

          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          setState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          resolve();
        } else {
          setState(s => ({
            ...s,
            isLoading: false,
            error: 'Invalid username or password'
          }));
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setState({
      ...initialState,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};