import React, { useState, createContext, useContext } from 'react';
export type UserRole = 'student' | 'parent' | 'teacher' | 'admin' | null;
interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  login: (role: UserRole, email: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({
  children
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const login = async (role: UserRole, email: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    let name = '';
    switch (role) {
      case 'student':
        name = 'Ahmed';
        break;
      case 'teacher':
        name = 'Mr. Mohamed';
        break;
      case 'parent':
        name = 'Mr. Mohamed (Parent)';
        break;
      case 'admin':
        name = 'System Admin';
        break;
    }
    setUser({
      id: '1',
      name,
      role: role
    });
    setIsLoading(false);
  };
  const logout = () => {
    setUser(null);
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: !!user,
    role: user?.role || null,
    login,
    logout,
    isLoading
  }}>
      {children}
    </AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}