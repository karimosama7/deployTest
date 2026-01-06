import React from 'react';
import { Moon, Sun, Globe } from 'lucide-react';

interface HeaderProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export function Header({
  lang,
  setLang,
  isDark,
  toggleTheme
}: HeaderProps) {
  const isRTL = lang === 'ar';
  
  return (
    <header 
      className={`
        ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}
        border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm
        transition-colors duration-200
      `}
    >
      <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Greeting */}
        <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
          <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {lang === 'ar' ? 'مرحبًا يا أحمد 👋' : 'Welcome Ahmed 👋'}
          </h1>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {lang === 'ar' ? 'جاهز نتعلم؟' : 'Ready to learn?'}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} 
          className={`
            flex items-center gap-2 px-3 py-2 rounded-lg 
            ${isDark 
              ? 'bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-600' 
              : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
            }
            transition-colors border
          `}
        >
          <Globe size={18} />
          <span className="text-sm font-medium">
            {lang === 'ar' ? 'English' : 'عربي'}
          </span>
        </button>

        <button 
          onClick={toggleTheme} 
          className={`
            p-2 rounded-lg 
            ${isDark 
              ? 'bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-600' 
              : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
            }
            transition-colors border
          `}
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}