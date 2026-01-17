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