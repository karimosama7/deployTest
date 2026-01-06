import React, { useState } from 'react';
import { AuthProvider, useAuth, UserRole } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { ParentDashboard } from './pages/ParentDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
function AppContent() {
  const {
    isAuthenticated,
    role,
    logout
  } = useAuth();
  const [currentPage, setCurrentPage] = useState<'landing' | 'login'>('landing');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  // Handle role selection from landing page
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentPage('login');
  };
  // Handle back from login page
  const handleBack = () => {
    setCurrentPage('landing');
    setSelectedRole(null);
  };
  // If authenticated, show the appropriate dashboard
  if (isAuthenticated && role) {
    return <>
        {role === 'student' && <Dashboard />}
        {role === 'teacher' && <TeacherDashboard />}
        {role === 'parent' && <ParentDashboard />}
        {role === 'admin' && <AdminDashboard />}

        {/* Temporary Logout Override for Demo - since dashboard headers aren't wired to context yet */}
        <div className="fixed bottom-4 right-4 z-50">
          <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold hover:bg-red-700 transition-colors">
            {lang === 'ar' ? 'تسجيل خروج (تجريبي)' : 'Logout (Demo)'}
          </button>
        </div>
      </>;
  }
  // Navigation Logic
  if (currentPage === 'login' && selectedRole) {
    return <LoginPage selectedRole={selectedRole} onBack={handleBack} lang={lang} />;
  }
  return <LandingPage onSelectRole={handleRoleSelect} lang={lang} setLang={setLang} />;
}
export function App() {
  return <AuthProvider>
      <AppContent />
    </AuthProvider>;
}