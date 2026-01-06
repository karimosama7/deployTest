import React, { useState } from 'react';
import { Sidebar, SectionId } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CoursesSection } from '../components/CoursesSection';
import { ScheduleSection } from '../components/ScheduleSection';
import { RecordingsSection } from '../components/RecordingsSection';
import { HomeworkSection } from '../components/HomeworkSection';
import { QuizzesSection } from '../components/QuizzesSection';
import { AchievementsSection } from '../components/AchievementsSection';
import { ContactSection } from '../components/ContactSection';
import { Menu } from 'lucide-react';
export function Dashboard() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [activeSection, setActiveSection] = useState<SectionId>('courses');
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const renderContent = () => {
    switch (activeSection) {
      case 'courses':
        return <CoursesSection lang={lang} />;
      case 'schedule':
        return <ScheduleSection lang={lang} />;
      case 'recordings':
        return <RecordingsSection lang={lang} />;
      case 'homework':
        return <HomeworkSection lang={lang} />;
      case 'quizzes':
        return <QuizzesSection lang={lang} />;
      case 'achievements':
        return <AchievementsSection lang={lang} />;
      case 'contact':
        return <ContactSection lang={lang} />;
      default:
        return <CoursesSection lang={lang} />;
    }
  };
  return <div className={`min-h-screen bg-slate-50 flex ${lang === 'ar' ? 'dir-rtl' : 'dir-ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/20 z-10 lg:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />}

      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={section => {
      setActiveSection(section);
      setIsSidebarOpen(false);
    }} lang={lang} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header lang={lang} setLang={setLang} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

        {/* Mobile Menu Button (Absolute positioned in Header area usually, but putting here for simplicity if Header doesn't have it) */}
        <button className={`lg:hidden absolute top-4 ${lang === 'ar' ? 'right-4' : 'left-4'} z-20 p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-600`} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu size={20} />
        </button>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto min-h-full flex flex-col">
            <div className="flex-1">{renderContent()}</div>
            <Footer lang={lang} />
          </div>
        </main>
      </div>
    </div>;
}