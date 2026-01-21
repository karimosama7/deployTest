import React, { useState } from 'react';
import { useAuth, UserRole } from '../context/AuthContext';
import { ArrowLeft, ArrowRight, GraduationCap, Users, BookOpen, Loader2, Shield } from 'lucide-react';
interface LoginPageProps {
  selectedRole: UserRole;
  onBack: () => void;
  lang: 'ar' | 'en';
}
export function LoginPage({
  selectedRole,
  onBack,
  lang
}: LoginPageProps) {
  const {
    login,
    isLoading
  } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const isRTL = lang === 'ar';
  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      // Pass proper credentials object and rememberMe flag
      await login({ username: email, password }, rememberMe);
    }
  };

  const getRoleConfig = () => {
    switch (selectedRole) {
      case 'STUDENT':
        return {
          icon: GraduationCap,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          labelAr: 'دخول الطالب',
          labelEn: 'Student Login'
        };
      case 'PARENT':
        return {
          icon: Users,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          labelAr: 'دخول ولي الأمر',
          labelEn: 'Parent Login'
        };
      case 'TEACHER':
        return {
          icon: BookOpen,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          labelAr: 'دخول المدرس',
          labelEn: 'Teacher Login'
        };
      case 'ADMIN':
        return {
          icon: Shield,
          color: 'text-slate-800',
          bg: 'bg-slate-100',
          labelAr: 'دخول الأدمن',
          labelEn: 'Admin Login'
        };
      default:
        return {
          icon: GraduationCap,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          labelAr: 'تسجيل الدخول',
          labelEn: 'Login'
        };
    }
  };
  const config = getRoleConfig();
  const RoleIcon = config.icon;

  return (
    <div className={`min-h-screen bg-slate-50 flex items-center justify-center p-4 ${isRTL ? 'dir-rtl' : 'dir-ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="p-8 text-center border-b border-slate-50 relative">
          <button onClick={onBack} className={`absolute top-6 ${isRTL ? 'right-6' : 'left-6'} text-slate-400 hover:text-slate-600 transition-colors`}>
            <BackIcon size={24} />
          </button>

          <div className={`w-16 h-16 mx-auto ${config.bg} ${config.color} rounded-full flex items-center justify-center mb-4`}>
            <RoleIcon size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {lang === 'ar' ? config.labelAr : config.labelEn}
          </h2>
          <p className="text-slate-500 mt-2">
            {lang === 'ar' ? 'مرحباً بعودتك! الرجاء إدخال بياناتك' : 'Welcome back! Please enter your details'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              {lang === 'ar' ? 'اسم المستخدم' : 'User Name'}
            </label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder={lang === 'ar' ? 'example@email.com' : 'example@email.com'}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-slate-700">
                {lang === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
              {lang === 'ar' ? 'تذكرني' : 'Remember me'}
            </label>
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {isLoading ? <>
              <Loader2 size={20} className="animate-spin" />
              <span>
                {lang === 'ar' ? 'جاري الدخول...' : 'Logging in...'}
              </span>
            </> : <span>{lang === 'ar' ? 'دخول' : 'Login'}</span>}
          </button>
        </form>

        <div className="p-6 bg-slate-50 text-center text-sm text-slate-500 border-t border-slate-100">
          {lang === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
          <a href="#" className="text-blue-600 font-bold hover:underline">
            {lang === 'ar' ? 'سجل الآن' : 'Sign up'}
          </a>
        </div>
      </div>
    </div>
  );
}