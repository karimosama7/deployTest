import React from 'react';
import { Moon, Sun, Globe, LogOut } from 'lucide-react';
interface TeacherHeaderProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
  isDark: boolean;
  toggleTheme: () => void;
}
export function TeacherHeader({
  lang,
  setLang,
  isDark,
  toggleTheme
}: TeacherHeaderProps) {
  const isRTL = lang === 'ar';
  return <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Placeholder for logo removed - title/greeting only */}

        {/* Greeting */}
        <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
          <h1 className="text-xl font-bold text-slate-800">
            {lang === 'ar' ? 'مرحبًا أ/ محمد 👋' : 'Welcome Mr. Mohamed 👋'}
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            {lang === 'ar' ? 'مدرس الرياضيات' : 'Mathematics Teacher'}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors border border-slate-200">
          <Globe size={18} />
          <span className="text-sm font-medium">
            {lang === 'ar' ? 'English' : 'عربي'}
          </span>
        </button>

        <button onClick={toggleTheme} className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors border border-slate-200" aria-label="Toggle Theme">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="w-px h-8 bg-slate-200 mx-1" />

        <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors border border-red-100">
          <LogOut size={18} />
          <span className="text-sm font-medium hidden md:inline">
            {lang === 'ar' ? 'خروج' : 'Logout'}
          </span>
        </button>
      </div>
    </header>;
}