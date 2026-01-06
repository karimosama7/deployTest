import React, { useState } from 'react';
import { AdminSidebar, AdminSectionId } from '../components/AdminSidebar';
import { AdminHeader } from '../components/AdminHeader';
import { Footer } from '../components/Footer';
import { UsersManagementSection } from '../components/UsersManagementSection';
import { LinkParentStudentSection } from '../components/LinkParentStudentSection';
import { AcademicSetupSection } from '../components/AcademicSetupSection';
import { ScheduleManagementSection } from '../components/ScheduleManagementSection';
import { AdminReportsSection } from '../components/AdminReportsSection';
import { NotificationsManagementSection } from '../components/NotificationsManagementSection';
import { AdminSettingsSection } from '../components/AdminSettingsSection';
import { Menu } from 'lucide-react';
export function AdminDashboard() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [activeSection, setActiveSection] = useState<AdminSectionId>('users');
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <UsersManagementSection lang={lang} />;
      case 'link':
        return <LinkParentStudentSection lang={lang} />;
      case 'academic':
        return <AcademicSetupSection lang={lang} />;
      case 'schedule':
        return <ScheduleManagementSection lang={lang} />;
      case 'reports':
        return <AdminReportsSection lang={lang} />;
      case 'notifications':
        return <NotificationsManagementSection lang={lang} />;
      case 'settings':
        return <AdminSettingsSection lang={lang} />;
      default:
        return <UsersManagementSection lang={lang} />;
    }
  };
  return <div className={`min-h-screen bg-slate-50 flex ${lang === 'ar' ? 'dir-rtl' : 'dir-ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/20 z-10 lg:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />}

      {/* Sidebar */}
      <AdminSidebar activeSection={activeSection} setActiveSection={section => {
      setActiveSection(section);
      setIsSidebarOpen(false);
    }} lang={lang} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <AdminHeader lang={lang} setLang={setLang} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

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