import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from './ToastContext';

export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';

interface User {
  id: string; // Backend sends Long, but JS handles as number/string
  username: string;
  fullName: string;
  email?: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  // Fetch user profile on mount if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        // CHECK FOR MOCK TOKEN
        if (token.startsWith('mock-jwt-token-')) {
          const roleSuffix = token.replace('mock-jwt-token-', '');
          // Simple mapping based on suffix
          let role = 'STUDENT';
          if (roleSuffix === 'ADMIN') role = 'ADMIN';
          if (roleSuffix === 'TEACHER') role = 'TEACHER';
          if (roleSuffix === 'PARENT') role = 'PARENT';

          setUser({
            id: '1',
            username: role.toLowerCase(),
            fullName: role === 'STUDENT' ? 'أحمد محمد' : (role === 'ADMIN' ? 'المدير' : 'الأستاذ'),
            role: role as UserRole
          });
          setIsLoading(false);
          return;
        }

        try {
          const response = await api.get('/auth/me'); // GET /auth/me returns User details
          setUser(response.data);
        } catch (err) {
          console.error('Failed to fetch user', err);
          logout();
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (credentials: any) => {
    setIsLoading(true);
    setError(null);
    try {
      // MOCK LOGIN FOR DEVELOPMENT - DISABLED TO USE REAL BACKEND
      /*
      if (credentials.username === 'student' || credentials.username === 'admin' || credentials.username === 'teacher' || credentials.username === 'parent') {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let role = 'STUDENT';
        if (credentials.username === 'admin') role = 'ADMIN';
        if (credentials.username === 'teacher') role = 'TEACHER';
        if (credentials.username === 'parent') role = 'PARENT';

        const mockUser = {
          token: 'mock-jwt-token-' + role,
          userId: 1,
          username: credentials.username,
          fullName: role === 'STUDENT' ? 'أحمد محمد' : (role === 'ADMIN' ? 'المدير' : (role === 'TEACHER' ? 'الأستاذ' : 'ولي الأمر')),
          role: role
        };

        localStorage.setItem('token', mockUser.token);
        setToken(mockUser.token);
        setUser({
          id: mockUser.userId.toString(),
          username: mockUser.username,
          fullName: mockUser.fullName,
          role: mockUser.role as UserRole
        });
        addToast('تم تسجيل الدخول (تجريبي)', 'success');
        setIsLoading(false);
        return;
      }
      */

      const response = await api.post('/auth/login', credentials);
      // AuthResponse: { token, userId, username, fullName, role, message }
      const { token: newToken, userId, username, fullName, role } = response.data;

      localStorage.setItem('token', newToken);
      setToken(newToken);

      // Set user state immediately from login response
      setUser({
        id: userId.toString(),
        username,
        fullName,
        role
      });

      addToast('تم تسجيل الدخول بنجاح', 'success');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'فشل تسجيل الدخول. تأكد من البيانات.';
      setError(msg);
      addToast(msg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    addToast('تم تسجيل الخروج', 'info');
    // Redirect will be handled by ProtectedRoute or caller
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, isLoading, error, login, logout }}>
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