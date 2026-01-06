import React from 'react';
import { GraduationCap, Users, BookOpen, Globe, Shield } from 'lucide-react';
import { UserRole } from '../context/AuthContext';
interface LandingPageProps {
  onSelectRole: (role: UserRole) => void;
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
}
export function LandingPage({
  onSelectRole,
  lang,
  setLang
}: LandingPageProps) {
  const isRTL = lang === 'ar';
  return <div className={`min-h-screen bg-slate-50 flex flex-col ${isRTL ? 'dir-rtl' : 'dir-ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Navbar */}
      <nav className="bg-white px-6 py-4 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-slate-800">
            {lang === 'ar' ? 'ابناؤنا' : 'Abnaouna'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors border border-slate-200">
            <Globe size={18} />
            <span className="font-medium">
              {lang === 'ar' ? 'English' : 'عربي'}
            </span>
          </button>

          <button onClick={() => onSelectRole('admin')} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition-colors shadow-sm">
            <Shield size={18} />
            <span className="font-medium text-sm">
              {lang === 'ar' ? 'دخول الأدمن' : 'Admin Login'}
            </span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {lang === 'ar' ? 'منصة تعليمية متكاملة' : 'Complete Educational Platform'}
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed">
            {lang === 'ar' ? 'بوابة المستقبل للطلاب، وأداة قوية للمعلمين، وراحة بال لأولياء الأمور.' : 'Future gateway for students, powerful tool for teachers, and peace of mind for parents.'}
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {/* Student Card */}
          <button onClick={() => onSelectRole('student')} className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {lang === 'ar' ? 'دخول الطالب' : 'Student Login'}
              </h2>
              <p className="text-slate-500">
                {lang === 'ar' ? 'تابع دروسك وواجباتك' : 'Track lessons and homework'}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </button>

          {/* Parent Card */}
          <button onClick={() => onSelectRole('parent')} className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {lang === 'ar' ? 'دخول ولي الأمر' : 'Parent Login'}
              </h2>
              <p className="text-slate-500">
                {lang === 'ar' ? 'تابع مستوى أبنائك' : 'Monitor your children'}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </button>

          {/* Teacher Card */}
          <button onClick={() => onSelectRole('teacher')} className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {lang === 'ar' ? 'دخول المدرس' : 'Teacher Login'}
              </h2>
              <p className="text-slate-500">
                {lang === 'ar' ? 'أدر فصولك وطلابك' : 'Manage classes and students'}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© 2023 Abnaouna Platform. All rights reserved.</p>
      </footer>
    </div>;
}